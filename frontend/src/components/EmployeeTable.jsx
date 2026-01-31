import { FiEye, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';


export default function EmployeeTable({ employees, onDelete }) {
    const navigate = useNavigate();


    if (!employees.length) {
        return <p className="text-center text-gray-500 py-10">No employees found</p>;
    }
    return (
        <div className="bg-white rounded shadow mt-6 overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-50 text-left">
                    <tr>
                        <th className="p-4">Name</th>
                        <th className="p-4">Email</th>
                        <th className="p-4">Department</th>
                        <th className="p-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <tr key={emp._id} className="border-t hover:bg-gray-50">
                            <td className="p-4">{emp.fullName}</td>
                            <td className="p-4">{emp.email}</td>
                            <td className="p-4">{emp.department}</td>
                            <td className="p-4 flex justify-end gap-4">
                                <FiEye
                                    className="cursor-pointer text-blue-600"
                                    title="View Attendance"
                                    onClick={() => navigate(`/employees/${emp._id}/attendance`)}
                                />
                                <FiTrash2
                                    className="cursor-pointer text-red-500"
                                    title="Delete Employee"
                                    onClick={() => onDelete(emp)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}