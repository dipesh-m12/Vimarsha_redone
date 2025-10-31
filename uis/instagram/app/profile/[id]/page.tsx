"use client"
import { Navigation } from "@/components/navigation"
import { ProfileHeader } from "@/components/profile-header"
import Image from "next/image"
import { dummyUsers, dummyPosts } from "@/lib/dummy-data"

export default function ProfilePage({ params }: { params: { id: string } }) {
  const userId = params.id

  const user = dummyUsers.find((u) => u.id === userId)
  const userPosts = dummyPosts.filter((p) => p.userId === userId)

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
        <ProfileHeader user={user} postCount={userPosts.length} />

        {/* Posts Grid */}
        <div className="p-4 md:p-0">
          <div className="border-t border-border">
            {userPosts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="text-9xl mb-4">📸</div>
                <p className="text-foreground font-semibold mb-2">No posts yet</p>
                <p className="text-muted-foreground">This user hasn't posted anything yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-1 md:gap-4">
                {userPosts.map((post) => (
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
