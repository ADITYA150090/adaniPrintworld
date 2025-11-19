import axiosInstance from "./axiosInstance";

/**
 * Admin API endpoints
 */

// Get Admin Dashboard Statistics
export const getAdminDashboard = () => {
    return axiosInstance.get("/admin/dashboard");
};

// Get All Heads
export const getAllHeads = () => {
    return axiosInstance.get("/admin/heads");
};

// Alternative dashboard endpoint
export const getDashboardAdmin = () => {
    return axiosInstance.get("/dashboard/admin");
};