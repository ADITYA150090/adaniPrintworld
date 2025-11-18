import axios from "./axiosInstance";

export const createNameplateFromAdmin = (data) => axios.post("/api/nameplate", data);
export const getAllNameplates = () => axios.get("/api/nameplate");
export const getNameplateById = (id) => axios.get(`/api/nameplate/${id}`);
export const approveNameplate = (id, data) => axios.patch(`/api/nameplate/${id}/approve`, data);
export const rejectNameplate = (id) => axios.patch(`/api/nameplate/${id}/reject`);