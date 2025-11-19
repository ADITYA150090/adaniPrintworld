 import axiosInstance from "./axiosInstance";

 /**
  * Dashboard API endpoints
  */

 // Get Head Dashboard
 export const getHeadDashboard = () => {
     return axiosInstance.get("/dashboard/head");
 };