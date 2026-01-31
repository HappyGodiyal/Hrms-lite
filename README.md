# HRMS Lite – Full Stack Application

A lightweight Human Resource Management System (HRMS Lite) built to manage employees and track daily attendance.  
Designed as a clean, usable internal admin tool with a professional UI and RESTful backend.

---

## ✨ Features

### 👥 Employee Management
- Add new employees
- Unique Employee ID & email validation
- View all employees in a clean table
- Delete employee with confirmation

### 🕒 Attendance Management
- Mark attendance (Present / Absent)
- View complete attendance history per employee
- Edit attendance records
- Delete attendance records with confirmation modal

### 🎨 UI & UX
- Professional, production-ready UI
- Built with **Tailwind CSS**
- Loading, empty & error states
- Toast notifications for feedback
- Icons for intuitive actions

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- RESTful APIs

---

## 📂 Project Structure

hrms/
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── tailwind.config.js
│
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── server.js
│
├── README.md
└── .gitignore


---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/hrms.git
cd HRMS

##  Frontend Setup
cd frontend
npm install
npm run dev

## Backend SetUp
cd backend
npm install
npm run dev
