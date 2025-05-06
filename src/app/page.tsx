import { ImageComparisonBox } from "@/app/_components/image-comparison-box"

const Page = () => {
  return (
    <main className="flex flex-col items-center min-h-screen bg-muted">
      <div className="w-full mx-auto py-16 px-4 grid grid-rows-[auto_1fr] place-items-center gap-8">
        <header className="text-center max-w-xl">
          <h1 className="text-3xl font-bold mb-2">Before & After Comparison</h1>
          <p className="text-muted-foreground">Compare images side by side</p>
        </header>
        <ImageComparisonBox />
      </div>
    </main>
  )
}

export default Page
