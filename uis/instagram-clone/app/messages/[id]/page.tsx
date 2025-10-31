"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { ChatList } from "@/components/chat-list"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Send, Flag, Info } from "lucide-react"
import type { Chat, Message, User } from "@/lib/dummy-data"

export default function ChatPage() {
  const params = useParams()
  const chatId = params.id as string

  const [chats, setChats] = useState<Chat[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [currentChat, setCurrentChat] = useState<Chat | null>(null)
  const [messageInput, setMessageInput] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chatsRes, usersRes] = await Promise.all([fetch("/api/chats"), fetch("/api/users")])

        const chatsData = await chatsRes.json()
        const usersData = await usersRes.json()

        setChats(chatsData.conversations)
        setUsers(usersData.users)

        const chat = chatsData.conversations.find((c: Chat) => c.id === chatId)
        setCurrentChat(chat)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [chatId])

  const handleSendMessage = () => {
    if (messageInput.trim() && currentChat) {
      const newMessage: Message = {
        id: `msg_${Date.now()}`,
        senderId: "current_user_id",
        text: messageInput,
        timestamp: new Date().toISOString(),
      }

      setCurrentChat({
        ...currentChat,
        messages: [...currentChat.messages, newMessage],
        lastMessage: newMessage,
      })
      setMessageInput("")
    }
  }

  const getOtherUser = () => {
    if (!currentChat) return null
    const otherUserId = currentChat.participants.find((id) => id !== "current_user_id")
    return users.find((u) => u.id === otherUserId)
  }

  const otherUser = getOtherUser()

  if (loading) {
    return (
      <div className="md:ml-64">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="md:ml-64">
      <Navigation />
      <div className="flex h-screen gap-0 pb-20 md:pb-0">
        {/* Chat List - Hidden on small screens */}
        <div className="hidden md:block w-80 border-r border-border">
          <div className="p-4 border-b border-border">
            <h1 className="text-2xl font-bold text-foreground">Messages</h1>
          </div>
          <ChatList chats={chats} users={users} currentChatId={chatId} />
        </div>

        {/* Chat Area */}
        {currentChat && otherUser ? (
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-card">
              <div className="flex items-center gap-3">
                <Image
                  src={otherUser.avatar || "/placeholder.svg"}
                  alt={otherUser.username}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-foreground">{otherUser.username}</p>
                  <p className="text-xs text-muted-foreground">
                    {otherUser.isSuspicious ? "⚠ Suspicious account" : "Active"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Info size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-destructive">
                  <Flag size={20} />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {currentChat.isFlagged && (
                <div className="bg-destructive/20 border border-destructive text-destructive rounded-lg p-4 text-center text-sm font-semibold">
                  This conversation has been flagged for suspicious activity
                </div>
              )}

              {currentChat.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === "current_user_id" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.senderId === "current_user_id"
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-muted text-foreground rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm break-words">{message.text}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Aa"
                  className="flex-1 px-4 py-2 rounded-full bg-muted text-foreground placeholder-muted-foreground border-0 outline-0"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  size="icon"
                  className="bg-transparent text-primary hover:bg-transparent"
                >
                  <Send size={20} />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 hidden md:flex flex-col items-center justify-center bg-muted">
            <div className="text-6xl mb-4">💬</div>
            <p className="text-foreground font-semibold">No chat selected</p>
          </div>
        )}
      </div>
    </div>
  )
}
