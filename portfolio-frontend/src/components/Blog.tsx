import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaArrowRight, FaXmark as FaTimes, FaImage, FaPlus, FaPencil, FaTrash } from 'react-icons/fa6';
import BlogForm from './BlogForm';

interface BlogPost {
    id: number;
    title: string;
    summary: string;
    content: string;
    publishedAt: string;
    tags: string;
    coverImageUrl?: string;
    slug: string;
    published?: boolean;
}

interface BlogProps {
    className?: string;
}

const Blog = ({ className = "" }: BlogProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    // UI States
    const [showAllPosts, setShowAllPosts] = useState(false);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        checkAuth();
        fetchPosts();
    }, []);

    const checkAuth = async () => {
        try {
            const res = await fetch('https://portfolio-backend-1-eng0.onrender.com/api/auth/status', { credentials: 'include' });
            if (res.ok) {
                const data = await res.json();
                setIsAdmin(data.admin);
            }
        } catch (error) {
            console.error('Auth check failed', error);
        }
    };

    const fetchPosts = async () => {
        try {
            const res = await fetch('https://portfolio-backend-1-eng0.onrender.com/api/blogs');
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
            }
        } catch (error) {
            console.error('Failed to fetch blogs', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreatePost = async (data: any) => {
        try {
            const res = await fetch('https://portfolio-backend-1-eng0.onrender.com/api/blogs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(data)
            });

            if (res.ok) {
                setIsCreating(false);
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

    const visiblePosts = showAllPosts ? posts : posts.slice(0, 3);

    // Modals
    const ReadModal = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedPost(null)}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white dark:bg-gray-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 md:p-12 relative shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                <button onClick={() => setSelectedPost(null)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <FaTimes className="text-xl text-gray-500" />
                </button>

                {selectedPost?.coverImageUrl && (
                    <img src={selectedPost.coverImageUrl} alt={selectedPost.title} className="w-full h-64 md:h-80 object-cover rounded-2xl mb-8" />
                )}

                <div className="flex justify-between items-start mb-4">
                    <span className="text-teal-500 text-sm font-mono tracking-wider block">
                        {selectedPost?.tags?.toUpperCase() || 'JOURNAL'} • {selectedPost?.publishedAt ? new Date(selectedPost.publishedAt).toLocaleDateString() : 'DRAFT'}
                    </span>

                    {/* Admin Actions in Read Modal */}
                    {isAdmin && selectedPost && (
                        <div className="flex gap-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditClick(selectedPost);
                                }}
                                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:text-blue-500 transition-colors"
                                title="Edit Article"
                            >
                                <FaPencil />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeletePost(selectedPost.id);
                                }}
                                className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:text-red-500 transition-colors"
                                title="Delete Article"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    )}
                </div>

                <h2 className="mono-heading text-4xl md:text-5xl mb-8 leading-tight text-black dark:text-white">
                    {selectedPost?.title}
                </h2>

                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-wrap font-sans">
                    {selectedPost?.content}
                </div>
            </motion.div>
        </div>
    );

    const CreateModal = () => (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <BlogForm
                    initialData={editingPost ? {
                        ...editingPost,
                        coverImageUrl: editingPost.coverImageUrl || '',
                        published: editingPost.published ?? false
                    } : undefined}
                    onSubmit={editingPost ? (data) => handleUpdatePost(editingPost.id, data) : handleCreatePost}
                    onCancel={() => {
                        setIsCreating(false);
                        setEditingPost(null);
                    }}
                />
            </div>
        </div>
    );

    const handleEditClick = (post: BlogPost) => {
        setSelectedPost(null); // Close read modal if open
        setEditingPost(post);
        setIsCreating(true); // Re-use create modal for editing
    };

    const handleUpdatePost = async (id: number, data: any) => {
        try {
            const res = await fetch(`https://portfolio-backend-1-eng0.onrender.com/api/blogs/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(data)
            });

            if (res.ok) {
                setIsCreating(false);
                setEditingPost(null);
                fetchPosts();
                alert('Post updated successfully!');
            } else {
                alert('Failed to update post');
            }
        } catch (error) {
            console.error('Error updating post', error);
            alert('Error updating post');
        }
    };

    const handleDeletePost = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this article? This cannot be undone.')) return;

        try {
            const res = await fetch(`https://portfolio-backend-1-eng0.onrender.com/api/blogs/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });

            if (res.ok) {
                setSelectedPost(null); // Close modal if open
                fetchPosts();
                alert('Post deleted successfully');
            } else {
                alert('Failed to delete post');
            }
        } catch (error) {
            console.error('Error deleting post', error);
            alert('Error deleting post');
        }
    };

    return (
        <section id="journal" className={`relative py-20 bg-cream-50 dark:bg-black ${className}`} ref={ref}>
            <div className="section-container">
                {/* Header */}
                <div className="flex justify-between items-end mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1 }}
                    >
                        <p className="label-text text-gray-400 mb-4">THOUGHTS & INSIGHTS</p>
                        <h2 className="mono-heading text-6xl md:text-7xl text-black dark:text-white leading-tight">
                            THE
                            <br />
                            JOURNAL
                        </h2>
                    </motion.div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setShowAllPosts(!showAllPosts)}
                            className="btn-secondary hidden md:flex"
                        >
                            {showAllPosts ? 'SHOW LESS' : 'VIEW ALL ARTICLES'}
                        </button>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="text-center py-20 text-gray-500">Loading thoughts...</div>
                )}

                {/* Blog Grid */}
                {!isLoading && (
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {/* Admin Add Card */}
                        {isAdmin && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                className="group cursor-pointer flex flex-col h-full min-h-[400px]"
                                onClick={() => setIsCreating(true)}
                            >
                                <div className="flex-1 rounded-3xl bg-gradient-to-br from-orange-400 to-amber-700 flex items-center justify-center relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                    {/* Decorative Circle */}
                                    <div className="w-48 h-48 rounded-full bg-white/20 blur-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

                                    <div className="relative z-10 w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform duration-500">
                                        <FaPlus className="text-3xl text-white" />
                                    </div>

                                    <div className="absolute bottom-8 text-center w-full px-6">
                                        <p className="text-white font-mono text-sm tracking-widest uppercase opacity-80 mb-2">Create New</p>
                                        <h3 className="text-2xl font-bold text-white mono-heading">ENTRY</h3>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {visiblePosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.1 + 0.2, duration: 0.8 }}
                                className="group cursor-pointer flex flex-col h-full"
                                onClick={() => setSelectedPost(post)}
                            >
                                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 mb-6 relative">
                                    {post.coverImageUrl ? (
                                        <img
                                            src={post.coverImageUrl}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <FaImage className="text-4xl opacity-20" />
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                </div>

                                <div className="flex-1 flex flex-col">
                                    <span className="text-teal-500 text-xs font-bold tracking-widest mb-3">
                                        {post.tags?.split(',')[0] || 'JOURNAL'}
                                    </span>
                                    <h3 className="mono-heading text-2xl text-black dark:text-white mb-3 group-hover:text-teal-500 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {post.summary}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex items-center gap-2 text-sm font-medium text-black dark:text-white group-hover:gap-4 transition-all duration-300">
                                            Read Article <FaArrowRight className="text-xs" />
                                        </div>

                                        {/* Admin Actions on Card */}
                                        {isAdmin && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEditClick(post);
                                                    }}
                                                    className="p-2 bg-gray-100 dark:bg-gray-700/50 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors"
                                                    title="Edit"
                                                >
                                                    <FaPencil />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeletePost(post.id);
                                                    }}
                                                    className="p-2 bg-gray-100 dark:bg-gray-700/50 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors"
                                                    title="Delete"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Mobile View All Button */}
                <div className="md:hidden text-center mt-8">
                    <button
                        onClick={() => setShowAllPosts(!showAllPosts)}
                        className="btn-secondary w-full"
                    >
                        {showAllPosts ? 'SHOW LESS' : 'VIEW ALL ARTICLES'}
                    </button>
                </div>

                {/* Animate Presence for Modals */}
                <AnimatePresence>
                    {selectedPost && <ReadModal key="read-modal" />}
                    {isCreating && <CreateModal key="create-modal" />}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Blog;
