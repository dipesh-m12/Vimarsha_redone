import { dummyPosts } from "@/lib/dummy-data"

export async function GET() {
  const { getNewPosts } = await import("@/lib/store")
  const newPosts = await getNewPosts()

  return Response.json({
    posts: [...newPosts, ...dummyPosts],
  })
}
