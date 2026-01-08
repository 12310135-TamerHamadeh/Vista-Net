import axios from "axios";
import { toast } from "react-toastify";

export const API_URL = "http://localhost:8090/Vista-net/api/users/GetAllUsers.php";

export const GetAllUsers = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: { "Content-Type": "application/json" }
        });

        

        if (response.data.status !== "success") {
            toast.error(response.data.message || "Failed to fetch users");
            return null;
        }else {
            return response.data.users;
        }
    } catch (error) {
        toast.error("An error occurred while fetching users");
        console.error("GetAllUsers error:", error);
        return null;
    }
} 