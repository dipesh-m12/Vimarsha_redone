import { dummyChats } from "@/lib/dummy-data"

export async function GET() {
  return Response.json({
    conversations: dummyChats,
  })
}
