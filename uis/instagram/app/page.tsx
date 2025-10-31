"use client";

import Image from "next/image";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useState } from "react";
import { dummyPosts, dummyUsers, type Post, type User } from "@/lib/dummy-data";
import { Navigation } from "@/components/navigation";

/* -------------------------------------------------
   PostCard – minimal, no flagging UI
   ------------------------------------------------- */
function PostCard({ post, user }: { post: Post; user: User }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = () => {
    setLiked((v) => !v);
    setLikeCount((c) => (liked ? c - 1 : c + 1));
  };

  return (
    <div className="bg-card border-b border-border">
      {/* Header */}
      <div className="flex items-center gap-3 p-3">
        <Image
          src={user.avatar}
          alt={user.username}
          width={36}
          height={36}
          className="rounded-full"
        />
        <div>
          <p className="text-sm font-semibold">{user.username}</p>
          {user.isVerified && (
            <p className="text-xs text-muted-foreground">Verified</p>
          )}
        </div>
      </div>

      {/* Image */}
      <div className="relative w-full bg-muted" style={{ aspectRatio: "1" }}>
        <Image src={post.image} alt="post" fill className="object-cover" />
      </div>

      {/* Actions */}
      <div className="flex gap-4 p-3">
        <button onClick={handleLike}>
          <Heart
            size={24}
            className={liked ? "fill-red-500 text-red-500" : "text-foreground"}
          />
        </button>
        <button>
          <MessageCircle size={24} className="text-foreground" />
        </button>
        <button>
          <Share2 size={24} className="text-foreground" />
        </button>
      </div>

      {/* Likes */}
      <p className="px-3 text-sm font-semibold">{likeCount} likes</p>

      {/* Caption */}
      <p className="px-3 pb-2 text-sm">
        <span className="font-semibold">{user.username}</span> {post.caption}
      </p>

      {/* Hashtags */}
      {post.hashtags.length > 0 && (
        <p className="px-3 pb-2 text-sm text-primary">
          {post.hashtags.join(" ")}
        </p>
      )}

      {/* Timestamp */}
      <p className="px-3 pb-3 text-xs text-muted-foreground">
        {new Date(post.timestamp).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        })}
      </p>
    </div>
  );
}

/* -------------------------------------------------
   Home Page – show only 3–4 posts
   ------------------------------------------------- */
export default function Home() {
  const getUser = (userId: string) => dummyUsers.find((u) => u.id === userId)!;

  // Show only first 4 posts
  const displayedPosts = dummyPosts.slice(0, 4);

  return (
    <>
      <Navigation />
      <div className="max-w-2xl mx-auto p-4">
        {displayedPosts.map((post) => {
          const user = getUser(post.userId);
          return <PostCard key={post.id} post={post} user={user} />;
        })}
      </div>
    </>
  );
}
