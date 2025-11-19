import axiosInstance from "./axiosInstance";

/**
 * Head API endpoints
 */

// Get Head Dashboard Statistics
export const getHeadDashboard = () => {
    return axiosInstance.get("/head/dashboard");
};

// Alternative dashboard endpoint
export const getDashboardHead = () => {
    return axiosInstance.get("/dashboard/head");
};

// Approve Officer
export const approveOfficer = (officerId) => {
    return axiosInstance.patch(`/head/approve/${officerId}`);
};

// Reject Officer
export const rejectOfficer = (officerId) => {
    return axiosInstance.patch(`/head/reject/${officerId}`);
};