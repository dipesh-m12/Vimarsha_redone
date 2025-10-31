"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { ProfileHeader } from "@/components/profile-header"
import Image from "next/image"
import type { Post, User } from "@/lib/dummy-data"

export default function ProfilePage() {
  const params = useParams()
  const userId = params.id as string

  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, postsRes] = await Promise.all([fetch("/api/users"), fetch("/api/posts")])

        const usersData = await usersRes.json()
        const postsData = await postsRes.json()

        const currentUser = usersData.users.find((u: User) => u.id === userId)
        const userPosts = postsData.posts.filter((p: Post) => p.userId === userId)

        setUser(currentUser)
        setPosts(userPosts)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

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

  if (!user) {
    return (
      <div className="md:ml-64">
        <Navigation />
        <div className="flex items-center justify-center h-screen">
          <div className="text-muted-foreground">User not found</div>
        </div>
      </div>
    )
  }

  return (
    <div className="md:ml-64">
      <Navigation />
      <div className="max-w-2xl mx-auto pb-20 md:pb-0">
        <ProfileHeader user={user} postCount={posts.length} />

        {/* Posts Grid */}
        <div className="p-4 md:p-0">
          <div className="border-t border-border">
            {posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-9xl mb-4">📸</div>
                <p className="text-foreground font-semibold mb-2">No posts yet</p>
                <p className="text-muted-foreground">This user hasn't posted anything yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-1 md:gap-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="relative aspect-square overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <Image src={post.image || "/placeholder.svg"} alt="Post" fill className="object-cover" />
                    {post.isFlagged && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-destructive text-sm font-semibold">Flagged</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
