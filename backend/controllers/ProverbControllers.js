const Proverb = require("../models/ProverbModels.js");

const getAllProverbs = async (req, res) => {
  const { category, search } = req.query;
  let filter = {};

  if (category) filter.category = category;
  if (search) {
    const regex = new RegExp(search, "i");
    filter.$or = [
      { textDari: regex },
      { textPashto: regex },
      { translationEn: regex },
      { meaning: regex },
    ];
  }

  const proverbs = await Proverb.find(filter);
  res.json(proverbs);
};

const getProverbById = async (req, res) => {
  const { id } = req.params;
  const proverb = await Proverb.findById(id);
  if (!proverb) return res.status(404).json({ message: "Proverb not found" });
  res.json(proverb);
};

const addProverb = async (req, res) => {
  console.log("Received:", req.body);
  const { textDari, textPashto, translationEn, meaning, category } = req.body;

  if (!textDari || !textPashto || !translationEn || !meaning || !category) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const newProverb = new Proverb({
    textDari,
    textPashto,
    translationEn,
    meaning,
    category,
  });
  await newProverb.save();

  res
    .status(201)
    .json({ message: "Proverb added successfully", proverb: newProverb });
};

const updateProverb = async (req, res) => {
  const { id } = req.params;
  const updated = await Proverb.findByIdAndUpdate(id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: "Proverb not found" });
  res.json({ message: "Proverb updated", proverb: updated });
};

const deleteProverb = async (req, res) => {
  const { id } = req.params;
  const deleted = await Proverb.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ message: "Proverb not found" });
  res.status(204).send();
};

const getRandomProverb = async (req, res) => {
  const count = await Proverb.countDocuments();
  const randomIndex = Math.floor(Math.random() * count);
  const randomProverb = await Proverb.findOne().skip(randomIndex);
  res.json(randomProverb);
};

module.exports = {
  getAllProverbs,
  getProverbById,
  addProverb,
  updateProverb,
  deleteProverb,
  getRandomProverb,
};
