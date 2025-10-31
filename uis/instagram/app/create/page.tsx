"use client"

import { useState, useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { CreatePostModal } from "@/components/create-post-modal"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function CreatePage() {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [posts, setPosts] = useState<Array<{ image: string; caption: string; hashtags: string[] }>>([])

  useEffect(() => {
    // In a real app, this would load existing posts from the user
  }, [])

  const handleCreatePost = (post: { image: string; caption: string; hashtags: string[] }) => {
    setPosts([post, ...posts])
    setIsModalOpen(false)
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  return (
    <div className="md:ml-64">
      <Navigation />
      <CreatePostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onPost={handleCreatePost} />

      <div className="max-w-2xl mx-auto pb-20 md:pb-0 p-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-foreground">Create Post</h1>
          <Button onClick={handleOpenModal} className="bg-primary text-primary-foreground gap-2">
            <Plus size={20} />
            New Post
          </Button>
        </div>

        {/* Recently Created Posts */}
        {posts.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-foreground mb-4">Recently Created</h2>
            <div className="space-y-4">
              {posts.map((post, idx) => (
                <div key={idx} className="bg-card border border-border rounded-lg overflow-hidden">
                  <div className="aspect-video relative">
                    <img src={post.image || "/placeholder.svg"} alt="Post" className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="text-foreground mb-2">{post.caption}</p>
                    <div className="flex flex-wrap gap-2">
                      {post.hashtags.map((tag) => (
                        <span key={tag} className="text-primary text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {posts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-6xl mb-4">📸</div>
            <p className="text-foreground font-semibold mb-2">No posts created yet</p>
            <p className="text-muted-foreground mb-4">Click the button above to create your first post</p>
            <Button onClick={handleOpenModal} className="bg-primary text-primary-foreground gap-2">
              <Plus size={20} />
              Create Post
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
