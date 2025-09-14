import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import contactRoutes from "./routes/contact.route.js";
import geminiRoutes from "./routes/gemini.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URI;

// Middleware
app.use(cors({
    origin: ['https://inferno-web.vercel.app','http://localhost:3000', 'http://127.0.0.1:5500', 'http://localhost:5500'], // Add your frontend URLs
    credentials: true
}));
app.use(express.json());

// DB Connection
mongoose
    .connect(MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB Connection Error:", error));

// Routes
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/gemini", geminiRoutes);

// Health check route
app.get("/", (req, res) => {
    res.json({ message: "Inferno Backend API is running!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
