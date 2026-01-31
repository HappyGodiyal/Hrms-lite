import express from "express";
import {
    markAttendance,
    getAttendanceByEmployee
} from "../controllers/attendence.controller.js";

const router = express.Router();

router.post("/", markAttendance);
router.get("/:employeeId", getAttendanceByEmployee);

export default router;
