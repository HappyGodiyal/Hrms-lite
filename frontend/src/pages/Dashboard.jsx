import { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { api } from '../services/api';
import EmployeeTable from '../components/EmployeeTable';
import AddEmployeeModal from '../components/AddEmployeeModal';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import Loader from '../components/Loader';

export default function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [toDelete, setToDelete] = useState(null);


    const fetchEmployees = async () => {
        try {
            setLoading(true);
            const res = await api.get('/employees');
            setEmployees(res.data);
        } catch {
            toast.error('Failed to load employees');
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchEmployees();
    }, []);

    const addEmployee = async data => {
        try {
            const res = await api.post('/employees', data);
            setEmployees([res.data, ...employees]);
            toast.success('Employee added');
        } catch (e) {
            toast.error(e.response?.data?.message || 'Error adding employee');
        }
    };


    const deleteEmployee = async emp => {
        try {
            await api.delete(`/employees/${emp._id}`);
            setEmployees(employees.filter(e => e._id !== emp._id));
            toast.success('Employee deleted');
        } catch {
            toast.error('Delete failed');
        } finally {
            setToDelete(null);
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold">Employees</h1>
                <button
                    onClick={() => setShowAdd(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
                >
                    <FiPlus /> Add Employee
                </button>
            </div>

            {
                loading ? <Loader /> : (
                    <EmployeeTable employees={employees} onDelete={setToDelete} onView={() => { }} />
                )
            }

            {
                showAdd && (
                    <AddEmployeeModal
                        onClose={() => setShowAdd(false)}
                        onSave={addEmployee}
                    />
                )
            }

            {
                toDelete && (
                    <DeleteConfirmModal
                        employee={toDelete}
                        onCancel={() => setToDelete(null)}
                        onConfirm={() => deleteEmployee(toDelete)}
                    />
                )
            }
        </div>
    );
}