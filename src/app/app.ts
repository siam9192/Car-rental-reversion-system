import express, { Request,Response,NextFunction } from "express";
import cors from "cors"
import router from "./Routes";
const app = express()

app.use(cors())
app.use(express.json())


app.use("/api",router)

app.use((err:any,req:Request,res:Response,next:NextFunction)=>{
res.status(err.statusCode || 400).json({
    success:false,
    message:err.message
})

app.use((req,res)=>{
    res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Not Found"
      }
      )
})
})
export default app 