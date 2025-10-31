"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { ChatList } from "@/components/chat-list"
import type { Chat, User } from "@/lib/dummy-data"

export default function MessagesPage() {
  const [chats, setChats] = useState<Chat[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [chatsRes, usersRes] = await Promise.all([fetch("/api/chats"), fetch("/api/users")])

        const chatsData = await chatsRes.json()
        const usersData = await usersRes.json()

        setChats(chatsData.conversations)
        setUsers(usersData.users)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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
        {/* Chat List */}
        <div className="w-full md:w-80 border-r border-border">
          <div className="p-4 border-b border-border">
            <h1 className="text-2xl font-bold text-foreground">Messages</h1>
          </div>
          <ChatList chats={chats} users={users} />
        </div>

        {/* Empty State */}
        <div className="hidden md:flex flex-1 flex-col items-center justify-center bg-muted">
          <div className="text-6xl mb-4">💬</div>
          <p className="text-foreground font-semibold text-lg">Your messages</p>
          <p className="text-muted-foreground">Select a chat to start messaging</p>
        </div>
      </div>
    </div>
  )
}
