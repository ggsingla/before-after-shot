"use client"
import { useState } from "react"
import { ImagePreview } from "@/app/_components/image-preview"
import { Button } from "@/components/ui/button"
import { generateComparisonPreview } from "@/utils/image"
import { Card, CardContent } from "@/components/ui/card"
import { ImageUploadDialog } from "@/components/image-upload-dialog"

export const ImageComparisonBox = () => {
  const [beforeImage, setBeforeImage] = useState<string | null>(null)
  const [afterImage, setAfterImage] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [activeSide, setActiveSide] = useState<"left" | "right" | null>(null)

  const handleDownload = async () => {
    if (!beforeImage || !afterImage) return
    setIsDownloading(true)
    try {
      const dataUrl = await generateComparisonPreview({ beforeImage, afterImage })
      const link = document.createElement("a")
      link.href = dataUrl
      link.download = "before-after-comparison.png"
      link.click()
    } finally {
      setIsDownloading(false)
    }
  }

  const handleSideClick = (side: "left" | "right") => {
    setActiveSide(side)
    setDialogOpen(true)
  }

  const handleImageSelect = (img: string) => {
    if (activeSide === "left") setBeforeImage(img)
    if (activeSide === "right") setAfterImage(img)
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      <Card>
        <CardContent className="flex flex-col items-center gap-6">
          <p className="text-base text-center text-muted-foreground mb-2" id="upload-instructions">
            Click on the image box to <strong>upload/replace</strong> the image.
          </p>
          <div className="w-full flex justify-center">
            <ImagePreview
              beforeImage={beforeImage}
              afterImage={afterImage}
              onClickBefore={() => handleSideClick("left")}
              onClickAfter={() => handleSideClick("right")}
            />
          </div>
          <div className="w-full flex justify-center">
            <Button
              onClick={handleDownload}
              disabled={!beforeImage || !afterImage || isDownloading}
              variant="default"
              className="px-8"
            >
              {isDownloading ? "Preparing..." : "Download Comparison"}
            </Button>
          </div>
        </CardContent>
      </Card>
      <ImageUploadDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onImageSelect={handleImageSelect}
        side={activeSide || "left"}
      />
    </div>
  )
} 