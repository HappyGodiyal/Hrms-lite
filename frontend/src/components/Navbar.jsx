import { Link } from "react-router-dom";


export default function Navbar() {
    return (
        <nav className="bg-white shadow px-6 py-4 flex justify-between">
            <h1 className="text-xl font-semibold text-blue-600">HRMS Lite</h1>
            <div className="space-x-4">
                <Link to="/" className="hover:text-blue-600">Employees</Link>
            </div>
        </nav>
    );
}