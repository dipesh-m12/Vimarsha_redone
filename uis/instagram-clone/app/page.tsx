"use client"

import { useEffect, useState, useRef } from "react"
import { Navigation } from "@/components/navigation"
import { PostCard } from "@/components/post-card"
import { StoriesBar } from "@/components/stories-bar"
import type { Post, User } from "@/lib/dummy-data"

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const refetchIntervalRef = useRef<NodeJS.Timeout>()

  const fetchPosts = async () => {
    try {
      const [postsRes, usersRes] = await Promise.all([
        fetch("/api/posts", { cache: "no-store" }),
        fetch("/api/users", { cache: "no-store" }),
      ])

      const postsData = await postsRes.json()
      const usersData = await usersRes.json()

      setPosts(postsData.posts)
      setUsers(usersData.users)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchPosts().finally(() => setLoading(false))

    refetchIntervalRef.current = setInterval(fetchPosts, 3000)

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchPosts()
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      if (refetchIntervalRef.current) {
        clearInterval(refetchIntervalRef.current)
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground mb-2">Instagram</div>
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </div>
    )
  }

  const getUser = (userId: string) => users.find((u) => u.id === userId)

  return (
    <div className="md:ml-64">
      <Navigation />
      <div className="max-w-2xl mx-auto">
        <div className="p-4 md:p-0">
          <StoriesBar users={users} />

          <div className="md:border-l md:border-r md:border-border">
            {posts.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <p className="text-muted-foreground">No posts yet</p>
              </div>
            ) : (
              posts.map((post) => {
                const user = getUser(post.userId)
                if (!user) return null
                return <PostCard key={post.id} post={post} user={user} />
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
