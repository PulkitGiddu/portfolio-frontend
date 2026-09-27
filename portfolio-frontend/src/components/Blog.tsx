import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaXmark as FaTimes, FaPencil, FaTrash } from 'react-icons/fa6';
import BlogForm from './BlogForm';
import { Frame, TextLink } from './ui';
import { ENDPOINTS, fetchWithCredentials } from '../config/api';
import '../styles/editor.css';

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

const formatDate = (value?: string) => {
    if (!value) return 'Draft';
    return new Date(value).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
};

const Blog = ({ className = '' }: BlogProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    const navigate = useNavigate();
    const location = useLocation();
    const onJournal = location.pathname === '/journal';

    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [waking, setWaking] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        checkAuth();
        fetchPosts();
    }, []);

    const checkAuth = async () => {
        try {
            const res = await fetchWithCredentials(ENDPOINTS.AUTH_STATUS);
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
            const res = await fetch(ENDPOINTS.BLOGS);
            if (res.ok) {
                const data = await res.json();
                setPosts(data);
                setWaking(false);
            } else {
                setWaking(true);
            }
        } catch (error) {
            console.error('Failed to fetch blogs', error);
            setWaking(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreatePost = async (data: Record<string, unknown>) => {
        try {
            const res = await fetchWithCredentials(ENDPOINTS.BLOGS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
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

    const handleEditClick = (post: BlogPost) => {
        setSelectedPost(null);
        setEditingPost(post);
        setIsCreating(true);
    };

    const handleUpdatePost = async (id: number, data: Record<string, unknown>) => {
        try {
            const res = await fetchWithCredentials(ENDPOINTS.BLOG_BY_ID(id), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
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
            const res = await fetchWithCredentials(ENDPOINTS.BLOG_BY_ID(id), {
                method: 'DELETE',
            });

            if (res.ok) {
                setSelectedPost(null);
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

    const visiblePosts = onJournal ? posts : posts.slice(0, 4);

    return (
        <div className={className} ref={ref}>
            <Frame
                id="journal"
                kicker="Journal"
                title="Notes"
                lede="Occasional writing on systems, products, and the work between them."
                action={
                    <div className="flex items-center gap-5">
                        {isAdmin && (
                            <button onClick={() => { setEditingPost(null); setIsCreating(true); }} className="text-left">
                                <TextLink>New note</TextLink>
                            </button>
                        )}
                        {!onJournal && posts.length > 4 && (
                            <button onClick={() => navigate('/journal')} className="text-left">
                                <TextLink>All notes</TextLink>
                            </button>
                        )}
                    </div>
                }
            >
                {isLoading && (
                    <div className="border-t border-white/[0.08] py-16">
                        <p className="kicker">Opening the notebook</p>
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-mute">
                            The server may take a moment on the first visit.
                        </p>
                    </div>
                )}

                {!isLoading && waking && (
                    <div className="border-t border-white/[0.08] py-12">
                        <p className="text-paper">The notebook is waking up.</p>
                        <p className="mt-2 max-w-md text-sm leading-relaxed text-mute">
                            The server sleeps when no one is here. Refresh in a moment.
                        </p>
                    </div>
                )}

                {!isLoading && !waking && visiblePosts.length === 0 && (
                    <p className="border-t border-white/[0.08] py-12 text-mute">Nothing published yet.</p>
                )}

                {!isLoading && visiblePosts.length > 0 && (
                    <ul className="border-t border-white/[0.08]">
                        {visiblePosts.map((post, index) => (
                            <motion.li
                                key={post.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: index * 0.06, duration: 0.6 }}
                                className="border-b border-white/[0.08]"
                            >
                                <div className="group grid items-center gap-6 py-7 md:grid-cols-12">
                                    <button
                                        onClick={() => navigate(`/journal/${post.slug}`)}
                                        className="text-left md:col-span-7"
                                    >
                                        <h3 className="font-display text-2xl text-paper transition-colors duration-300 group-hover:text-white md:text-3xl">
                                            {post.title}
                                        </h3>
                                        {post.summary && (
                                            <p className="mt-2 line-clamp-2 max-w-xl text-sm leading-relaxed text-mute">
                                                {post.summary}
                                            </p>
                                        )}
                                    </button>
                                    <div className="flex items-center justify-between gap-4 md:col-span-3 md:flex-col md:items-start">
                                        <p className="kicker">{post.tags?.split(',')[0]?.trim() || 'Note'}</p>
                                        <p className="kicker">{formatDate(post.publishedAt)}</p>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 md:col-span-2 md:justify-end">
                                        {post.coverImageUrl && (
                                            <img
                                                src={post.coverImageUrl}
                                                alt=""
                                                className="h-14 w-20 object-cover grayscale"
                                            />
                                        )}
                                        {isAdmin && (
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEditClick(post)}
                                                    className="p-2 text-mute transition-colors hover:text-paper"
                                                    title="Edit"
                                                >
                                                    <FaPencil />
                                                </button>
                                                <button
                                                    onClick={() => handleDeletePost(post.id)}
                                                    className="p-2 text-mute transition-colors hover:text-paper"
                                                    title="Delete"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                )}
            </Frame>

            <AnimatePresence>
                {selectedPost && (
                    <div
                        className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
                        onClick={() => setSelectedPost(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 12 }}
                            className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-white/[0.08] bg-ink p-8 md:p-12"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <button onClick={() => setSelectedPost(null)} className="absolute right-6 top-6 text-mute hover:text-paper" aria-label="Close">
                                <FaTimes />
                            </button>
                            <p className="kicker">
                                {selectedPost.tags?.toUpperCase() || 'NOTE'} · {formatDate(selectedPost.publishedAt)}
                            </p>
                            <h2 className="mt-4 font-display text-4xl text-paper">{selectedPost.title}</h2>
                            <div className="article-content mt-8" dangerouslySetInnerHTML={{ __html: selectedPost.content || '' }} />
                        </motion.div>
                    </div>
                )}
                {isCreating && (
                    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm">
                        <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto">
                            <BlogForm
                                initialData={editingPost ? {
                                    ...editingPost,
                                    coverImageUrl: editingPost.coverImageUrl || '',
                                    published: editingPost.published ?? false,
                                } : undefined}
                                onSubmit={editingPost ? (data) => handleUpdatePost(editingPost.id, data) : handleCreatePost}
                                onCancel={() => {
                                    setIsCreating(false);
                                    setEditingPost(null);
                                }}
                            />
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Blog;
