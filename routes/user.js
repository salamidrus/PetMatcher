const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/user");

router.get("/", userControllers.GetAllUser);
router.post("/", userControllers.CreateUser);

module.exports = router;
