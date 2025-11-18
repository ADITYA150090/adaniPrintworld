import axios from "./axiosInstance";

export const getHeadDashboard = () => axios.get("/dashboard/head");
export const approveOfficer = (officerId) => axios.patch(`/head/approve/${officerId}`);
export const rejectOfficer = (officerId) => axios.patch(`/head/reject/${officerId}`);