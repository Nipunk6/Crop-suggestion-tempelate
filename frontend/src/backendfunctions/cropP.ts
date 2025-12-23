import { AxiosResponse } from "axios";
import api from "@/api/axios"; 

export interface CropData {
  temperature: number;
  humidity: number;
  moisture: number;
  soil_type: string;

  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
}

export interface PredictionResponse {
  data: {
    crop: string | string[];
    info?: string;
    usedSoilTest?: boolean;
  };
}

export class CropPrediction {
  public async predictCrop(
    cropData: CropData
  ): Promise<PredictionResponse> {
    const response: AxiosResponse<PredictionResponse> =
      await api.post("/crops/predict", cropData);

    return response.data;
  }
}
