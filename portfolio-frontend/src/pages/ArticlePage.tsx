import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaCalendar, FaTag } from 'react-icons/fa6';
import FloatingNav from '../components/FloatingNav';
import Footer from '../components/Footer';
import { ENDPOINTS } from '../config/api';
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

const ArticlePage = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(ENDPOINTS.BLOG_BY_SLUG(slug || ''));
                if (res.ok) {
                    const data = await res.json();
                    setPost(data);
                } else {
                    setError(true);
                }
            } catch {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPost();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="bg-cream-50 dark:bg-black min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex gap-2">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-2.5 h-2.5 rounded-full bg-teal-500"
                                animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
                            />
                        ))}
                    </div>
                    <p className="font-mono text-sm tracking-wider text-gray-500 uppercase">Loading article</p>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="bg-cream-50 dark:bg-black min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-black dark:text-white mb-4 mono-heading">Article Not Found</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">The article you're looking for doesn't exist or has been removed.</p>
                    <button
                        onClick={() => navigate('/journal')}
                        className="btn-secondary"
                    >
                        ← Back to Journal
                    </button>
                </div>
            </div>
        );
    }

    const formattedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
        : 'Draft';

    const tags = post.tags ? post.tags.split(',').map(t => t.trim()) : [];

    // Estimate reading time (avg 200 words per minute)
    const wordCount = post.content?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    return (
        <div className="bg-cream-50 dark:bg-black min-h-screen">
            <FloatingNav />

            {/* Back button */}
            <div className="fixed top-8 left-8 z-20">
                <button
                    onClick={() => navigate('/journal')}
                    className="flex items-center gap-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors font-mono text-sm group"
                >
                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    <span>JOURNAL</span>
                </button>
            </div>

            {/* Article */}
            <article className="max-w-3xl mx-auto px-6 pt-28 pb-20">
                {/* Tags */}
                {tags.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap gap-2 mb-6"
                    >
                        {tags.map((tag, i) => (
                            <span key={i} className="flex items-center gap-1.5 text-teal-500 text-xs font-mono tracking-widest uppercase">
                                <FaTag className="text-[10px]" />{tag}
                            </span>
                        ))}
                    </motion.div>
                )}

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white leading-tight mb-6 mono-heading"
                >
                    {post.title}
                </motion.h1>

                {/* Meta */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-4 text-sm text-gray-500 mb-10 font-mono"
                >
                    <span className="flex items-center gap-1.5">
                        <FaCalendar className="text-xs" /> {formattedDate}
                    </span>
                    <span>•</span>
                    <span>{readingTime} min read</span>
                </motion.div>

                {/* Cover Image */}
                {post.coverImageUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-12"
                    >
                        <img
                            src={post.coverImageUrl}
                            alt={post.title}
                            className="w-full rounded-2xl object-cover max-h-[500px]"
                        />
                    </motion.div>
                )}

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="article-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Bottom divider */}
                <hr className="border-gray-200 dark:border-gray-800 my-16" />

                {/* Back to journal */}
                <div className="text-center">
                    <button
                        onClick={() => navigate('/journal')}
                        className="btn-secondary"
                    >
                        ← More Articles
                    </button>
                </div>
            </article>

            <Footer />
        </div>
    );
};

export default ArticlePage;
