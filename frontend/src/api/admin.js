import axios from "./axiosInstance";

export const getAdminDashboard = () => axios.get("/dashboard/admin");
export const getAllHeads = () => axios.get("/admin/heads");