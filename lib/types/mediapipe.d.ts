declare module '@mediapipe/camera_utils' {
  export class Camera {
    constructor(videoElement: HTMLVideoElement, options: {
      onFrame: () => Promise<void>;
      width: number;
      height: number;
    });
    start(): Promise<void>;
    stop(): void;
  }
}

declare module '@mediapipe/drawing_utils' {
  export function drawConnectors(
    ctx: CanvasRenderingContext2D,
    landmarks: { [key: string]: number }[],
    connections: number[][],
    options: {
      color: string;
      lineWidth: number;
    }
  ): void;

  export function drawLandmarks(
    ctx: CanvasRenderingContext2D,
    landmarks: { [key: string]: number }[],
    options: {
      color: string;
      lineWidth: number;
    }
  ): void;
}

declare module '@mediapipe/pose' {
  export const POSE_CONNECTIONS: number[][];

  export interface PoseConfig {
    modelComplexity: number;
    smoothLandmarks: boolean;
    minDetectionConfidence: number;
    minTrackingConfidence: number;
  }

  export interface PoseResults {
    poseLandmarks: Array<{
      x: number;
      y: number;
      z: number;
      visibility: number;
    }>;
    image: HTMLVideoElement | HTMLImageElement;
  }

  export class Pose {
    constructor(config?: { locateFile?: (file: string) => string });
    setOptions(config: PoseConfig): void;
    onResults(callback: (results: PoseResults) => void): void;
    send(data: { image: HTMLVideoElement | HTMLImageElement }): Promise<void>;
    close(): void;
  }
}
