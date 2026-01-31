import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import EmployeeAttendance from './pages/EmployeeAttendance';


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees/:id/attendance" element={<EmployeeAttendance />} />
      </Routes>
    </BrowserRouter>
  );
}