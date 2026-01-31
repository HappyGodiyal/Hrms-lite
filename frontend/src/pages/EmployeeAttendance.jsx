import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { api } from "../services/api";

export default function EmployeeAttendance() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);

    const [showMark, setShowMark] = useState(false);
    const [editing, setEditing] = useState(null);
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("Present");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedRecordId, setSelectedRecordId] = useState(null);

    const fetchEmployee = async () => {
        try {
            const res = await api.get("/employees");
            setEmployee(res.data.find(e => e._id === id));
        } catch {
            toast.error("Failed to load attendance");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployee();
    }, [id]);

    const saveAttendance = async () => {
        try {
            if (editing) {
                await api.put(`/employees/${id}/attendance`, {
                    recordId: editing._id,
                    status
                });
                toast.success("Attendance updated");
            } else {
                await api.post(`/employees/${id}/attendance`, { date, status });
                toast.success("Attendance marked");
            }

            setShowMark(false);
            setEditing(null);
            setDate("");
            setStatus("Present");
            fetchEmployee();
        } catch (e) {
            toast.error(e.response?.data?.message || "Action failed");
        }
    };

    const confirmDeleteAttendance = async () => {
        try {
            await api.delete(
                `/employees/${id}/attendance/${selectedRecordId}`
            );
            toast.success("Attendance deleted");
            fetchEmployee();
        } catch {
            toast.error("Delete failed");
        } finally {
            setShowDeleteModal(false);
            setSelectedRecordId(null);
        }
    };

    if (loading) return <Loader />;
    if (!employee) return <p className="text-center mt-10">Employee not found</p>;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex justify-between mb-6">
                <button onClick={() => navigate(-1)} className="text-blue-600">← Back</button>
                <button
                    onClick={() => setShowMark(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Mark Attendance
                </button>
            </div>

            <h2 className="text-xl font-semibold mb-6">
                Attendance – {employee.fullName}
            </h2>

            {employee.attendance.length === 0 ? (
                <p className="text-gray-500">No attendance records</p>
            ) : (
                <div className="bg-white rounded shadow">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-4">Date</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employee.attendance.map(a => (
                                <tr key={a._id} className="border-t">
                                    <td className="p-4 text-center">{a.date}</td>
                                    <td className="p-4 text-center">
                                        <span className={`px-2 py-1 rounded text-sm ${a.status === "Present"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}>
                                            {a.status}
                                        </span>
                                    </td>
                                    <td className="p-4 flex justify-end gap-4">
                                        <FiEdit2
                                            className="cursor-pointer text-blue-600"
                                            onClick={() => {
                                                setEditing(a);
                                                setStatus(a.status);
                                                setShowMark(true);
                                            }}
                                        />
                                        <FiTrash2
                                            className="cursor-pointer text-red-500"
                                            onClick={() => {
                                                setSelectedRecordId(a._id);
                                                setShowDeleteModal(true);
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {showMark && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white p-6 rounded w-full max-w-sm">
                        <h3 className="font-semibold mb-4">
                            {editing ? "Edit Attendance" : "Mark Attendance"}
                        </h3>

                        {!editing && (
                            <input
                                type="date"
                                className="border p-2 rounded w-full mb-3"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                            />
                        )}

                        <select
                            className="border p-2 rounded w-full"
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                        >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                        </select>

                        <div className="flex justify-end gap-3 mt-5">
                            <button onClick={() => {
                                setShowMark(false);
                                setEditing(null);
                            }}>
                                Cancel
                            </button>
                            <button
                                onClick={saveAttendance}
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* 🔥 CONFIRM DELETE MODAL */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-sm">
                        <h3 className="text-lg font-semibold mb-3">
                            Delete Attendance?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 rounded border"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeleteAttendance}
                                className="px-4 py-2 rounded bg-red-600 text-white"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
