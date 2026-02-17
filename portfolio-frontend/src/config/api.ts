// ============================================
// CENTRALIZED API CONFIGURATION
// ============================================
// Change VITE_API_BASE_URL environment variable for production
// Local dev: Set to http://localhost:8081/api in .env.local
// Production: Uses Render backend by default
// ============================================

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://portfolio-backend-1-eng0.onrender.com/api';
const BACKEND_URL = API_BASE_URL.replace('/api', '');

export const ENDPOINTS = {
    // Authentication
    AUTH_STATUS: `${API_BASE_URL}/auth/status`,
    OAUTH2_GOOGLE: `${BACKEND_URL}/oauth2/authorization/google`,

    // Blogs
    BLOGS: `${API_BASE_URL}/blogs`,
    BLOG_BY_ID: (id: number) => `${API_BASE_URL}/blogs/${id}`,
    BLOG_BY_SLUG: (slug: string) => `${API_BASE_URL}/blogs/${slug}`,
    BLOGS_BY_TAG: (tag: string) => `${API_BASE_URL}/blogs/tag/${tag}`,

    // Projects
    PROJECTS: `${API_BASE_URL}/projects`,

    // Contact
    CONTACT: `${API_BASE_URL}/contact`,

    // Tracking
    TRACKING_VIEW: `${API_BASE_URL}/tracking/view`,
    TRACKING_STATS: `${API_BASE_URL}/tracking/stats`,
    TRACKING_COUNT: `${API_BASE_URL}/tracking/count`,

    // Social Links
    SOCIAL_LINKS: `${API_BASE_URL}/social-links`,
};

// Default fetch options with credentials
export const fetchWithCredentials = (endpoint: string, options: RequestInit = {}) => {
    return fetch(endpoint, {
        ...options,
        credentials: 'include',
    });
};
