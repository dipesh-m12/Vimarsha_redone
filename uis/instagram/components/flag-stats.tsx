"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Flag } from "@/lib/dummy-data"

interface FlagStatsProps {
  flags: Flag[]
}

export function FlagStats({ flags }: FlagStatsProps) {
  const byCategory = flags.reduce(
    (acc, flag) => {
      acc[flag.category] = (acc[flag.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const bySeverity = flags.reduce(
    (acc, flag) => {
      acc[flag.severity] = (acc[flag.severity] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const categoryData = Object.entries(byCategory).map(([name, value]) => ({
    name: name.replace(/_/g, " "),
    value,
  }))

  const severityData = Object.entries(bySeverity).map(([name, value]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    value,
  }))

  const colors = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6"]
  const severityColors: Record<string, string> = {
    high: "#ef4444",
    medium: "#f97316",
    low: "#eab308",
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Total Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Flagging Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-muted-foreground text-sm">Total Flags</p>
              <p className="text-3xl font-bold text-foreground">{flags.length}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="text-destructive font-semibold">{bySeverity["high"] || 0}</p>
                <p className="text-muted-foreground text-xs">High Severity</p>
              </div>
              <div>
                <p className="text-orange-500 font-semibold">{bySeverity["medium"] || 0}</p>
                <p className="text-muted-foreground text-xs">Medium</p>
              </div>
              <div>
                <p className="text-yellow-500 font-semibold">{bySeverity["low"] || 0}</p>
                <p className="text-muted-foreground text-xs">Low</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Severity Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>By Severity</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={severityData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {severityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={severityColors[entry.name.toLowerCase()] || colors[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Category Distribution */}
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>By Category</CardTitle>
          <CardDescription>Distribution of flagged content across violation types</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(var(--color-primary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
