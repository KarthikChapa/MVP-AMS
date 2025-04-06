import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

interface Exercise {
  id: string;
  name: string;
  type: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  targetMuscles: string[];
  videoUrl: string;
  poseGuide: {
    checkpoints: string[];
    angles: {
      [key: string]: { min: number; max: number };
    };
  };
}

const exercises: Exercise[] = [
  {
    id: 'squat',
    name: 'Squats',
    type: 'squats',
    difficulty: 'beginner',
    targetMuscles: ['quadriceps', 'hamstrings', 'glutes', 'core'],
    videoUrl: '/videos/sample-squat.mp4',
    poseGuide: {
      checkpoints: [
        'Feet shoulder-width apart',
        'Knees in line with toes',
        'Back straight',
        'Hips below knees at bottom',
      ],
      angles: {
        knee: { min: 70, max: 160 },
        hip: { min: 50, max: 170 },
        ankle: { min: 60, max: 100 },
      },
    },
  },
  {
    id: 'pushup',
    name: 'Push-ups',
    type: 'pushups',
    difficulty: 'intermediate',
    targetMuscles: ['chest', 'shoulders', 'triceps', 'core'],
    videoUrl: '/videos/sample-pushup.mp4',
    poseGuide: {
      checkpoints: [
        'Hands slightly wider than shoulders',
        'Body straight line',
        'Elbows close to body',
        'Full range of motion',
      ],
      angles: {
        elbow: { min: 80, max: 160 },
        shoulder: { min: 70, max: 160 },
        hip: { min: 160, max: 180 },
      },
    },
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    type: 'deadlift',
    difficulty: 'advanced',
    targetMuscles: ['lower back', 'glutes', 'hamstrings', 'core'],
    videoUrl: '/videos/sample-deadlift.mp4',
    poseGuide: {
      checkpoints: [
        'Bar over mid-foot',
        'Shoulders over bar',
        'Back straight',
        'Bar path vertical',
      ],
      angles: {
        hip: { min: 50, max: 170 },
        knee: { min: 70, max: 160 },
        back: { min: 160, max: 180 },
      },
    },
  },
];

interface ExerciseListProps {
  onSelectExercise: (exercise: Exercise) => void;
}

export default function ExerciseList({ onSelectExercise }: ExerciseListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {exercises.map((exercise) => (
        <Card key={exercise.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-lg">{exercise.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">
                Difficulty: <span className="capitalize">{exercise.difficulty}</span>
              </p>
              <div>
                <p className="text-sm font-medium">Target Muscles:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {exercise.targetMuscles.map((muscle) => (
                    <span
                      key={muscle}
                      className="text-xs bg-gray-100 px-2 py-1 rounded"
                    >
                      {muscle}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Key Checkpoints:</p>
                <ul className="text-xs list-disc list-inside mt-1">
                  {exercise.poseGuide.checkpoints.slice(0, 2).map((checkpoint) => (
                    <li key={checkpoint}>{checkpoint}</li>
                  ))}
                </ul>
              </div>
              <Button
                className="w-full mt-4"
                onClick={() => onSelectExercise(exercise)}
              >
                Start Exercise
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
