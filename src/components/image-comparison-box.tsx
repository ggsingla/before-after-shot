"use client"
import { useState } from "react"
import { ImageUploadButton } from "@/components/image-upload-button"
import { ImagePreview } from "@/components/image-preview"
import { Button } from "@/components/ui/button"
import { generateComparisonPreview } from "@/utils/image"

export const ImageComparisonBox = () => {
  const [beforeImage, setBeforeImage] = useState<string | null>(null)
  const [afterImage, setAfterImage] = useState<string | null>(null)

  const [isDownloading, setIsDownloading] = useState(false)

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

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-base text-center text-muted-foreground mb-2" id="upload-instructions">
        Select your before and after images to get started.
      </p>
      <div className="flex w-full justify-between gap-8" aria-describedby="upload-instructions">
        <div className="flex flex-col items-center gap-1 w-1/2">
          <ImageUploadButton
            side="left"
            onImageSelect={img => setBeforeImage(img)}
            currentImage={beforeImage}
          />
          <span className="text-xs text-muted-foreground">Before</span>
        </div>
        <div className="flex flex-col items-center gap-1 w-1/2">
          <ImageUploadButton
            side="right"
            onImageSelect={img => setAfterImage(img)}
            currentImage={afterImage}
          />
          <span className="text-xs text-muted-foreground">After</span>
        </div>
      </div>
      {/* Preview */}
      <div className="w-full flex justify-center">
        {beforeImage && afterImage ? (
          <ImagePreview beforeImage={beforeImage} afterImage={afterImage} />
        ) : (
          <div className="flex items-center justify-center w-full max-w-lg aspect-[2/1] border-2 border-dashed border-gray-200 rounded-lg bg-muted text-muted-foreground text-center">
            Upload both images to compare
          </div>
        )}
      </div>
      {/* Download button */}
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
    </div>
  )
} 