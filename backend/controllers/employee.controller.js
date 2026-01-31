import Employee from '../models/employee.js';

/* ================= EMPLOYEES ================= */

// GET all employees
export const getEmployees = async (req, res) => {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.status(200).json(employees);
};

// CREATE employee
export const createEmployee = async (req, res) => {
    const { employeeId, fullName, email, department } = req.body;

    if (!employeeId || !fullName || !email || !department) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const exists = await Employee.findOne({
        $or: [{ employeeId }, { email }]
    });

    if (exists) {
        return res.status(409).json({ message: 'Employee already exists' });
    }

    const employee = await Employee.create({
        employeeId,
        fullName,
        email,
        department
    });

    res.status(201).json(employee);
};

// DELETE employee
export const deleteEmployee = async (req, res) => {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    await employee.deleteOne();
    res.status(200).json({ message: 'Employee deleted successfully' });
};

/* ================= ATTENDANCE ================= */

// GET attendance (for eye icon page)
export const getAttendance = async (req, res) => {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json(employee.attendance);
};

// ADD attendance
export const addAttendance = async (req, res) => {
    const { date, status } = req.body;

    if (!date || !status) {
        return res.status(400).json({ message: 'Date and status are required' });
    }

    const employee = await Employee.findById(req.params.id);

    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    const alreadyMarked = employee.attendance.find(a => a.date === date);

    if (alreadyMarked) {
        return res
            .status(409)
            .json({ message: 'Attendance already marked for this date' });
    }

    employee.attendance.push({ date, status });
    await employee.save();

    res.status(200).json(employee.attendance);
};

// UPDATE attendance
export const updateAttendance = async (req, res) => {
    const { recordId, status } = req.body;

    const employee = await Employee.findById(req.params.id);

    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    const record = employee.attendance.id(recordId);

    if (!record) {
        return res.status(404).json({ message: 'Attendance record not found' });
    }

    record.status = status;
    await employee.save();

    res.status(200).json(employee.attendance);
};

// DELETE attendance record
export const deleteAttendance = async (req, res) => {
    const { recordId } = req.params;

    const employee = await Employee.findById(req.params.id);
    if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
    }

    const record = employee.attendance.id(recordId);
    if (!record) {
        return res.status(404).json({ message: "Attendance record not found" });
    }

    record.deleteOne();
    await employee.save();

    res.status(200).json(employee.attendance);
};
