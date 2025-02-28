import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import Allroutes from "./Router/router.js";
import Database from "./database/database.js";

// Load environment variables
dotenv.config();

Database()
// Connect to MongoDB

const app = express();
const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGODB_URL;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// mongoose
//   .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((error) => console.error("MongoDB Connection Failed:", error));

// Sample API route
app.get("/", (req, res) => {
  res.send("Welcome to FitnessHub API!");
});

app.use("/api", Allroutes)

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
