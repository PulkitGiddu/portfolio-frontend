import { useState, useEffect } from 'react';
import { ENDPOINTS } from '../config/api';
import { FaPlus, FaSignOutAlt, FaTrash, FaChartBar } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface BlogPost {
    id: number;
    title: string;
    summary: string;
    content: string;
    publishedAt: string;
    tags: string;
    coverImageUrl?: string;
    slug: string;
}

interface Project {
    id: number;
    title: string;
    description: string;
    projectUrl: string;
    tags: string;
}

interface AdminLog {
    id: number;
    email: string;
    ipAddress: string;
    timestamp: string;
    status: string;
}

interface PageView {
    id: number;
    pagePath: string;
    ipAddress: string;
    userAgent: string;
    timestamp: string;
}

const AdminDashboard = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [stats, setStats] = useState<{ adminLogs: AdminLog[], pageViews: PageView[] }>({ adminLogs: [], pageViews: [] });
    const [activeTab, setActiveTab] = useState<'blogs' | 'projects' | 'stats'>('blogs');

    // Form State
    const [isCreating, setIsCreating] = useState(false);
    const [newPost, setNewPost] = useState({ title: '', content: '', summary: '', tags: '', published: true, coverImageUrl: '' });
    const [newProject, setNewProject] = useState({ title: '', description: '', url: '', tags: '', image: null as File | null });

    useEffect(() => {
        checkAuth();
    }, []);

    useEffect(() => {
        if (isAdmin) {
            fetchPosts();
            fetchProjects();
            fetchStats();
        }
    }, [isAdmin]);

    const checkAuth = async () => {
        try {
            const res = await fetch(ENDPOINTS.AUTH_STATUS, { credentials: 'include' });
            if (res.ok) {
                const data = await res.json();
                setIsAdmin(data.isAdmin);
            }
        } catch (error) {
            console.error('Auth check failed', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchPosts = async () => {
        try {
            const res = await fetch(ENDPOINTS.BLOGS);
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            console.error('Failed to fetch blogs', error);
        }
    };

    const fetchProjects = async () => {
        try {
            const res = await fetch(ENDPOINTS.PROJECTS);
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            }
        } catch (error) {
            console.error('Failed to fetch projects', error);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await fetch(ENDPOINTS.TRACKING_STATS, { credentials: 'include' });
            if (res.ok) {
                const data = await res.json();
                setStats(data);
            }
        } catch (error) {
            console.error('Failed to fetch stats', error);
        }
    };

    const handleLogin = () => {
        window.location.href = ENDPOINTS.OAUTH2_GOOGLE;
    };

    const handleCreatePost = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(ENDPOINTS.BLOGS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(newPost)
            });

            if (res.ok) {
                setIsCreating(false);
                setNewPost({ title: '', content: '', summary: '', tags: '', published: true, coverImageUrl: '' });
                fetchPosts();
                alert('Post created successfully!');
            } else {
                const err = await res.text();
                alert('Failed to create post: ' + err);
            }
        } catch (error) {
            console.error('Error creating post', error);
            alert('Error creating post');
        }
    };

    const handleCreateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', newProject.title);
            formData.append('description', newProject.description);
            formData.append('url', newProject.url);
            formData.append('tags', newProject.tags);
            if (newProject.image) {
                formData.append('image', newProject.image);
            }

            const res = await fetch(ENDPOINTS.PROJECTS, {
                method: 'POST',
                credentials: 'include',
                body: formData
            });

            if (res.ok) {
                setIsCreating(false);
                setNewProject({ title: '', description: '', url: '', tags: '', image: null });
                fetchProjects();
                alert('Project created successfully!');
            } else {
                alert('Failed to create project');
            }
        } catch (error) {
            console.error('Error creating project', error);
            alert('Error creating project');
        }
    };

    const handleDeletePost = async (id: number) => {
        if (!confirm('Are you sure you want to delete this post?')) return;
        try {
            const res = await fetch(`${ENDPOINTS.BLOGS}/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (res.ok) {
                fetchPosts();
            } else {
                alert('Failed to delete post');
            }
        } catch (error) {
            console.error('Error deleting post', error);
        }
    };

    const handleDeleteProject = async (id: number) => {
        if (!confirm('Are you sure you want to delete this project?')) return;
        try {
            const res = await fetch(`${ENDPOINTS.PROJECTS}/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (res.ok) {
                fetchProjects();
            } else {
                alert('Failed to delete project');
            }
        } catch (error) {
            console.error('Error deleting project', error);
        }
    };

    if (isLoading) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
                <h1 className="text-4xl font-bold mb-8 font-mono">Admin Access Required</h1>
                <p className="text-gray-400 mb-8 max-w-md text-center">
                    Please log in with your authorized Google account to manage the portfolio content.
                </p>
                <button
                    onClick={handleLogin}
                    className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors"
                >
                    <img src="https://www.google.com/favicon.ico" alt="G" className="w-6 h-6" />
                    Sign in with Google
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                            Admin Dashboard
                        </h1>
                        <p className="text-gray-400">Manage your blog posts and content.</p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => window.location.href = '/'}
                            className="px-4 py-2 text-sm text-gray-400 hover:text-white"
                        >
                            Back to Site
                        </button>
                        <button
                            onClick={handleLogin} // Re-auth essentially, or use a logout endpoint if verified
                            className="px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 flex items-center gap-2"
                        >
                            <FaSignOutAlt /> Switch Account
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-6 mb-8 border-b border-gray-800">
                    <button
                        onClick={() => { setActiveTab('blogs'); setIsCreating(false); }}
                        className={`pb-4 px-2 font-medium transition-colors relative ${activeTab === 'blogs' ? 'text-teal-500' : 'text-gray-500 hover:text-white'}`}
                    >
                        Blogs
                        {activeTab === 'blogs' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500" />}
                    </button>
                    <button
                        onClick={() => { setActiveTab('projects'); setIsCreating(false); }}
                        className={`pb-4 px-2 font-medium transition-colors relative ${activeTab === 'projects' ? 'text-teal-500' : 'text-gray-500 hover:text-white'}`}
                    >
                        Projects
                        {activeTab === 'projects' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500" />}
                    </button>
                    <button
                        onClick={() => { setActiveTab('stats'); setIsCreating(false); }}
                        className={`pb-4 px-2 font-medium transition-colors relative ${activeTab === 'stats' ? 'text-teal-500' : 'text-gray-500 hover:text-white'}`}
                    >
                        Stats
                        {activeTab === 'stats' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500" />}
                    </button>
                </div>

                {activeTab === 'blogs' && (
                    <>
                        {/* Create Blog Section */}
                        <div className="mb-12">
                            {!isCreating ? (
                                <button
                                    onClick={() => setIsCreating(true)}
                                    className="w-full py-8 border-2 border-dashed border-gray-800 rounded-2xl text-gray-500 hover:border-teal-500 hover:text-teal-500 transition-all flex flex-col items-center justify-center gap-2"
                                >
                                    <FaPlus className="text-2xl" />
                                    <span className="font-medium">Create New Blog Post</span>
                                </button>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8"
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold">New Post</h2>
                                        <button onClick={() => setIsCreating(false)} className="text-gray-400 hover:text-white">Cancel</button>
                                    </div>

                                    <form onSubmit={handleCreatePost} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm text-gray-400 mb-2">Title</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none"
                                                    value={newPost.title}
                                                    onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-400 mb-2">Cover Image URL</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none"
                                                    value={newPost.coverImageUrl}
                                                    onChange={e => setNewPost({ ...newPost, coverImageUrl: e.target.value })}
                                                    placeholder="https://..."
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Summary</label>
                                            <textarea
                                                className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none"
                                                rows={2}
                                                value={newPost.summary}
                                                onChange={e => setNewPost({ ...newPost, summary: e.target.value })}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Content (Markdown)</label>
                                            <textarea
                                                className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none font-mono text-sm"
                                                rows={12}
                                                value={newPost.content}
                                                onChange={e => setNewPost({ ...newPost, content: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Tags</label>
                                            <input
                                                type="text"
                                                className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none"
                                                value={newPost.tags}
                                                onChange={e => setNewPost({ ...newPost, tags: e.target.value })}
                                                placeholder="Tech, Life, Design"
                                            />
                                        </div>

                                        <div className="flex justify-end pt-4">
                                            <button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-xl transition-colors">
                                                Publish
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}
                        </div>

                        {/* List Blog Section */}
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                            Recent Posts
                        </h2>
                        <div className="grid gap-4">
                            {posts.map(post => (
                                <div key={post.id} className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 flex justify-between items-center group hover:border-gray-700 transition-colors">
                                    <div>
                                        <h3 className="font-bold text-lg mb-1 group-hover:text-teal-400 transition-colors">{post.title}</h3>
                                        <div className="flex gap-4 text-sm text-gray-500">
                                            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                                            <span>{post.tags}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleDeletePost(post.id)}
                                            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                            title="Delete Post"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {posts.length === 0 && (
                                <div className="text-center py-12 text-gray-600 italic">No posts found. Create one above!</div>
                            )}
                        </div>
                    </>
                )}

                {activeTab === 'projects' && (
                    <>
                        {/* Create Project Section */}
                        <div className="mb-12">
                            {!isCreating ? (
                                <button
                                    onClick={() => setIsCreating(true)}
                                    className="w-full py-8 border-2 border-dashed border-gray-800 rounded-2xl text-gray-500 hover:border-teal-500 hover:text-teal-500 transition-all flex flex-col items-center justify-center gap-2"
                                >
                                    <FaPlus className="text-2xl" />
                                    <span className="font-medium">Add New Project</span>
                                </button>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8"
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <h2 className="text-2xl font-bold">New Project</h2>
                                        <button onClick={() => setIsCreating(false)} className="text-gray-400 hover:text-white">Cancel</button>
                                    </div>

                                    <form onSubmit={handleCreateProject} className="space-y-6">
                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Project Title</label>
                                            <input
                                                type="text"
                                                className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none"
                                                value={newProject.title}
                                                onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Description</label>
                                            <textarea
                                                className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none"
                                                rows={3}
                                                value={newProject.description}
                                                onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                                                required
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm text-gray-400 mb-2">Project URL</label>
                                                <input
                                                    type="url"
                                                    className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none"
                                                    value={newProject.url}
                                                    onChange={e => setNewProject({ ...newProject, url: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-400 mb-2">Tags</label>
                                                <input
                                                    type="text"
                                                    className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 focus:border-teal-500 focus:outline-none"
                                                    value={newProject.tags}
                                                    onChange={e => setNewProject({ ...newProject, tags: e.target.value })}
                                                    placeholder="React, Spring Boot..."
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm text-gray-400 mb-2">Project Image</label>
                                            <input
                                                type="file"
                                                className="w-full bg-black border border-gray-800 rounded-xl px-4 py-3 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600"
                                                onChange={e => {
                                                    if (e.target.files) setNewProject({ ...newProject, image: e.target.files[0] });
                                                }}
                                            />
                                        </div>

                                        <div className="flex justify-end pt-4">
                                            <button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-xl transition-colors">
                                                Add Project
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}
                        </div>

                        {/* List Projects Section */}
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-teal-500"></span>
                            Recent Projects
                        </h2>
                        <div className="grid gap-4">
                            {projects.map(project => (
                                <div key={project.id} className="bg-gray-900/30 border border-gray-800 rounded-xl p-6 flex justify-between items-center group hover:border-gray-700 transition-colors">
                                    <div>
                                        <h3 className="font-bold text-lg mb-1 group-hover:text-teal-400 transition-colors">{project.title}</h3>
                                        <div className="flex gap-4 text-sm text-gray-500">
                                            <span>{project.tags}</span>
                                            <a href={project.projectUrl} target="_blank" rel="noreferrer" className="hover:text-white underline">{project.projectUrl}</a>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => handleDeleteProject(project.id)}
                                            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                            title="Delete Project"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {projects.length === 0 && (
                                <div className="text-center py-12 text-gray-600 italic">No projects found.</div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
