import mongoose, { Schema } from "mongoose";

const historySchema = new Schema(
  {
    // Link to the User ya farmer so that populate by koi history function
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, 
    },
    
    
    type: {
      type: String,
      enum: ["crop-suggestion", "disease-detection"],
      required: true,
    },

    
    image: {
      type: String, // Cloudinary URL
    },
    
    confidence: {
      type: Number, 
      required: true,
    },

   
    cropName: {
      type: String, 
      trim: true,
    },
    
    diseaseName: {
      type: String, 
      trim: true,
    },
    
    additionalInfo: {
      type: Object, 
    }
  },
  {
    timestamps: true, 
  }
);

export const History = mongoose.model("History", historySchema);