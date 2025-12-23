import api from "@/api/axios";

// Expected ApiResponse shape from backend
interface DiseaseApiResponse {
  statusCode: number;
  data: {
    disease: string;
    info: string;
  } | null;
  message: string;
  success: boolean;
}

export class DiseasePrediction {
  /**
   * Sends an image file to the backend for disease prediction.
   */
  async predictDisease(imageFile: File): Promise<DiseaseApiResponse> {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await api.post<DiseaseApiResponse>(
        "/disease/predict",
        formData
      );

      return response.data;
    } catch (error) {
      console.error("Error predicting disease:", error);
      throw error;
    }
  }
}
