import axios from 'axios';
import { toast } from "react-toastify";

export const Signup = async ( email, password, name ) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/signup`, { // link will change
            email,
            password,
            name
        });
        toast.success("Signup successful! You can now log in.");
        return response.data;
    } catch (error) {
        toast.error("Signup failed. Please try again.");
    }
}