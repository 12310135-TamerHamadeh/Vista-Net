import axios from 'axios';
import { toast } from 'react-toastify';

export const API_URL = "http://localhost/Vista-net/api/Hosts/DeleteHost.php";

export const deleteHost = async (id) => {
    try {
        const response = await axios.delete(API_URL, {
            headers: { "Content-Type": "application/json" },
            data: { id },
        });


        if (response.data.status !== "success") {
            toast.error(response.data.message || "Failed to delete host");
            return false;
        } else {
            toast.success("Host deleted successfully");
            return true;
        }
    } catch (error) {
        toast.error("An error occurred while deleting host");
        console.error("DeleteHost error:", error);
        return false;
    }
}