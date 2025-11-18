import axios from "./axiosInstance";

export const getOfficerDashboard = () => axios.get("/dashboard/officer");

export const createLot = (data) => axios.post("/officer/lot", data);
export const getLots = () => axios.get("/officer/lot");

export const createNameplate = (lotId, data) =>
    axios.post(`/officer/lot/${lotId}/nameplate`, data);

export const getNameplates = (lotId) =>
    axios.get(`/officer/lot/${lotId}/nameplate`);

export const updateNameplateStatus = (nameplateId, data) =>
    axios.patch(`/officer/nameplate/${nameplateId}/status`, data);