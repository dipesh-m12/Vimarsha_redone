"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import type { User } from "@/lib/dummy-data"
import { Settings, Flag } from "lucide-react"

interface ProfileHeaderProps {
  user: User
  postCount: number
  onFlag?: () => void
}

export function ProfileHeader({ user, postCount, onFlag }: ProfileHeaderProps) {
  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex gap-8 items-start">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <Image
              src={user.avatar || "/placeholder.svg"}
              alt={user.username}
              width={150}
              height={150}
              className="rounded-full w-32 h-32 border-4 border-border"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-2xl font-semibold text-foreground">{user.username}</h1>
              {user.isVerified && (
                <span className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded">✓ Verified</span>
              )}
              {user.isSuspicious && (
                <span className="text-sm bg-destructive text-destructive-foreground px-3 py-1 rounded">
                  ⚠ Suspicious
                </span>
              )}
              <Button variant="ghost" size="icon" className="ml-auto">
                <Settings size={20} />
              </Button>
              {onFlag && (
                <Button variant="ghost" size="icon" onClick={onFlag} className="text-destructive">
                  <Flag size={20} />
                </Button>
              )}
            </div>

            {/* Stats */}
            <div className="flex gap-8 mb-4">
              <div>
                <p className="font-semibold text-foreground">{postCount}</p>
                <p className="text-sm text-muted-foreground">posts</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">{user.followerCount.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">followers</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">{user.followingCount.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">following</p>
              </div>
            </div>

            {/* Bio */}
            <div>
              <p className="font-semibold text-foreground mb-2">{user.username}</p>
              <p className="text-sm text-foreground">{user.bio}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Follow</Button>
              <Button variant="outline">Message</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
