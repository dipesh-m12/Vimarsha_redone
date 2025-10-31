"use client"

import Image from "next/image"
import type { Chat, User } from "@/lib/dummy-data"
import Link from "next/link"
import { Flag } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface ChatListProps {
  chats: Chat[]
  users: User[]
  currentChatId?: string
}

export function ChatList({ chats, users, currentChatId }: ChatListProps) {
  const getOtherUser = (chat: Chat, userId: string) => {
    const otherUserId = chat.participants.find((id) => id !== userId)
    return users.find((u) => u.id === otherUserId)
  }

  return (
    <div className="bg-card border-r border-border overflow-y-auto">
      {chats.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full p-4 text-center">
          <div className="text-4xl mb-2">💬</div>
          <p className="text-foreground font-semibold">No messages yet</p>
          <p className="text-muted-foreground text-sm">Start a conversation with friends</p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {chats.map((chat) => {
            const otherUser = getOtherUser(chat, "current_user_id")
            if (!otherUser) return null

            const lastMessage = chat.lastMessage
            const isActive = currentChatId === chat.id

            return (
              <Link key={chat.id} href={`/messages/${chat.id}`}>
                <div
                  className={`p-3 cursor-pointer hover:bg-muted transition-colors ${
                    isActive ? "bg-muted" : ""
                  } flex gap-3 relative`}
                >
                  <div className="relative flex-shrink-0">
                    <Image
                      src={otherUser.avatar || "/placeholder.svg"}
                      alt={otherUser.username}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                    {otherUser.isSuspicious && (
                      <div className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">
                        ⚠
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-foreground truncate">{otherUser.username}</p>
                      {lastMessage && (
                        <p className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                          {formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: false })}
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{lastMessage?.text || "No messages yet"}</p>
                  </div>
                  {chat.isFlagged && (
                    <div className="absolute top-3 right-3 text-destructive">
                      <Flag size={16} />
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
