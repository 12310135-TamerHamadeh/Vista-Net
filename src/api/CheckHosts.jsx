import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost/Vista-net/api/Hosts/RefreshHosts.php";

export const CheckHosts = async () => {
    try {
        const response = await axios.post(API_URL, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        })

        if (response.data.status !== "success") {
            toast.error(response.data.message || "Failed to add host");
            return null;
        }

        return response.data
    } catch (error) {
        toast.error("An error occurred while pinging hosts");
        console.error("Pinging error:", error);
        return null;
    }
}