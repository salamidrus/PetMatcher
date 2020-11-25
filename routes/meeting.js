const express = require("express");
const router = express.Router();
const { Authentication } = require("../middlewares/auth");
const meetingControllers = require("../controllers/meeting");

router.get("/", Authentication, meetingControllers.GetAllMeetings);
router.post("/", Authentication, meetingControllers.Create);
router.put("/edit/:id", Authentication, meetingControllers.Update);
router.delete("/delete/:id", Authentication, meetingControllers.Delete);

module.exports = router;
