import axios from "axios";
import { toast } from "react-toastify";

export const API_URL = "http://localhost/Vista-net/api/Hosts/GetHosts.php";

export const getHosts = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: { "Content-Type": "application/json" }
        });

        

        if (response.data.status !== "success") {
            toast.error(response.data.message || "Failed to fetch hosts");
            return null;
        }else {
            return response.data.hosts;
        }
    } catch (error) {
        toast.error("An error occurred while fetching hosts");
        console.error("GetHosts error:", error);
        return null;
    }
}