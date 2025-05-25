require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const proverbRoutes = require("./routes/ProverbRoutes.js");

const PORT = process.env.PORT || 3000;

// Enable CORS for your frontend domain
app.use(cors({
  origin: "https://afghan-proverbs-5.onrender.com", 
  methods: ["GET", "POST", "PUT", "DELETE"], 
  credentials: true, 
}));

app.use(express.json());
app.use("/api/proverbs", proverbRoutes);

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error(
    "Error: MONGODB_URI environment variable is not set. Please set it to your MongoDB Atlas URI."
  );
  process.exit(1);
}

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`MongoDB connected: ${MONGODB_URI}`);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });