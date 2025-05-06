"use client"

import type { FC } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ImageUploadDialog } from "@/components/image-upload-dialog"

interface ImageUploadButtonProps {
  side: "left" | "right"
  onImageSelect: (img: string) => void
  currentImage: string | null
}

export const ImageUploadButton: FC<ImageUploadButtonProps> = ({ side, onImageSelect, currentImage }) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button
        variant="outline"
        className="w-24 h-24 flex flex-col items-center justify-center"
        onClick={() => setOpen(true)}
      >
        {currentImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={currentImage} alt={side} className="w-full h-full object-contain rounded" />
        ) : (
          <span className="text-xs text-muted-foreground">{side === "left" ? "Before" : "After"}<br />Upload</span>
        )}
      </Button>
      <ImageUploadDialog
        open={open}
        onOpenChange={setOpen}
        onImageSelect={onImageSelect}
        side={side}
      />
    </>
  )
} 