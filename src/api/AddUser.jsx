import axios from "axios";
import { toast } from "react-toastify";

export const ADD_USER_URL = "http://localhost:8090/Vista-net/api/Auth/Signup.php";

export const addUser = async (payload) => {
  try {
    const response = await axios.post(ADD_USER_URL, payload, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    if (response.data.status !== "success") {
      toast.error(response.data.message || "Failed to add User");
      return null;
    }

    toast.success(response.data.message || "User added");
    return response.data.user;
  } catch (error) {
    toast.error("An error occurred while adding user");
    console.error("Adduser error:", error);
    return null;
  }
};