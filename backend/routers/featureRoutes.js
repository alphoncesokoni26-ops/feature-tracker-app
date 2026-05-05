const express = require("express");
const router = express.Router();

const {
  getFeatures,
  addFeature,
  updateFeature,
  deleteFeature,
} = require("../controllers/featureController");

router.get("/", getFeatures);
router.post("/", addFeature);
router.put("/:id", updateFeature);
router.delete("/:id", deleteFeature);

module.exports = router;