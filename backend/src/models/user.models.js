import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { ApiError } from "../utils/Apierror.js";

const userSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, 
        },
        
        avatar: {
            type: String, // cloudinary url
            
        },
        isAdmin:  { 
            type: Boolean,
            default: false
            },
       
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        },
        contactNo:{
            
        }

    },
    {
        location:{
             type: Schema.Types.ObjectId,
             required:true,
             ref: "location"
        }
    },
    {
        cropPreffered:{
             type: Schema.Types.ObjectId,
             ref: "crops"
        }
    },
     {
        soilTest:{
             type: Schema.Types.ObjectId,
             ref: "soilTest"
        }
    },
    {
        landArea:{
            type:String,
            required:true
        }
    },
    {
        timestamps: true
    }
)
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    try {
        this.password=await bcrypt.hash(this.password,10)
    
        next()
    } catch (error) {
        next(new ApiError(409,"password hashing error"))
    }
})
userSchema.methods.isPasswordCorrect=async function(password) {
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=async function() {
    return jwt.sign({
        _id:this._id,
       
    },process.env.ACCESS_TOKEN_SECRET,
{expiresIn:process.env.ACCESS_TOKEN_EXPIRE})
}
userSchema.methods.generateRefreshToken=async function() {
    return jwt.sign({
        _id:this._id,
        
    },process.env.REFRESH_TOKEN_SECRET,
{expiresIn:process.env.REFRESH_TOKEN_EXPIRE})
}

export const User= mongoose.model("User",userSchema)