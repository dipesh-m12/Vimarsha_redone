"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { X, ImageIcon, Plus } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { addPost } from "@/lib/store"

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  onPost: (post: { image: string; caption: string; hashtags: string[] }) => void
  userId?: string
}

export function CreatePostModal({ isOpen, onClose, onPost, userId = "user_1" }: CreatePostModalProps) {
  const [step, setStep] = useState(1)
  const [image, setImage] = useState<string | null>(null)
  const [caption, setCaption] = useState("")
  const [hashtags, setHashtags] = useState<string[]>([])
  const [hashtagInput, setHashtagInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isOpen) {
      setStep(1)
      setImage(null)
      setCaption("")
      setHashtags([])
      setHashtagInput("")
      setIsLoading(false)
    }
  }, [isOpen])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
        setStep(2)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.add("bg-muted")
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove("bg-muted")
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.remove("bg-muted")
    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
        setStep(2)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddHashtag = () => {
    if (hashtagInput.trim()) {
      const tag = hashtagInput.startsWith("#") ? hashtagInput : `#${hashtagInput}`
      if (!hashtags.includes(tag)) {
        setHashtags([...hashtags, tag])
      }
      setHashtagInput("")
    }
  }

  const handleRemoveHashtag = (tag: string) => {
    setHashtags(hashtags.filter((t) => t !== tag))
  }

  const handlePost = async () => {
    if (image && caption) {
      setIsLoading(true)
      try {
        const newPost = await addPost({
          userId,
          image,
          caption,
          hashtags,
        })
        onPost({ image, caption, hashtags })
        onClose()
      } catch (error) {
        console.error("Error creating post:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {step === 1 ? "Create new post" : "Write a caption"}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {step === 1 ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-12 cursor-pointer hover:bg-muted transition-colors"
            >
              <ImageIcon size={48} className="text-muted-foreground mb-4" />
              <p className="text-foreground font-semibold mb-2 text-center">Drag photos and videos here</p>
              <p className="text-sm text-muted-foreground text-center">or click to select</p>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-border">
                <Image src={image || ""} alt="Preview" fill className="object-cover" />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Caption</label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write your caption..."
                  className="w-full p-3 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground resize-none h-24"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-foreground block mb-2">Hashtags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    value={hashtagInput}
                    onChange={(e) => setHashtagInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddHashtag()}
                    placeholder="Add hashtags..."
                    className="flex-1 p-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground"
                  />
                  <Button onClick={handleAddHashtag} className="bg-primary text-primary-foreground">
                    <Plus size={18} />
                  </Button>
                </div>

                {hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {hashtags.map((tag) => (
                      <div
                        key={tag}
                        className="flex items-center gap-2 bg-muted text-foreground px-3 py-1 rounded-full text-sm"
                      >
                        <span>{tag}</span>
                        <button
                          onClick={() => handleRemoveHashtag(tag)}
                          className="hover:text-destructive transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-2 p-4 border-t border-border bg-muted">
          {step === 2 && (
            <Button onClick={() => setStep(1)} variant="outline" className="flex-1 bg-transparent border-border">
              Back
            </Button>
          )}
          <Button
            onClick={step === 1 ? () => fileInputRef.current?.click() : handlePost}
            disabled={step === 2 && !image}
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            {isLoading ? "Posting..." : step === 1 ? "Upload Image" : "Post"}
          </Button>
        </div>
      </div>
    </div>
  )
}
