const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");
const { Authentication } = require("../middlewares/auth");

router.get("/", userControllers.GetAllUser);
router.post("/register", userControllers.Register);
router.post("/login", userControllers.Login);
router.put("/edit/:id", Authentication, userControllers.UpdateUser);

module.exports = router;
