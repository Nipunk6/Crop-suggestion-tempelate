import axios, { AxiosResponse, AxiosError } from "axios";

/**
 * @interface CropData
 * Defines the structure for the crop input data.
 * All values are expected to be suitable for FormData.
 */
export interface CropData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
  // Allows for additional, untyped properties if necessary
  [key: string]: any;
}

/**
 * @interface PredictionResponse
 * Defines the expected structure of the API response after a successful prediction.
 */
export interface PredictionResponse {
  predictedCrop: string;
  confidenceScore?: number;
  // Add any other properties returned by your API
}

export class CropPrediction {
  /**
   * Sends crop and soil data to the prediction API.
   * @param cropData An object containing the environmental and chemical data for the crop.
   * @param soilTestFile An optional file object from a file input.
   * @returns A promise that resolves to the prediction data from the API.
   */
  public async predictCrop(
    cropData: CropData,
    soilTestFile?: File
  ): Promise<PredictionResponse> {
    try {
      const formData = new FormData();

      // Append all key-value pairs from the cropData object to formData
      Object.keys(cropData).forEach((key) => {
        formData.append(key, String(cropData[key]));
      });

      // If a soil test file is provided, append it to the form data
      if (soilTestFile) {
        formData.append("soilTest", soilTestFile);
      }

      // Make the POST request with the multipart form data
      const response: AxiosResponse<PredictionResponse> = await axios.post(
        "/api/v1/crops/predict",
        formData,
        {
          headers: {
            // This header is crucial for file uploads with FormData
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Send cookies with the request
        }
      );

      return response.data;
    } catch (error) {
      // It's good practice to check if the error is an AxiosError
      if (axios.isAxiosError(error)) {
        console.error(
          "Error predicting crop (Axios):",
          error.response?.data || error.message
        );
      } else {
        console.error("An unexpected error occurred:", error);
      }
      // Re-throw the error to be handled by the calling function
      throw error;
    }
  }
}