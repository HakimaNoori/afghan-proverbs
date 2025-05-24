const express = require("express");
const router = express.Router();
const controller = require("../controllers/ProverbControllers.js");

router.get("/", controller.getAllProverbs);
router.get("/random", controller.getRandomProverb);
router.get("/:id", controller.getProverbById); 

router.post("/", controller.addProverb);
router.put("/:id", controller.updateProverb);
router.delete("/:id", controller.deleteProverb);

module.exports = router;
