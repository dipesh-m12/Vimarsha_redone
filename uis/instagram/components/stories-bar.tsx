"use client"

import Image from "next/image"
import type { User } from "@/lib/dummy-data"
import { useState } from "react"

interface StoriesBarProps {
  users: User[]
}

export function StoriesBar({ users }: StoriesBarProps) {
  const [activeStory, setActiveStory] = useState<string | null>(null)

  return (
    <div className="bg-card border border-border rounded-lg p-3 mb-4 overflow-x-auto">
      <div className="flex gap-4 min-w-max">
        {users.slice(0, 8).map((user) => (
          <button
            key={user.id}
            onClick={() => setActiveStory(user.id)}
            className="flex flex-col items-center gap-2 hover:opacity-75 transition-opacity"
          >
            <div
              className={`relative w-16 h-16 rounded-full p-1 ${
                activeStory === user.id ? "bg-gradient-to-r from-yellow-400 to-pink-500" : "bg-border"
              }`}
            >
              <Image
                src={user.avatar || "/placeholder.svg"}
                alt={user.username}
                width={64}
                height={64}
                className="rounded-full w-full h-full border-4 border-card"
              />
            </div>
            <p className="text-xs text-foreground text-center truncate w-16">{user.username}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
