import { generateFlags } from "@/lib/dummy-data"

export async function GET() {
  const flags = generateFlags()
  return Response.json({
    flaggedContent: flags,
  })
}
