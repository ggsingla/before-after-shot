/* eslint-disable @next/next/no-img-element */
"use client"

import type { FC } from "react"

interface ImagePreviewProps {
  beforeImage: string
  afterImage: string
}

export const ImagePreview: FC<ImagePreviewProps> = ({ beforeImage, afterImage }) => {
  return (
    <div className="relative flex w-full max-w-lg aspect-[2/1] border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow">
      {/* Before image */}
      <div className="relative w-1/2 h-full flex items-center justify-center border-r-2 border-gray-300">
        <img src={beforeImage} alt="Before" className="object-contain w-full h-full" />
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-1 text-sm font-semibold">Before</div>
      </div>
      {/* Separator */}
      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gray-400 z-10" style={{ transform: 'translateX(-50%)' }} />
      {/* After image */}
      <div className="relative w-1/2 h-full flex items-center justify-center border-l-2 border-gray-300">
        <img src={afterImage} alt="After" className="object-contain w-full h-full" />
        <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-1 text-sm font-semibold">After</div>
      </div>
    </div>
  )
} 