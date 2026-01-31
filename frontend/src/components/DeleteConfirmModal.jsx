export default function DeleteConfirmModal({ employee, onCancel, onConfirm }) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded max-w-sm w-full">
                <h3 className="font-semibold mb-2">Delete Employee</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Are you sure you want to delete {employee.fullName}? This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                    <button onClick={onCancel}>Cancel</button>
                    <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                </div>
            </div>
        </div>
    );
}