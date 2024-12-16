import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/user.routes.js";

const encodedUsername = encodeURIComponent(process.env.MONGODB_USERNAME);
const encodedPassword = encodeURIComponent(process.env.MONGODB_PASSWORD);
const host = process.env.MONGODB_HOST;
const database_name = process.env.DATABASE_NAME;

mongoose.connect(`mongodb+srv://${encodedUsername}:${encodedPassword}@${host}/?retryWrites=true&w=majority&appName=${database_name}`)
.then(()=>{
    console.log("Connected to MongoDB");
}).catch((error)=>{
    console.log("Error: " + error);
})

const app = express();

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})

app.use("/api/user", userRouter);