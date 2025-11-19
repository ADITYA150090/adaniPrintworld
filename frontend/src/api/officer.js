import axiosInstance from "./axiosInstance";

/**
 * Officer API endpoints
 */

// Get Officer Dashboard
export const getOfficerDashboard = () => {
    return axiosInstance.get("/officer/dashboard");
};

// Alternative dashboard endpoint
export const getDashboardOfficer = () => {
    return axiosInstance.get("/dashboard/officer");
};

// Lot Management
export const createLot = (data) => {
    return axiosInstance.post("/officer/lot", data);
};

export const getLots = () => {
    return axiosInstance.get("/officer/lot");
};

// Nameplate Management within Lots
export const createNameplate = (lotId, data) => {
    return axiosInstance.post(`/nameplate`, data);
};

export const getNameplates = (lotId) => {
    return axiosInstance.get(`/officer/lot/${lotId}/nameplate`);
};

export const updateNameplateStatus = (nameplateId, data) => {
    return axiosInstance.patch(`/officer/nameplate/${nameplateId}/status`, data);
};