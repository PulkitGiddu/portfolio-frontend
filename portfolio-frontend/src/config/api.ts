export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api';
const BACKEND_URL = import.meta.env.VITE_API_BASE_URL ? import.meta.env.VITE_API_BASE_URL.replace('/api', '') : 'http://localhost:8081';

export const ENDPOINTS = {
    AUTH_STATUS: `${API_BASE_URL}/auth/status`,
    BLOGS: `${API_BASE_URL}/blogs`,
    PROJECTS: `${API_BASE_URL}/projects`,
    CONTACT: `${API_BASE_URL}/contact`,
    TRACKING_VIEW: `${API_BASE_URL}/tracking/view`,
    TRACKING_STATS: `${API_BASE_URL}/tracking/stats`,
    TRACKING_COUNT: `${API_BASE_URL}/tracking/count`,
    SOCIAL_LINKS: `${API_BASE_URL}/social-links`,
    OAUTH2_GOOGLE: `${BACKEND_URL}/oauth2/authorization/google`
};
