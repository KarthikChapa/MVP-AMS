import React, { useRef, useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { Progress } from '../ui/progress';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose';

interface VideoPlayerProps {
  exerciseType: string;
}

export default function VideoPlayer({ exerciseType }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<string[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string>('');

  // Sample exercise videos
  const exerciseVideos = {
    squats: '/videos/sample-squat.mp4',
    pushups: '/videos/sample-pushup.mp4',
    deadlift: '/videos/sample-deadlift.mp4',
  };

  useEffect(() => {
    if (exerciseType && exerciseVideos[exerciseType as keyof typeof exerciseVideos]) {
      setSelectedVideo(exerciseVideos[exerciseType as keyof typeof exerciseVideos]);
    }
  }, [exerciseType]);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const pose = new Pose({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
      }
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    pose.onResults((results) => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw video frame
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

      // Draw pose landmarks
      if (results.poseLandmarks) {
        drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS, { color: '#00FF00', lineWidth: 2 });
        drawLandmarks(ctx, results.poseLandmarks, { color: '#FF0000', lineWidth: 1 });
        
        // Analyze pose and provide feedback
        analyzePose(results.poseLandmarks);
      }

      ctx.restore();
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (videoRef.current) {
          await pose.send({ image: videoRef.current });
        }
      },
      width: 640,
      height: 480
    });

    camera.start();

    return () => {
      camera.stop();
      pose.close();
    };
  }, []);

  const analyzePose = (landmarks: any[]) => {
    const feedback: string[] = [];
    
    // Example pose analysis for squats
    if (exerciseType === 'squats') {
      const hipY = landmarks[23].y; // Left hip
      const kneeY = landmarks[25].y; // Left knee
      const ankleY = landmarks[27].y; // Left ankle
      
      if (kneeY - hipY < 0.3) {
        feedback.push('Squat deeper - hips should go below knees');
      }
      if (Math.abs(landmarks[23].x - landmarks[27].x) > 0.2) {
        feedback.push('Keep knees in line with toes');
      }
    }
    
    // Update feedback if different from current
    if (JSON.stringify(feedback) !== JSON.stringify(analysisResult)) {
      setAnalysisResult(feedback);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        setSelectedVideo(data.url);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <Card className="p-4">
        <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            src={selectedVideo}
            autoPlay={false}
            playsInline
            muted
            loop
          />
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            width={640}
            height={480}
          />
          {!selectedVideo && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Skeleton className="w-full h-full" />
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-4">
          <Button
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
          >
            Upload Video
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileUpload}
          />
          <Button
            onClick={() => setIsRecording(!isRecording)}
            variant={isRecording ? "destructive" : "default"}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </Button>
        </div>

        {uploadProgress > 0 && uploadProgress < 100 && (
          <Progress value={uploadProgress} className="mt-4" />
        )}

        {analysisResult.length > 0 && (
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold mb-2">Form Feedback:</h3>
            <ul className="list-disc pl-5">
              {analysisResult.map((feedback, index) => (
                <li key={index} className="text-sm text-yellow-800">
                  {feedback}
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </div>
  );
}
