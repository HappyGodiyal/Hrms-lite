import express from 'express';
import {
    getEmployees,
    createEmployee,
    deleteEmployee,
    getAttendance,
    addAttendance,
    updateAttendance,
    deleteAttendance
} from '../controllers/employee.controller.js';

const router = express.Router();

router.get('/', getEmployees);
router.post('/', createEmployee);
router.delete('/:id', deleteEmployee);

router.get('/:id/attendance', getAttendance);
router.post('/:id/attendance', addAttendance);
router.put('/:id/attendance', updateAttendance);
router.delete("/:id/attendance/:recordId", deleteAttendance);

export default router;
