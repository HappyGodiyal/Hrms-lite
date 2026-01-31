
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";

import employeeRoutes from './routes/employee.route.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/employees', employeeRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(5000, () => console.log("Server running on 5000"));
    })
    .catch(console.error);
