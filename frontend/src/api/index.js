/**
 * Central API Export
 * Import all API functions from this file throughout the application
 */

// Export all authentication APIs
export * from "./auth";

// Export all admin APIs
export * from "./admin";

// Export all head APIs
export * from "./head";

// Export all officer APIs
export * from "./officer";

// Export all nameplate APIs
export * from "./nameplate";

// Export all dashboard APIs
export * from "./dashboard";

// Export axios instance for custom requests
export { default as axiosInstance }
from "./axiosInstance";