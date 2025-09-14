import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async() =>{
    try {
        const connectedInstance = await mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`)
        console.log(process.env.DATABASE_URI)
        console.log(`mongodb connected succesfully !! db host at ${connectedInstance.connection.host}`)
    } catch (error) {
        console.log('mongodb not connected')
        process.exit(0)
    }
}

export default connectDB;