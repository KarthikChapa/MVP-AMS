import { Button } from "@/components/ui/button"

export function VideoExerciseHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Video Exercise Tracking</h1>
        <div className="text-muted-foreground text-sm">
          Track your form and get real-time feedback on your exercises
        </div>
      </div>
      <Button>Upload New Video</Button>
    </div>
  )
} 