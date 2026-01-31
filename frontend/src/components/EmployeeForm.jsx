import { useState } from "react";


export default function EmployeeForm({ onAdd }) {
    const [form, setForm] = useState({ employeeId: "", fullName: "", email: "", department: "" });
    const [error, setError] = useState("");


    const submit = () => {
        if (!Object.values(form).every(Boolean)) {
            return setError("All fields are required");
        }
        onAdd(form);
        setForm({ employeeId: "", fullName: "", email: "", department: "" });
        setError("");
    };
    return (
        <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Add Employee</h2>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(form).map(key => (
                    <input
                        key={key}
                        placeholder={key.replace(/([A-Z])/g, ' $1')}
                        className="border p-2 rounded"
                        value={form[key]}
                        onChange={e => setForm({ ...form, [key]: e.target.value })}
                    />
                ))}
            </div>
            <button onClick={submit} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
                Add Employee
            </button>
        </div>
    );
}