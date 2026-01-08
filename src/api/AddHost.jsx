import axios from "axios";
import { toast } from "react-toastify";

export const ADD_HOST_URL = "http://localhost/Vista-net/api/Hosts/AddHost.php";

export const addHost = async (payload) => {
  try {
    const response = await axios.post(ADD_HOST_URL, payload, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (response.data.status !== "success") {
      toast.error(response.data.message || "Failed to add host");
      return null;
    }

    toast.success(response.data.message || "Host added");
    return response.data.host;
  } catch (error) {
    toast.error("An error occurred while adding host");
    console.error("AddHost error:", error);
    return null;
  }
};
