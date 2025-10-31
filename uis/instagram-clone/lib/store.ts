import type { Post } from "./dummy-data"

// In-memory store for new posts (persists during session)
const newPosts: Post[] = []

export async function addPost(
  post: Omit<Post, "id" | "timestamp" | "isFlagged" | "likes" | "comments"> & { userId: string },
): Promise<Post> {
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

export async function getAllPosts(fromApi?: boolean): Promise<Post[]> {
  if (fromApi) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/posts`, {
      cache: "no-store",
    })
    const data = await response.json()
    return [...newPosts, ...data.posts]
  }
  return newPosts
}

export async function getNewPosts(): Promise<Post[]> {
  return newPosts
}
