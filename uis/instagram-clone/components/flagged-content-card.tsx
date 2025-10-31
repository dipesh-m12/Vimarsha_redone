"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import type { Flag, Post, Chat, User } from "@/lib/dummy-data"

interface FlaggedContentCardProps {
  flag: Flag
  post?: Post
  chat?: Chat
  user?: User
  otherUser?: User
}

export function FlaggedContentCard({ flag, post, chat, user, otherUser }: FlaggedContentCardProps) {
  const severityColors = {
    high: "text-destructive bg-destructive/10 border-destructive/30",
    medium: "text-orange-600 bg-orange-50 border-orange-200",
    low: "text-yellow-600 bg-yellow-50 border-yellow-200",
  }

  return (
    <Card className="border-l-4 border-l-destructive">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <AlertTriangle
                size={20}
                className={`flex-shrink-0 mt-1 ${severityColors[flag.severity].split(" ")[0]}`}
              />
              <div>
                <p className="font-semibold text-foreground capitalize">{flag.category.replace(/_/g, " ")}</p>
                <p className="text-sm text-muted-foreground">{flag.flagReason}</p>
              </div>
            </div>
            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${severityColors[flag.severity]}`}>
              {flag.severity.toUpperCase()}
            </span>
          </div>

          {/* Content Preview */}
          {flag.type === "post" && post && user ? (
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="text-sm font-semibold text-foreground">{user.username}'s Post</p>
              {post.image && (
                <div className="relative w-full aspect-video rounded overflow-hidden">
                  <Image src={post.image || "/placeholder.svg"} alt="Post" fill className="object-cover" />
                </div>
              )}
              <p className="text-sm text-foreground line-clamp-2">{post.caption}</p>
            </div>
          ) : flag.type === "chat" && chat && user && otherUser ? (
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <p className="text-sm font-semibold text-foreground">
                Chat between {user.username} and {otherUser.username}
              </p>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {chat.messages.slice(-3).map((msg) => (
                  <p key={msg.id} className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {msg.senderId === user.id ? user.username : otherUser.username}:
                    </span>{" "}
                    {msg.text}
                  </p>
                ))}
              </div>
            </div>
          ) : null}

          {/* Keywords */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2">FLAGGED KEYWORDS</p>
            <div className="flex flex-wrap gap-2">
              {flag.keywords.map((keyword) => (
                <span key={keyword} className="text-xs bg-destructive/20 text-destructive px-2 py-1 rounded">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Confidence & Timestamp */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <p>Confidence: {(flag.confidence * 100).toFixed(0)}%</p>
            <p>{new Date(flag.timestamp).toLocaleDateString()}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2 border-t border-border">
            <Button size="sm" variant="outline" className="flex-1 gap-2 bg-transparent">
              <CheckCircle size={16} />
              Approve
            </Button>
            <Button size="sm" variant="outline" className="flex-1 gap-2 text-destructive bg-transparent">
              <XCircle size={16} />
              Remove
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
