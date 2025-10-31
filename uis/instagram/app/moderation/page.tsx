"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { FlagStats } from "@/components/flag-stats"
import { FlaggedContentCard } from "@/components/flagged-content-card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { dummyPosts, dummyChats, dummyUsers, generateFlags } from "@/lib/dummy-data"
import type { Flag } from "@/lib/dummy-data"

export default function ModerationPage() {
  const flags: Flag[] = generateFlags()
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterSeverity, setFilterSeverity] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFlags = flags.filter((flag) => {
    if (filterCategory !== "all" && flag.category !== filterCategory) return false
    if (filterSeverity !== "all" && flag.severity !== filterSeverity) return false
    if (searchQuery && !flag.flagReason.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const getPost = (id: string) => dummyPosts.find((p) => p.id === id)
  const getChat = (id: string) => dummyChats.find((c) => c.id === id)
  const getUser = (id: string) => dummyUsers.find((u) => u.id === id)

  return (
    <div className="md:ml-64">
      <Navigation />
      <div className="max-w-7xl mx-auto pb-20 md:pb-0 p-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Moderation Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage flagged content across the platform</p>
        </div>

        {/* Statistics */}
        <div className="mb-12">
          <FlagStats flags={flags} />
        </div>

        {/* Filters & Search */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                placeholder="Search flags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-card text-foreground placeholder-muted-foreground"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-card text-foreground"
            >
              <option value="all">All Categories</option>
              <option value="drugs">Drugs</option>
              <option value="illegal_sales">Illegal Sales</option>
              <option value="violence">Violence</option>
              <option value="fraud">Fraud</option>
              <option value="explicit">Explicit</option>
              <option value="other">Other</option>
            </select>

            {/* Severity Filter */}
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="px-4 py-2 border border-border rounded-lg bg-card text-foreground"
            >
              <option value="all">All Severity</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            {/* Reset */}
            <Button
              onClick={() => {
                setFilterCategory("all")
                setFilterSeverity("all")
                setSearchQuery("")
              }}
              variant="outline"
              className="bg-transparent border-border"
            >
              Reset Filters
            </Button>
          </div>
        </div>

        {/* Flagged Content */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Flagged Content ({filteredFlags.length})</h2>

          {filteredFlags.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 bg-muted rounded-lg">
              <div className="text-4xl mb-2">✓</div>
              <p className="text-foreground font-semibold">No flagged content</p>
              <p className="text-muted-foreground">All content appears to be compliant</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFlags.map((flag) => {
                const post = flag.type === "post" ? getPost(flag.contentId) : undefined
                const chat = flag.type === "chat" ? getChat(flag.contentId) : undefined
                const user = post ? getUser(post.userId) : chat ? getUser(chat.participants[0]) : undefined
                const otherUser = chat ? getUser(chat.participants[1]) : undefined

                return (
                  <FlaggedContentCard
                    key={flag.id}
                    flag={flag}
                    post={post}
                    chat={chat}
                    user={user}
                    otherUser={otherUser}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
