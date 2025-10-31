import { generateFlags } from "@/lib/dummy-data"

export async function GET() {
  const flags = generateFlags()

  const byCategory: Record<string, number> = {}
  const bySeverity: Record<string, number> = {}

  flags.forEach((flag) => {
    byCategory[flag.category] = (byCategory[flag.category] || 0) + 1
    bySeverity[flag.severity] = (bySeverity[flag.severity] || 0) + 1
  })

  return Response.json({
    totalFlags: flags.length,
    byCategory,
    bySeverity,
  })
}
