require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const proverbRoutes = require("./routes/ProverbRoutes.js");

app.use(
  cors({
    origin: "http://localhost:5174",
  })
);

const PORT = process.env.PORT || 3000;
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
