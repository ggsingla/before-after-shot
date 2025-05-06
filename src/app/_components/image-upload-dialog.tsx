"use client"

import type { FC } from "react"
import { useRef, useEffect } from "react"
import { useImageUpload } from "@/hooks/use-image-upload"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface ImageUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onImageSelect: (img: string) => void
  side: "left" | "right"
}

export const ImageUploadDialog: FC<ImageUploadDialogProps> = ({ open, onOpenChange, onImageSelect, side }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { image, setImage, handleFileChange, handlePaste } = useImageUpload()

  useEffect(() => {
    if (!open) setImage(null)
  }, [open, setImage])

  useEffect(() => {
    if (!open) return
    const onPaste = (e: ClipboardEvent) => {
      handlePaste(e)
    }
    window.addEventListener("paste", onPaste)
    return () => window.removeEventListener("paste", onPaste)
  }, [open, handlePaste])

  useEffect(() => {
    if (image) {
      onImageSelect(image)
      onOpenChange(false)
    }
  }, [image, onImageSelect, onOpenChange])

  if (!open) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[350px]">
        <DialogHeader>
          <DialogTitle>Upload {side === "left" ? "Before" : "After"} Image</DialogTitle>
          <DialogDescription>
            Select an image file or paste from your clipboard.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 items-center w-full">
          <Input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            variant="outline"
            className="w-full"
            onClick={() => inputRef.current?.click()}
            type="button"
          >
            Select Image
          </Button>
          <p className="w-full text-center text-sm text-muted-foreground mt-2">
            Or use <kbd className="font-semibold">Ctrl+V</kbd> (Windows) or <kbd className="font-semibold">Cmd+V</kbd> (Mac) to paste an image from your clipboard.
          </p>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)} type="button">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 