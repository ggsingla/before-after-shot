import { useState, useCallback } from 'react'
import { isImageFile } from '@/utils/image'

interface UseImageUploadResult {
  image: string | null
  setImage: (img: string | null) => void
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handlePaste: (e: ClipboardEvent) => void
}

export function useImageUpload(): UseImageUploadResult {
  const [image, setImage] = useState<string | null>(null)

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file && isImageFile(file)) {
        const reader = new FileReader()
        reader.onload = (ev) => setImage(ev.target?.result as string)
        reader.readAsDataURL(file)
      }
    },
    []
  )

  const handlePaste = useCallback((e: ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (!items) return
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile()
        if (blob) {
          const reader = new FileReader()
          reader.onload = (ev) => setImage(ev.target?.result as string)
          reader.readAsDataURL(blob)
        }
        break
      }
    }
  }, [])

  return { image, setImage, handleFileChange, handlePaste }
}
