import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import contactRoutes from "./routes/contact.route.js";
import aiRoutes from "./routes/ai.route.js";

dotenv.config();

console.log("Allowed Origins:", process.env.CORS_ORIGINS);

const app = express();
const port = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URI;

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGINS 
        ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim()) 
        : ['http://localhost:5173'],
    credentials: true
}));
app.use(express.json());

// DB Connection
mongoose
    .connect(MONGO_URL)
    .then(async () => {
        console.log("Connected to MongoDB");
        try {
            await mongoose.connection.db.collection('contacts').dropIndex('email_1');
        } catch (error) {
            // Index might not exist or already be dropped, ignore
        }
    })
    .catch((error) => console.error("MongoDB Connection Error:", error));

// Routes
app.use("/api/v1/contact", contactRoutes);
app.use("/api/v1/ai", aiRoutes);

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
