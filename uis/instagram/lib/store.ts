import type { Post } from "./dummy-data"

// In-memory store for new posts (persists during session)
const newPosts: Post[] = []

export function addPost(
  post: Omit<Post, "id" | "timestamp" | "isFlagged" | "likes" | "comments"> & { userId: string },
): Post {
  const newPost: Post = {
    ...post,
    id: `post_${Date.now()}`,
    timestamp: new Date().toISOString(),
    isFlagged: false,
    likes: 0,
    comments: [],
  }

  newPosts.unshift(newPost)
  return newPost
}

export function getAllPosts(): Post[] {
  return newPosts
}

export function getNewPosts(): Post[] {
  return newPosts
}
