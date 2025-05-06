/* eslint-disable @next/next/no-img-element */
"use client"

import type { FC } from "react"
import { Camera, RefreshCw } from "lucide-react"

interface ImagePreviewProps {
  beforeImage: string | null
  afterImage: string | null
  onClickBefore?: () => void
  onClickAfter?: () => void
}

export const ImagePreview: FC<ImagePreviewProps> = ({ beforeImage, afterImage, onClickBefore, onClickAfter }) => {
  return (
    <div className="relative flex w-full aspect-[2/1] border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow">
      {/* Before image side */}
      <div
        className="relative w-1/2 h-full flex items-center justify-center border-r-2 border-gray-300 cursor-pointer outline-none group focus-visible:ring-2 focus-visible:ring-primary/70 transition"
        role="button"
        tabIndex={0}
        aria-label={beforeImage ? "Click to replace before image" : "Click to upload before image"}
        onClick={onClickBefore}
        onKeyDown={e => (e.key === "Enter" || e.key === " ") && onClickBefore?.()}
      >
        {beforeImage && (
          <>
            <img src={beforeImage} alt="Before" className="object-contain w-full h-full" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-1 text-sm font-semibold z-10">Before</div>
            {/* Overlay for replace */}
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity z-20">
              <RefreshCw className="w-7 h-7 mb-2 text-white" />
              <span className="text-white font-medium text-base">Click to replace</span>
            </div>
          </>
        )}
        {!beforeImage && (
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center z-20">
            <Camera className="w-7 h-7 mb-2 text-white" />
            <span className="text-white font-medium text-base">Click to upload</span>
          </div>
        )}
      </div>
      {/* Separator */}
      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-400 z-10" style={{ transform: 'translateX(-50%)' }} />
      {/* After image side */}
      <div
        className="relative w-1/2 h-full flex items-center justify-center border-l-2 border-gray-300 cursor-pointer outline-none group focus-visible:ring-2 focus-visible:ring-primary/70 transition"
        role="button"
        tabIndex={0}
        aria-label={afterImage ? "Click to replace after image" : "Click to upload after image"}
        onClick={onClickAfter}
        onKeyDown={e => (e.key === "Enter" || e.key === " ") && onClickAfter?.()}
      >
        {afterImage && (
          <>
            <img src={afterImage} alt="After" className="object-contain w-full h-full" />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-1 text-sm font-semibold z-10">After</div>
            {/* Overlay for replace */}
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity z-20">
              <RefreshCw className="w-7 h-7 mb-2 text-white" />
              <span className="text-white font-medium text-base">Click to replace</span>
            </div>
          </>
        )}
        {!afterImage && (
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center z-20">
            <Camera className="w-7 h-7 mb-2 text-white" />
            <span className="text-white font-medium text-base">Click to upload</span>
          </div>
        )}
      </div>
    </div>
  )
} 