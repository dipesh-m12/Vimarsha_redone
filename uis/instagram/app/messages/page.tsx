"use client"

import { Navigation } from "@/components/navigation"
import { ChatList } from "@/components/chat-list"
import { dummyChats, dummyUsers } from "@/lib/dummy-data"

export default function MessagesPage() {
  return (
    <div className="md:ml-64">
      <Navigation />
      <div className="flex h-screen gap-0 pb-20 md:pb-0">
        {/* Chat List */}
        <div className="w-full md:w-80 border-r border-border">
          <div className="p-4 border-b border-border">
            <h1 className="text-2xl font-bold text-foreground">Messages</h1>
          </div>
          <ChatList chats={dummyChats} users={dummyUsers} />
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
