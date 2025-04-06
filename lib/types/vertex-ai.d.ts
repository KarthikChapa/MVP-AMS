declare module '@google-cloud/aiplatform' {
  export interface PredictionServiceClientConfig {
    apiEndpoint: string;
    credentials?: {
      client_email: string;
      private_key: string;
    };
  }

  export interface PredictRequest {
    endpoint: string;
    instances: any[];
    parameters?: {
      confidenceThreshold?: number;
      maxPredictions?: number;
      [key: string]: any;
    };
  }

  export interface PredictResponse {
    predictions: Array<{
      [key: string]: any;
    }>;
  }

  export class PredictionServiceClient {
    constructor(config: PredictionServiceClientConfig);
    predict(request: PredictRequest): Promise<[PredictResponse]>;
  }

  export interface PredictionModelResponse {
    predictions: Array<{
      risk_score?: number;
      confidence_score?: number;
      decline_areas?: string[];
      time_frame?: string;
      recommendations?: string[];
      injury_risk_score?: number;
      risk_areas?: string[];
      contributing_factors?: string[];
      suggested_strategies?: string[];
      recovery_time?: string;
    }>;
  }
}
