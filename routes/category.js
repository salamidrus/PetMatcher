const express = require("express");
const router = express.Router();
const categoryControllers = require("../controllers/category");

router.get("/", categoryControllers.GetAllCategories);
router.post("/", categoryControllers.Create);
router.put("/edit/:id", categoryControllers.Update);
router.delete("/delete/:id", categoryControllers.Delete);

module.exports = router;
