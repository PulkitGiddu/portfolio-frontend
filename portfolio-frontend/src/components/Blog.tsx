import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaArrowRight, FaPlus, FaXmark as FaTimes, FaImage } from 'react-icons/fa6';

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

const Blog = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // UI States
    const [showAllPosts, setShowAllPosts] = useState(false);
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const res = await fetch('http://localhost:8081/api/blogs');
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

                <span className="text-teal-500 text-sm font-mono tracking-wider mb-4 block">
                    {selectedPost?.tags?.toUpperCase() || 'JOURNAL'} • {selectedPost?.publishedAt ? new Date(selectedPost.publishedAt).toLocaleDateString() : 'DRAFT'}
                </span>

                <h2 className="mono-heading text-4xl md:text-5xl mb-8 leading-tight text-black dark:text-white">
                    {selectedPost?.title}
                </h2>

                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-wrap font-sans">
                    {selectedPost?.content}
                </div>
            </motion.div>
        </div>
    );

    return (
        <section id="journal" className="relative py-20 bg-cream-50 dark:bg-black" ref={ref}>
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

                {/* Empty State */}
                {!isLoading && posts.length === 0 && (
                    <div className="text-center py-20 border border-dashed border-gray-300 dark:border-gray-800 rounded-3xl">
                        <p className="text-gray-500 mb-4">No entries yet. The void is waiting.</p>
                    </div>
                )}

                {/* Blog Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
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

                                <div className="mt-auto flex items-center gap-2 text-sm font-medium text-black dark:text-white group-hover:gap-4 transition-all duration-300">
                                    Read Article <FaArrowRight className="text-xs" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

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
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Blog;
