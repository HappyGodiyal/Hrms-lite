import mongoose from "mongoose";


const attendanceSchema = new mongoose.Schema({
    date: { type: String, required: true },
    status: { type: String, enum: ["Present", "Absent"], required: true }
});


const employeeSchema = new mongoose.Schema({
    employeeId: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    attendance: [attendanceSchema]
}, { timestamps: true });


export default mongoose.model("Employee", employeeSchema);