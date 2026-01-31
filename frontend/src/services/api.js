import axios from "axios";
import toast from "react-hot-toast";

export const api = axios.create({
    baseURL: "http://localhost:5000/api",
});

api.interceptors.response.use(
    res => res,
    err => {
        toast.error(err.response?.data?.message || "Something went wrong");
        return Promise.reject(err);
    }
);
