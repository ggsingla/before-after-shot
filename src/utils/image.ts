// Utility to preload an image and return a promise
export async function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

// Utility to check if a file is an image
export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/')
}

interface GeneratePreviewOptions {
  beforeImage: string
  afterImage: string
  width?: number
  height?: number
}

export async function generateComparisonPreview({
  beforeImage,
  afterImage,
  width = 800,
  height = 400,
}: GeneratePreviewOptions): Promise<string> {
  const beforeImg = await preloadImage(beforeImage)
  const afterImg = await preloadImage(afterImage)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')!

  // Fill background
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, width, height)

  // Draw borders
  ctx.strokeStyle = '#d1d5db' // Tailwind gray-300
  ctx.lineWidth = 4
  ctx.strokeRect(0, 0, width, height)

  // Draw before image (left)
  const halfW = width / 2
  const imgH = height - 40
  ctx.save()
  ctx.beginPath()
  ctx.rect(0, 0, halfW, height)
  ctx.clip()
  drawContain(ctx, beforeImg, 0, 0, halfW, imgH)
  ctx.restore()

  // Draw after image (right)
  ctx.save()
  ctx.beginPath()
  ctx.rect(halfW, 0, halfW, height)
  ctx.clip()
  drawContain(ctx, afterImg, halfW, 0, halfW, imgH)
  ctx.restore()

  // Draw separator
  ctx.fillStyle = '#9ca3af' // Tailwind gray-400
  ctx.fillRect(halfW - 1, 0, 2, height)

  // Draw captions
  ctx.font = 'bold 20px Arial'
  ctx.textAlign = 'center'
  ctx.fillStyle = 'rgba(0,0,0,0.7)'
  ctx.fillRect(0, height - 40, halfW, 40)
  ctx.fillRect(halfW, height - 40, halfW, 40)
  ctx.fillStyle = '#fff'
  ctx.fillText('Before', halfW / 2, height - 15)
  ctx.fillText('After', halfW + halfW / 2, height - 15)

  return canvas.toDataURL('image/png')
}

// Helper to draw image as object-contain
function drawContain(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number
) {
  const ratio = Math.min(w / img.width, h / img.height)
  const nw = img.width * ratio
  const nh = img.height * ratio
  const dx = x + (w - nw) / 2
  const dy = y + (h - nh) / 2
  ctx.drawImage(img, dx, dy, nw, nh)
}
