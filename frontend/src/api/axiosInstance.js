import axios from "axios";

// Use environment variable for API base URL with fallback
const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:10000";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 30000, // 30 second timeout
});

// Request interceptor - attach token automatically
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

// Response interceptor - handle global errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Network error (no response from server)
        if (!error.response) {
            console.error("Network error: Unable to reach the server");
            // Optional: Show a toast/notification to user
            return Promise.reject({
                message: "Network error. Please check your internet connection.",
                type: "network"
            });
        }

        const { status, data } = error.response;

        // Handle different error status codes
        switch (status) {
            case 401:
                console.warn("Unauthorized (401): Redirecting to login...");
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/login";
                break;

            case 403:
                console.error("Forbidden (403): Access denied");
                // Optional: Redirect to access denied page
                break;

            case 404:
                console.error("Not Found (404):", data.error || "Resource not found");
                break;

            case 500:
                console.error("Server Error (500):", data.error || "Internal server error");
                break;

            case 429:
                console.error("Too Many Requests (429): Rate limit exceeded");
                break;

            default:
                console.error(`Error (${status}):`, data.error || error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;