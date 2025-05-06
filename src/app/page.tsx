"use client"

import { useState } from "react"
import { ImageComparisonBox } from "@/components/image-comparison-box"

export default function Page() {
  const [beforeImage, setBeforeImage] = useState<string | null>(null)
  const [afterImage, setAfterImage] = useState<string | null>(null)

  return (
    <main className="flex flex-col items-center min-h-screen bg-muted">
      <div className="w-full max-w-xl mx-auto py-16 px-4 flex flex-col items-center gap-8">
        <header className="w-full flex flex-col items-center gap-2">
          <h1 className="text-4xl font-bold text-center tracking-tight text-foreground">Before & After Image Comparison</h1>
          <p className="text-lg text-muted-foreground text-center max-w-md">
            Effortlessly compare two images side by side. Upload your before and after shots to see the difference!
          </p>
        </header>
        <section
          aria-label="Image Comparison"
          className="w-full bg-background rounded-2xl shadow-lg p-6 flex flex-col items-center"
        >
          <ImageComparisonBox
            beforeImage={beforeImage}
            afterImage={afterImage}
            onBeforeChange={setBeforeImage}
            onAfterChange={setAfterImage}
          />
        </section>
      </div>
    </main>
  )
}
