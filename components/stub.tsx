import React from 'react';

interface StubComponentProps {
  name: string;
  className?: string;
}

export function createStubComponent(defaultName: string) {
  return function StubComponent({ name = defaultName, className }: StubComponentProps) {
    return (
      <div className={`p-4 border border-dashed border-gray-300 rounded-lg ${className}`}>
        <div className="text-sm text-gray-500 text-center">
          {name} component is not available in this build
        </div>
      </div>
    );
  };
}

export const VideoPlayer = createStubComponent('Video Player');
export const VideoExerciseHeader = createStubComponent('Video Exercise Header');
export const BiometricStatus = createStubComponent('Biometric Status');
export const PerformancePrediction = createStubComponent('Performance Prediction');
export const VideoAnalysis = createStubComponent('Video Analysis');
