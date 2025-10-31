"use client";

import Image from "next/image";
import { Heart, MessageCircle, Share2, Flag } from "lucide-react";
import type { Post, User } from "@/lib/dummy-data";
import { useState } from "react";

interface PostCardProps {
  post: Post;
  user: User;
  onFlag?: (postId: string) => void;
}

export function PostCard({ post, user, onFlag }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <div className="bg-card border-b border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <Image
            src={user.avatar || "/placeholder.svg"}
            alt={user.username}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              {user.username}
            </span>
            {user.isVerified && (
              <span className="text-xs text-muted-foreground">Verified</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {post.isFlagged && (
            <span className="inline-block bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded font-medium">
              Flagged
            </span>
          )}
          <button className="text-foreground hover:text-muted-foreground">
            ⋯
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="relative w-full bg-muted" style={{ aspectRatio: "1" }}>
        <Image
          src={post.image || "/placeholder.svg"}
          alt="Post image"
          fill
          className="object-cover"
        />
      </div>

      {/* Actions */}
      <div className="p-3 flex gap-4">
        <button
          onClick={handleLike}
          className="hover:text-muted-foreground transition-colors"
        >
          <Heart
            size={24}
            className={
              liked ? "fill-destructive text-destructive" : "text-foreground"
            }
          />
        </button>
        <button className="hover:text-muted-foreground transition-colors text-foreground">
          <MessageCircle size={24} />
        </button>
        <button className="hover:text-muted-foreground transition-colors text-foreground">
          <Share2 size={24} />
        </button>
        {onFlag && (
          <button
            onClick={() => onFlag(post.id)}
            className="ml-auto hover:text-destructive transition-colors text-foreground"
          >
            <Flag size={24} />
          </button>
        )}
      </div>

      {/* Likes */}
      <div className="px-3 pb-2">
        <p className="text-sm font-semibold text-foreground">
          {likeCount} likes
        </p>
      </div>

      {/* Caption */}
      <div className="px-3 pb-3">
        <p className="text-sm text-foreground">
          <span className="font-semibold">{user.username}</span> {post.caption}
        </p>
      </div>

      {/* Hashtags */}
      {post.hashtags.length > 0 && (
        <div className="px-3 pb-3">
          <p className="text-sm text-primary">{post.hashtags.join(" ")}</p>
        </div>
      )}

      {/* Timestamp */}
      <div className="px-3 pb-3">
        <p className="text-xs text-muted-foreground">
          {new Date(post.timestamp).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
