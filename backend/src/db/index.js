import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
const connectDB=async()=>{
    try {
        let connectioni=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n mongoDB connencted : db host:${connectioni.connection.host}`);
        
    } catch (error) {
        console.log(`connection error ${error}`);
        process.exit(1)
    }
}
export default connectDB