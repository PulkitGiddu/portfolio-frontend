import axios from 'axios';
import { API_BASE_URL } from '../config/api';

// Use centralized API configuration


const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Blog API
export const blogAPI = {
    // Get all published blogs
    getAllBlogs: () => api.get('/blogs'),

    // Get blog by slug
    getBlogBySlug: (slug: string) => api.get(`/blogs/${slug}`),

    // Get blogs by tag
    getBlogsByTag: (tag: string) => api.get(`/blogs/tag/${tag}`),

    // Create blog (admin)
    createBlog: (blogData: any) => api.post('/blogs', blogData),

    // Update blog (admin)
    updateBlog: (id: number, blogData: any) => api.put(`/blogs/${id}`, blogData),

    // Delete blog (admin)
    deleteBlog: (id: number) => api.delete(`/blogs/${id}`),
};

// Contact API
export const contactAPI = {
    // Submit contact form
    submitContact: (contactData: { name: string; email: string; message: string }) =>
        api.post('/contact', contactData),

    // Quick talk notification
    quickTalk: () => api.post('/contact/quick-talk'),
};

export default api;
