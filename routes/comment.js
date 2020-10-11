const express = require("express");
const router = express.Router();
const { Authentication } = require("../middlewares/auth");
const commentControllers = require("../controllers/comment");

router.get("/", Authentication, commentControllers.GetAllComments);
router.post("/", Authentication, commentControllers.Create);
router.put("/edit/:id", Authentication, commentControllers.Update);
router.delete("/delete/:id", Authentication, commentControllers.Delete);

module.exports = router;
