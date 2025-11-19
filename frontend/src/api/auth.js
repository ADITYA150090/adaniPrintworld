import axiosInstance from "./axiosInstance";

/**
 * Authentication API endpoints
 */

// User Signup - Admin, Head, or Officer
export const signup = (type, data) => {
    return axiosInstance.post(`/auth/signup/${type}`, data);
};

// Admin Signup
export const signupAdmin = (data) => {
    return axiosInstance.post("/auth/signup/Admin", data);
};

// Head Signup
export const signupHead = (data) => {
    return axiosInstance.post("/auth/signup/Head", data);
};

// Officer Signup
export const signupOfficer = (data) => {
    return axiosInstance.post("/auth/signup/Officer", data);
};

// User Login
export const login = (credentials) => {
    return axiosInstance.post("/auth/login", credentials);
};

// Verify Email
export const verifyEmail = (token) => {
    return axiosInstance.patch(`/auth/verify-email?token=${token}`);
};

// Approve Officer (Head role only)
export const approveOfficerByHead = (officerId) => {
    return axiosInstance.patch(`/auth/approve-officer/${officerId}`);
};

// Logout (client-side)
export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
};