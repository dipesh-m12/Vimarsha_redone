import { dummyUsers } from "@/lib/dummy-data"

export async function GET() {
  return Response.json({
    users: dummyUsers,
  })
}
