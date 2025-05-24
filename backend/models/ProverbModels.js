const mongoose = require("mongoose");

const proverbSchema = new mongoose.Schema(
  {
    textDari: { type: String, required: true },
    textPashto: { type: String, required: true },
    translationEn: { type: String, required: true },
    meaning: { type: String, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Proverb", proverbSchema);
