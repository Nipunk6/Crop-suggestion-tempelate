import axios from "axios";

export class CropPrediction {
  async predictCrop(cropData, soilTestFile) {
    try {
      const formData = new FormData();

     
      Object.keys(cropData).forEach((key) => {
        formData.append(key, cropData[key]);
      });

     
      if (soilTestFile) {
        formData.append("soilTest", soilTestFile);
      }

      const response = await axios.post("/api/crop/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // if you want cookies
      });

      return response.data;
    } catch (error) {
      console.error("Error predicting crop:", error);
      throw error;
    }
  }
}
