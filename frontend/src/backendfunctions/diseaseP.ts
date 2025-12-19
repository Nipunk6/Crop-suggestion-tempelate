// import axios from "axios"

// export class DiseasePrediction {
//   async predictDisease(imageFile) {
//     try {
//       const formData = new FormData();

//       // Append image file (if provided)
//       if (imageFile) {
//         formData.append("image", imageFile);
//       }

//       const response = await axios.post("/api/disease/predict", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//         withCredentials: true,
//       });

//       return response.data;
//     } catch (error) {
//       console.error("Error predicting disease:", error);
//       throw error;
//     }
//   }
// }

import axios from "axios";

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
   * @param imageFile The image file selected by the user.
   * @returns A promise that resolves with the prediction data.
   */
  async predictDisease(imageFile: File): Promise<DiseaseApiResponse> {
    try {
      const formData = new FormData();

      // Append image file
      formData.append("image", imageFile);

      // Tell Axios what kind of response data to expect
      const response = await axios.post<DiseaseApiResponse>("/api/v1/disease/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.error("Error predicting disease:", error);
      // It's good practice to re-throw the error so the calling function can handle it
      throw error;
    }
  }
}