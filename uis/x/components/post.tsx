"use client"

import { useState } from "react"
import { Heart, MessageCircle, Repeat2, Share } from "lucide-react"

interface PostData {
  id: string
  author: string
  handle: string
  avatar: string
  timestamp: string
  text?: string
  image?: string
  likes: number
  replies: number
  reposts: number
  liked: boolean
}

interface PostProps {
  post: PostData
  onLike: () => void
}

export function Post({ post, onLike }: PostProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <article
      className="border-b border-border p-4 hover:bg-secondary/30 cursor-pointer transition"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <img src={post.avatar || "/placeholder.svg"} alt={post.author} className="w-12 h-12 rounded-full" />

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold text-foreground hover:underline">{post.author}</span>
            <span className="text-muted-foreground">{post.handle}</span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground hover:underline">{post.timestamp}</span>
          </div>

          {/* Text */}
          {post.text && <p className="mt-2 text-base text-foreground whitespace-pre-wrap break-words">{post.text}</p>}

          {/* Image */}
          {post.image && (
            <div className="mt-3 rounded-2xl overflow-hidden border border-border">
              <img src={post.image || "/placeholder.svg"} alt="Post content" className="w-full h-auto max-h-500" />
            </div>
          )}

          {/* Engagement Stats */}
          <div className="mt-3 text-sm text-muted-foreground">
            <span className="hover:underline cursor-pointer">{post.replies} replies</span>
            <span className="mx-2">·</span>
            <span className="hover:underline cursor-pointer">{post.reposts} reposts</span>
            <span className="mx-2">·</span>
            <span className="hover:underline cursor-pointer">{post.likes} likes</span>
          </div>

          {/* Action Buttons */}
          {isHovered && (
            <div className="mt-3 flex justify-around text-muted-foreground max-w-xs">
              <button className="flex items-center gap-2 hover:text-primary hover:bg-primary/10 p-2 rounded-full transition">
                <MessageCircle size={16} />
              </button>
              <button className="flex items-center gap-2 hover:text-green-500 hover:bg-green-500/10 p-2 rounded-full transition">
                <Repeat2 size={16} />
              </button>
              <button
                onClick={onLike}
                className={`flex items-center gap-2 p-2 rounded-full transition ${
                  post.liked ? "text-red-500 bg-red-500/10" : "hover:text-red-500 hover:bg-red-500/10"
                }`}
              >
                <Heart size={16} fill={post.liked ? "currentColor" : "none"} />
              </button>
              <button className="flex items-center gap-2 hover:text-primary hover:bg-primary/10 p-2 rounded-full transition">
                <Share size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
