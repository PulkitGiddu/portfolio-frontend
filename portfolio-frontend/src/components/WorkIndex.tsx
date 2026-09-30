import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ENDPOINTS } from '../config/api';
import { FALLBACK_WORK, mapProject, orderWork, type WorkItem } from '../data/work';

type WorkIndexProps = {
    limit?: number;
};

const WorkIndex = ({ limit }: WorkIndexProps) => {
    const reduce = useReducedMotion();
    const [projects, setProjects] = useState<WorkItem[]>([]);
    const [ready, setReady] = useState(false);
    const [active, setActive] = useState(0);
    const [embed, setEmbed] = useState<WorkItem | null>(null);

    useEffect(() => {
        let cancelled = false;

        fetch(ENDPOINTS.PROJECTS)
            .then((res) => res.json())
            .then((data: unknown) => {
                if (cancelled) return;
                if (Array.isArray(data) && data.length > 0) {
                    setProjects(orderWork(data.map(mapProject)));
                } else {
                    setProjects(FALLBACK_WORK);
                }
            })
            .catch(() => {
                if (!cancelled) setProjects(FALLBACK_WORK);
            })
            .finally(() => {
                if (!cancelled) setReady(true);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    const visible = typeof limit === 'number' ? projects.slice(0, limit) : projects;
    const current = visible[active] ?? visible[0];

    useEffect(() => {
        if (!embed) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setEmbed(null);
        };
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = previous;
            window.removeEventListener('keydown', onKey);
        };
    }, [embed]);

    return (
        <div className="grid items-start gap-10 md:grid-cols-12 md:items-stretch">
            <div className="md:col-span-7">
                {!ready && (
                    <div className="border-t border-line/10">
                        {[0, 1, 2].map((row) => (
                            <div key={row} className="border-b border-line/10 py-7">
                                <div className="h-7 w-40 animate-pulse bg-line/10" />
                            </div>
                        ))}
                    </div>
                )}

                {ready && visible.length === 0 && (
                    <p className="border-t border-line/10 py-10 text-mute">Work will land here.</p>
                )}

                {ready && visible.length > 0 && (
                    <ol className="border-t border-line/10">
                        {visible.map((project, index) => {
                            const on = index === active;
                            return (
                                <li key={project.id} className="border-b border-line/10">
                                    <Link
                                        to={project.url ? '#projects' : `/project/${project.id}`}
                                        onMouseEnter={() => setActive(index)}
                                        onFocus={() => setActive(index)}
                                        onClick={(event) => {
                                            if (!project.url) return;
                                            event.preventDefault();
                                            setActive(index);
                                            setEmbed(project);
                                        }}
                                        className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-6 md:gap-8 md:py-7"
                                    >
                                        <span className="kicker tabular-nums">
                                            {(index + 1).toString().padStart(2, '0')}
                                        </span>
                                        <span>
                                            <span
                                                className={`block font-display text-3xl leading-none tracking-[-0.03em] transition-colors duration-150 md:text-4xl ${on ? 'text-paper' : 'text-mute group-hover:text-paper'}`}
                                            >
                                                {project.title}
                                            </span>
                                            <span className="kicker mt-3 block normal-case tracking-[0.14em]">
                                                {project.tags}
                                            </span>
                                        </span>
                                        <span
                                            aria-hidden="true"
                                            className={`text-sm transition-opacity duration-150 ${on ? 'text-paper opacity-100' : 'text-mute opacity-0 group-hover:opacity-100'}`}
                                        >
                                            →
                                        </span>
                                    </Link>
                                    {project.image && (
                                        <img
                                            src={project.image}
                                            alt=""
                                            className="mb-6 aspect-[16/9] w-full object-cover md:hidden"
                                        />
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                )}
            </div>

            <div className="md:col-span-5">
                <div className="relative aspect-video overflow-hidden border border-line/10 bg-line/10 md:aspect-auto md:h-full">
                    <AnimatePresence mode="wait">
                        {current && (
                            <motion.div
                                key={current.id}
                                className="absolute inset-0"
                                initial={reduce ? false : { opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={reduce ? undefined : { opacity: 0 }}
                                transition={reduce ? { duration: 0.12 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {current.url ? (
                                    <button
                                        type="button"
                                        onClick={() => setEmbed(current)}
                                        className="absolute inset-0 block text-left"
                                        aria-label={`Open ${current.title} inside this site`}
                                    >
                                        <SiteFrame url={current.url} title={`${current.title} preview`} />
                                        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                            <span className="kicker text-white/80">Live site · click to open</span>
                                        </span>
                                    </button>
                                ) : current.image ? (
                                    <>
                                        <img
                                            src={current.image}
                                            alt={current.title}
                                            className="h-full w-full object-cover saturate-[0.72]"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                            <p className="kicker text-white/80">{current.tags}</p>
                                            {current.description && (
                                                <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/85">
                                                    {current.description}
                                                </p>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex h-full flex-col bg-[radial-gradient(circle_at_70%_80%,rgb(var(--c-line)/0.16),transparent_55%),rgb(var(--c-ink))] p-8">
                                        <p className="kicker">{current.tags}</p>
                                        <p className="mt-6 font-display text-5xl leading-[0.9] text-paper">{current.title}</p>
                                        {current.description && (
                                            <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper/75">
                                                {current.description}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {embed?.url && (
                    <motion.div
                        className="fixed inset-0 z-[80] flex flex-col bg-ink"
                        initial={reduce ? false : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={reduce ? { duration: 0.12 } : { type: 'spring', bounce: 0, duration: 0.35 }}
                    >
                        <div className="chrome relative z-10 flex items-center justify-between gap-4 px-6 py-4">
                            <p className="text-sm text-paper">{embed.title}</p>
                            <div className="flex items-center gap-5">
                                <a
                                    href={embed.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-mute transition-colors duration-150 hover:text-paper"
                                >
                                    Open site
                                </a>
                                <button type="button" onClick={() => setEmbed(null)} className="press text-sm text-paper">
                                    Close
                                </button>
                            </div>
                        </div>
                        <iframe title={embed.title} src={embed.url} className="min-h-0 w-full flex-1 border-0 bg-white" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const PAGE_WIDTH = 1280;

const SiteFrame = ({ url, title }: { url: string; title: string }) => {
    const frame = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.3);
    const [height, setHeight] = useState(800);

    useEffect(() => {
        const node = frame.current;
        if (!node) return;

        const measure = () => {
            const rect = node.getBoundingClientRect();
            const next = rect.width / PAGE_WIDTH;
            setScale(next || 0.3);
            setHeight(next ? rect.height / next : 800);
        };

        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={frame} className="absolute inset-0 overflow-hidden bg-white">
            <iframe
                title={title}
                src={url}
                tabIndex={-1}
                className="pointer-events-none absolute left-0 top-0 origin-top-left border-0"
                style={{ width: PAGE_WIDTH, height, transform: `scale(${scale})` }}
            />
        </div>
    );
};

export default WorkIndex;
