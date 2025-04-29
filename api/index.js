import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";


const encodedUsername = encodeURIComponent(process.env.MONGODB_USERNAME);
const encodedPassword = encodeURIComponent(process.env.MONGODB_PASSWORD);
const host = process.env.MONGODB_HOST;
const database_name = process.env.DATABASE_NAME;
const PORT = process.env.PORT || 8081;

mongoose.connect(`mongodb+srv://${encodedUsername}:${encodedPassword}@${host}/?retryWrites=true&w=majority&appName=${database_name}`)
.then(()=>{
    console.log("Connected to MongoDB");
}).catch((error)=>{
    console.log("Error: " + error);
})

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "http://dsullivanrealty-client.s3-website-us-west-2.amazonaws.com"
  ];

app.use(cors({
    origin: allowedOrigins,
    credentials: true,  // ✅ Allows cookies to be sent
}));

app.use(express.json());
app.use(cookieParser());


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

/*************************************************************************** */
/*************************************************************************** */
/*************************************************************************** */

app.use((error, request, response, next)=>{
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Erorr";

    return response.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

  



