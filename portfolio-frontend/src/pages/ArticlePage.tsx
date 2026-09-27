import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import SiteNav from '../components/SiteNav';
import Footer from '../components/Footer';
import { TextLink } from '../components/ui';
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
        window.scrollTo(0, 0);
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

    return (
        <div className="min-h-screen bg-ink text-paper">
            <SiteNav />
            <main className="pt-14">
                {isLoading && (
                    <div className="shell flex min-h-[60vh] items-center">
                        <p className="kicker">Opening the note</p>
                    </div>
                )}

                {!isLoading && (error || !post) && (
                    <div className="shell flex min-h-[60vh] flex-col justify-center">
                        <h1 className="font-display text-5xl text-paper">This note is missing.</h1>
                        <p className="mt-4 max-w-md text-mute">It may have been moved, or it never existed.</p>
                        <button onClick={() => navigate('/journal')} className="mt-8 w-fit text-left">
                            <TextLink>Back to notes</TextLink>
                        </button>
                    </div>
                )}

                {!isLoading && post && <Article post={post} />}
            </main>
            <Footer />
        </div>
    );
};

const Article = ({ post }: { post: BlogPost }) => {
    const formattedDate = post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        })
        : 'Draft';

    const tags = post.tags ? post.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : [];
    const wordCount = post.content?.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length || 0;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    return (
        <article className="shell max-w-3xl py-16 md:py-24">
            <Link to="/journal" className="kicker transition-colors hover:text-paper">
                ← Notes
            </Link>

            {tags.length > 0 && (
                <p className="kicker mt-10">{tags.join('  ·  ')}</p>
            )}

            <h1 className="mt-4 font-display text-[clamp(2.6rem,6vw,4.75rem)] leading-[0.95] text-paper">
                {post.title}
            </h1>

            <p className="kicker mt-6">
                {formattedDate} · {readingTime} min
            </p>

            {post.coverImageUrl && (
                <img
                    src={post.coverImageUrl}
                    alt=""
                    className="mt-10 max-h-[520px] w-full object-cover"
                />
            )}

            <div
                className="article-content mt-12"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-16 border-t border-white/[0.08] pt-8">
                <Link to="/journal">
                    <TextLink>More notes</TextLink>
                </Link>
            </div>
        </article>
    );
};

export default ArticlePage;
