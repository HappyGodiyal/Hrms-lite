import { useState } from "react";


export default function AttendanceModal({ employee, onClose, onSave }) {
    const [status, setStatus] = useState("Present");


    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded w-80">
                <h3 className="font-semibold mb-4">Mark Attendance</h3>
                <p className="text-sm mb-2">{employee.fullName}</p>
                <select className="border w-full p-2 rounded" value={status} onChange={e => setStatus(e.target.value)}>
                    <option>Present</option>
                    <option>Absent</option>
                </select>
                <div className="flex justify-end gap-3 mt-4">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={() => onSave(status)} className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
                </div>
            </div>
        </div>
    );
}