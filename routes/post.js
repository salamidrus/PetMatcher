const express = require("express");
const router = express.Router();
const { Authentication } = require("../middlewares/auth");
const postControllers = require("../controllers/post");
const multer = require("../middlewares/multer");

router.post(
  "/",
  Authentication,
  multer.single("image"),
  postControllers.Create
);

router.get("/", Authentication, postControllers.GetAllPosts);
router.put(
  "/edit/:id",
  Authentication,
  multer.single("image"),
  postControllers.Update
);
router.delete("/delete/:id", Authentication, postControllers.Delete);

module.exports = router;
