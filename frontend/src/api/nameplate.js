import axiosInstance from "./axiosInstance";

/**
 * Nameplate API endpoints (Public & Admin)
 */

// Create Nameplate (Public endpoint)
export const createNameplate = (data) => {
    return axiosInstance.post("/api/nameplate", data);
};

// Create Nameplate from Admin
export const createNameplateFromAdmin = (data) => {
    return axiosInstance.post("/api/nameplate", data);
};

// Get All Nameplates
export const getAllNameplates = () => {
    return axiosInstance.get("/api/nameplate");
};

// Get Nameplate by ID
export const getNameplateById = (id) => {
    return axiosInstance.get(`/api/nameplate/${id}`);
};

// Approve Nameplate
export const approveNameplate = (id, data) => {
    return axiosInstance.patch(`/api/nameplate/${id}/approve`, data);
};

// Reject Nameplate
export const rejectNameplate = (id) => {
    return axiosInstance.patch(`/api/nameplate/${id}/reject`);
};