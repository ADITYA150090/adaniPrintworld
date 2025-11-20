// src/api/nameplate.js
import axios from "axios";

const API_BASE =
    import.meta.env.VITE_API_URL || "http://localhost:10000";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// Fetch logged-in user profile
export const fetchProfile = async() => {
    const headers = getAuthHeaders();
    if (!headers.Authorization) {
        throw new Error("No auth token found");
    }

    const res = await axios.get(`${API_BASE}/auth/profile`, { headers });
    return res.data.data;
};

// Create Nameplate
export const createNameplate = async(lotId, payload, options = {}) => {
    const headers = getAuthHeaders();
    if (!headers.Authorization) {
        throw new Error("No auth token found");
    }

    const body = {
        lotId: lotId,
        officerId: options.officerId || payload.officerId || null,
        headId: options.headId || payload.headId || null,
        status: options.status || payload.status || "unverified",

        theme: payload.theme,
        selectedImage: payload.selectedImage,
        name: payload.name,
        address: payload.address,
        houseName: payload.houseName,

        nameStyle: payload.nameStyle,
        addressStyle: payload.addressStyle,
        houseStyle: payload.houseStyle,
    };

    const res = await axios.post(`${API_BASE}/api/nameplate`, body, { headers });
    return res.data;
};

// Admin create
export const createNameplateFromAdmin = (data) => {
    return axios.post(`${API_BASE}/api/nameplate`, data, {
        headers: getAuthHeaders(),
    });
};

// Get all
export const getAllNameplates = () => {
    return axios.get(`${API_BASE}/api/nameplate`, {
        headers: getAuthHeaders(),
    });
};

// Get by ID
export const getNameplateById = (id) => {
    return axios.get(`${API_BASE}/api/nameplate/${id}`, {
        headers: getAuthHeaders(),
    });
};

// Approve
export const approveNameplate = (id, data) => {
    return axios.patch(`${API_BASE}/api/nameplate/${id}/approve`, data, {
        headers: getAuthHeaders(),
    });
};

// Reject
export const rejectNameplate = (id) => {
    return axios.patch(`${API_BASE}/api/nameplate/${id}/reject`, null, {
        headers: getAuthHeaders(),
    });
};