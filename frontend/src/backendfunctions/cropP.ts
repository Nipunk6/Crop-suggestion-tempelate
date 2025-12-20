import axios, { AxiosResponse } from "axios";

export interface CropData {
  temperature: number;
  humidity: number;
  moisture: number;
  soil_type: string;

  // optional soil test
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
}

export interface PredictionResponse {
  crop: string | string[];
  info?: string;
  usedSoilTest?: boolean;
}

export class CropPrediction {
  public async predictCrop(
    cropData: CropData
  ): Promise<PredictionResponse> {
    const response: AxiosResponse<PredictionResponse> = await axios.post(
      "/api/v1/crops/predict",
      cropData, // ✅ send JSON directly
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    return response.data;
  }
}
