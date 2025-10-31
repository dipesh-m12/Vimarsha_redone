"use client"

import type React from "react"

import { useState, useRef } from "react"
import { ImageIcon } from "lucide-react"

interface PostComposerProps {
  onPostSubmit: (text: string, image?: string) => void
}

export function PostComposer({ onPostSubmit }: PostComposerProps) {
  const [text, setText] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = () => {
    if (text.trim() || imageUrl.trim()) {
      onPostSubmit(text, imageUrl || undefined)
      setText("")
      setImageUrl("")
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const isDisabled = !text.trim() && !imageUrl.trim()

  return (
    <div className="flex gap-4">
      {/* Avatar */}
      <img src="/diverse-user-avatars.png" alt="Your avatar" className="w-12 h-12 rounded-full" />

      {/* Composer */}
      <div className="flex-1">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's happening!"
          className="w-full bg-transparent text-2xl text-foreground placeholder:text-muted-foreground resize-none outline-none"
          rows={3}
        />

        {/* Image Preview */}
        {imageUrl && (
          <div className="mt-4 relative inline-block">
            <img src={imageUrl || "/placeholder.svg"} alt="Preview" className="max-w-xs rounded-2xl max-h-96" />
            <button
              onClick={() => setImageUrl("")}
              className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1 hover:bg-black transition"
            >
              ✕
            </button>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <div className="flex gap-2">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-primary hover:bg-primary/10 p-2 rounded-full transition"
              title="Add image"
            >
              <ImageIcon size={20} />
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </div>
          <button
            onClick={handleSubmit}
            disabled={isDisabled}
            className="bg-primary text-primary-foreground font-bold rounded-full px-6 py-2 hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  )
}
