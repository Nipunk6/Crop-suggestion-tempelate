import axios from "axios"

export class DiseasePrediction {
  async predictDisease(imageFile) {
    try {
      const formData = new FormData();

      // Append image file (if provided)
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const response = await axios.post("/api/disease/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      console.error("Error predicting disease:", error);
      throw error;
    }
  }
}

      