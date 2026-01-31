import Attendance from "../models/attendence.js";

export const markAttendance = async (req, res) => {
    const { employeeId, date, status } = req.body;

    if (!employeeId || !date || !status) {
        return res.status(400).json({ message: "All fields required" });
    }

    const today = new Date(date);
    today.setHours(0, 0, 0, 0);

    const exists = await Attendance.findOne({
        employeeId,
        date: today
    });

    if (exists) {
        return res.status(409).json({
            message: "Attendance already marked for this date"
        });
    }

    const record = await Attendance.create({
        employeeId,
        date: today,
        status
    });

    res.status(201).json(record);
};


export const getAttendanceByEmployee = async (req, res) => {
    const records = await Attendance.find({ employeeId: req.params.employeeId })
        .sort({ date: -1 });

    res.json(records);
};
