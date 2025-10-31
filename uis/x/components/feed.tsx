"use client";

import { useState } from "react";
import { Post } from "./post";
import { PostComposer } from "./post-composer";

interface PostData {
  id: string;
  author: string;
  handle: string;
  avatar: string;
  timestamp: string;
  text?: string;
  image?: string;
  likes: number;
  replies: number;
  reposts: number;
  liked: boolean;
}

const SAMPLE_POSTS: PostData[] = [
  {
    id: "1",
    author: "Alex Chen",
    handle: "@alexchen",
    avatar: "/diverse-user-avatars.png",
    timestamp: "2 hours ago",
    text: "Win 1million dollars . Text here",
    likes: 234,
    replies: 45,
    reposts: 89,
    liked: false,
  },
  {
    id: "2",
    author: "Sarah Johnson",
    handle: "@sarahj",
    avatar: "/diverse-user-avatars.png",
    timestamp: "1 hour ago",
    text: "Beautiful sunset today 🌅",
    image: "/injections.jpg",
    likes: 1200,
    replies: 156,
    reposts: 320,
    liked: false,
  },
  {
    id: "3",
    author: "Dev Tips Daily",
    handle: "@devtipsdaily",
    avatar: "/diverse-user-avatars.png",
    timestamp: "45 minutes ago",
    text: "Free laptop, pay shipping.",
    likes: 5600,
    replies: 890,
    reposts: 2100,
    liked: false,
  },
  {
    id: "4",
    author: "Sarah Johnson",
    handle: "@sarahj",
    avatar: "/diverse-user-avatars.png",
    timestamp: "1 hour ago",
    text: "Beautiful sunset today 🌅",
    image: "/fake3.jpg",
    likes: 1200,
    replies: 156,
    reposts: 320,
    liked: false,
  },
];

export function Feed() {
  const [posts, setPosts] = useState<PostData[]>(SAMPLE_POSTS);

  const handleAddPost = (text: string, image?: string) => {
    const newPost: PostData = {
      id: Date.now().toString(),
      author: "You",
      handle: "@yourhandle",
      avatar: "/diverse-user-avatars.png",
      timestamp: "now",
      text,
      image,
      likes: 0,
      replies: 0,
      reposts: 0,
      liked: false,
    };
    setPosts([newPost, ...posts]);
  };

  const handleLike = (id: string) => {
    setPosts(
      posts.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur border-b border-border p-4 z-10">
        <h2 className="text-xl font-bold">Home</h2>
      </div>

      {/* Post Composer */}
      <div className="border-b border-border p-4">
        <PostComposer onPostSubmit={handleAddPost} />
      </div>

      {/* Posts Feed */}
      <div>
        {posts.map((post) => (
          <Post key={post.id} post={post} onLike={() => handleLike(post.id)} />
        ))}
      </div>
    </div>
  );
}
