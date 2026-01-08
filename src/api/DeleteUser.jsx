import axios from 'axios';
import { toast } from 'react-toastify';

export const API_URL = "http://localhost:8090/Vista-net/api/users/DeleteUser.php";

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(API_URL, {
            headers: { "Content-Type": "application/json" },
            data: { id },
        });


        if (response.data.status !== "success") {
            toast.error(response.data.message || "Failed to delete User");
            return false;
        } else {
            toast.success("User deleted successfully");
            return true;
        }
    } catch (error) {
        toast.error("An error occurred while deleting User");
        console.error("DeleteUser error:", error);
        return false;
    }
}