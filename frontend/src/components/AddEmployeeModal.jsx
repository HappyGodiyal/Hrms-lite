import { useState } from 'react';
import toast from 'react-hot-toast';


export default function AddEmployeeModal({ onClose, onSave }) {
    const [form, setForm] = useState({ employeeId: '', fullName: '', email: '', department: '' });


    const submit = () => {
        if (!Object.values(form).every(Boolean)) {
            toast.error('All fields required');
            return;
        }
        onSave(form);
        onClose();
    };
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Add Employee</h2>
                <div className="space-y-3">
                    {Object.keys(form).map(k => (
                        <input
                            key={k}
                            className="border p-2 rounded w-full"
                            placeholder={k.replace(/([A-Z])/g, ' $1')}
                            value={form[k]}
                            onChange={e => setForm({ ...form, [k]: e.target.value })}
                        />
                    ))}
                </div>
                <div className="flex justify-end gap-3 mt-5">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={submit} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
                </div>
            </div>
        </div>
    );
}