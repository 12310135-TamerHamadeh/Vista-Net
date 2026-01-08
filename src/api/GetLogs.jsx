import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost/Vista-net/api/Hosts/GetLogs.php?limit=100";

export const getLogs = async () => {
  try {
    const response = await axios.get(API_URL, { withCredentials: true });

    if (response.data.status !== "success") {
      toast.error(response.data.message || "Failed to fetch logs");
      return null;
    }

    return response.data.logs;
  } catch (error) {
    toast.error("An error occurred while fetching logs");
    console.error("GetLogs error:", error);
    return null;
  }
};
