
import dotenv from "dotenv"
dotenv.config({path:"../.env"})

import app from "./app.js";
import connectDB from "./db/db.js";

 
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 9090,()=>{
        console.log(`Server is running on http://localhost:${process.env.PORT}`)
    })
})
.catch(()=>{
    console.log(`Server is not running`)
})
