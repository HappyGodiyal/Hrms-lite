import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);

    const load = async () => {
        const res = await api.get("/employees");
        setEmployees(res.data);
    };

    useEffect(() => { load(); }, []);

    return (
        <div>
            {employees.length === 0 && <p>No employees found</p>}
            {employees.map(emp => (
                <div key={emp._id}>
                    <strong>{emp.fullName}</strong> — {emp.department}
                </div>
            ))}
        </div>
    );
}
