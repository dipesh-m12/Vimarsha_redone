"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import Image from "next/image"
import type { Post, User } from "@/lib/dummy-data"
import Link from "next/link"

export default function ExplorePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, usersRes] = await Promise.all([fetch("/api/posts"), fetch("/api/users")])

        const postsData = await postsRes.json()
        const usersData = await usersRes.json()

        setPosts(postsData.posts)
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
      <div className="max-w-6xl mx-auto pb-20 md:pb-0 p-4">
        <h1 className="text-2xl font-bold text-foreground mb-6">Explore</h1>

        {/* Featured Users */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">Suggested Users</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {users.slice(0, 12).map((user) => (
              <Link key={user.id} href={`/profile/${user.id}`}>
                <div className="flex flex-col items-center gap-2 hover:opacity-75 transition-opacity">
                  <div className="relative w-24 h-24">
                    <Image
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.username}
                      fill
                      className="rounded-full object-cover border-2 border-border"
                    />
                    {user.isSuspicious && (
                      <div className="absolute top-0 right-0 bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-full">
                        ⚠
                      </div>
                    )}
                  </div>
                  <p className="text-sm font-semibold text-foreground text-center truncate w-full px-1">
                    {user.username}
                  </p>
                  <p className="text-xs text-muted-foreground text-center truncate w-full px-1">
                    {user.bio.slice(0, 20)}...
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Popular Posts</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="relative aspect-square overflow-hidden cursor-pointer hover:opacity-80 transition-opacity rounded-lg"
              >
                <Image src={post.image || "/placeholder.svg"} alt="Post" fill className="object-cover" />
                {post.isFlagged && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-destructive text-sm font-semibold">Flagged</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="text-white text-sm font-semibold line-clamp-2">{post.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
