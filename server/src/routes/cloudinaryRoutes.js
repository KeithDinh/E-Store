const express = require("express");
const router = express.Router();

// from middlewares
const { authCheck, adminCheck } = require("../middlewares/authMiddlewares");

const {
  uploadImages,
  removeImage,
} = require("../controllers/cloudinaryController");

router.route("/upload-images").post(authCheck, adminCheck, uploadImages);
router.route("/remove-image").post(authCheck, adminCheck, removeImage);

module.exports = router;
