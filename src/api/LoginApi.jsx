import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:8090/Vista-net/api/Auth/Login.php";

export const LoginApi = async (email, password) => {
    try {
        const response = await axios.post(API_URL,
            {
                email,
                password
            },
            { headers: { "Content-Type": "application/json" } }
        );

        console.log(`response: ${response.data.message}`)

        const data = response.data;

        if (data.message !== "Login successful") {
            toast.error(data.message || "Login failed");
            return null;
        }else {
            toast.success("Login successful");
            return data;
        }

    } catch (error) {
        toast.error("An error occurred during login");

        console.error("Login error:", error);
        return null;
    }
};
