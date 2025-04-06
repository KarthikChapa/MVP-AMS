"use client"

import { useState, useEffect } from "react"
import { CheckCircle, AlertCircle, Circle } from "lucide-react"

interface FeedbackPanelProps {
  exerciseId: string
  progress: number
}

// Demo feedback data
const feedbackData = {
  squat: [
    { id: 1, checkpoint: "Knees track over toes", status: "good" },
    { id: 2, checkpoint: "Back straight", status: "warning" },
    { id: 3, checkpoint: "Depth at parallel", status: "good" },
    { id: 4, checkpoint: "Feet shoulder width apart", status: "good" },
    { id: 5, checkpoint: "Weight on heels", status: "neutral" },
  ],
  deadlift: [
    { id: 1, checkpoint: "Back straight", status: "good" },
    { id: 2, checkpoint: "Bar path vertical", status: "good" },
    { id: 3, checkpoint: "Hips hinge properly", status: "warning" },
    { id: 4, checkpoint: "Shoulders over bar", status: "good" },
    { id: 5, checkpoint: "Neck neutral", status: "neutral" },
  ],
  "bench-press": [
    { id: 1, checkpoint: "Wrists straight", status: "good" },
    { id: 2, checkpoint: "Bar path vertical", status: "warning" },
    { id: 3, checkpoint: "Elbows tucked", status: "good" },
    { id: 4, checkpoint: "Back arch appropriate", status: "neutral" },
    { id: 5, checkpoint: "Feet stable on ground", status: "good" },
  ],
}

export function FeedbackPanel({ exerciseId, progress }: FeedbackPanelProps) {
  const [currentFeedback, setCurrentFeedback] = useState<any[]>([])
  const [feedbackMessage, setFeedbackMessage] = useState("")

  useEffect(() => {
    // Get appropriate feedback data or default to squat if not found
    const feedbackItems = feedbackData[exerciseId as keyof typeof feedbackData] || feedbackData.squat
    
    // Update feedback message based on progress
    if (progress < 30) {
      setFeedbackMessage("Starting position looks good. Maintain proper form.")
    } else if (progress < 60) {
      setFeedbackMessage("Watch your back position. Try to keep it straighter.")
    } else if (progress < 90) {
      setFeedbackMessage("Great depth! Push through your heels on the way up.")
    } else {
      setFeedbackMessage("Excellent form overall. Complete the movement with control.")
    }
    
    setCurrentFeedback(feedbackItems)
  }, [exerciseId, progress])

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200">
        {feedbackMessage}
      </div>
      
      <div className="space-y-3">
        {currentFeedback.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            {item.status === "good" ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : item.status === "warning" ? (
              <AlertCircle className="h-5 w-5 text-amber-500" />
            ) : (
              <Circle className="h-5 w-5 text-slate-400" />
            )}
            <span>{item.checkpoint}</span>
          </div>
        ))}
      </div>
    </div>
  )
} 