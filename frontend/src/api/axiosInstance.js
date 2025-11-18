import axios from "axios";

const API_BASE_URL = "http://localhost:10000"; // change in prod

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" }
});

// Attach token automatically
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// Handle global errors
axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response.status === 401) {
            console.warn("Unauthorized, redirecting to login...");
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(err);
    }
);

export default axiosInstance;