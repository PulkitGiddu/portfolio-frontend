import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ENDPOINTS } from '../config/api';
import { FALLBACK_WORK, mapProject, type WorkItem } from '../data/work';

type WorkIndexProps = {
    limit?: number;
};

const WorkIndex = ({ limit }: WorkIndexProps) => {
    const reduce = useReducedMotion();
    const [projects, setProjects] = useState<WorkItem[]>([]);
    const [ready, setReady] = useState(false);
    const [active, setActive] = useState(0);

    useEffect(() => {
        let cancelled = false;

        fetch(ENDPOINTS.PROJECTS)
            .then((res) => res.json())
            .then((data: unknown) => {
                if (cancelled) return;
                if (Array.isArray(data) && data.length > 0) {
                    setProjects(data.map(mapProject));
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

    return (
        <div className="grid items-start gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
                {!ready && (
                    <div className="border-t border-white/[0.08]">
                        {[0, 1, 2].map((row) => (
                            <div key={row} className="border-b border-white/[0.08] py-7">
                                <div className="h-7 w-40 animate-pulse bg-white/[0.06]" />
                            </div>
                        ))}
                    </div>
                )}

                {ready && visible.length === 0 && (
                    <p className="border-t border-white/[0.08] py-10 text-mute">Work will land here.</p>
                )}

                {ready && visible.length > 0 && (
                    <ol className="border-t border-white/[0.08]">
                        {visible.map((project, index) => {
                            const on = index === active;
                            return (
                                <li key={project.id} className="border-b border-white/[0.08]">
                                    <Link
                                        to={`/project/${project.id}`}
                                        onMouseEnter={() => setActive(index)}
                                        onFocus={() => setActive(index)}
                                        className="group grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-6 md:gap-8 md:py-7"
                                    >
                                        <span className="kicker tabular-nums">
                                            {(index + 1).toString().padStart(2, '0')}
                                        </span>
                                        <span>
                                            <span
                                                className={`block font-display text-3xl leading-none transition-colors duration-300 md:text-4xl ${on ? 'text-paper' : 'text-mute group-hover:text-paper'}`}
                                            >
                                                {project.title}
                                            </span>
                                            <span className="kicker mt-3 block normal-case tracking-[0.14em]">
                                                {project.tags}
                                            </span>
                                        </span>
                                        <span
                                            aria-hidden="true"
                                            className={`text-sm transition-all duration-300 ${on ? 'translate-x-0 text-paper opacity-100' : 'text-mute opacity-0 group-hover:opacity-100'}`}
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

            <div className="sticky top-24 hidden md:col-span-5 md:block">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#121212]">
                    <AnimatePresence mode="wait">
                        {current && (
                            <motion.div
                                key={current.id}
                                className="absolute inset-0"
                                initial={reduce ? false : { opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={reduce ? undefined : { opacity: 0 }}
                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                            >
                                {current.image ? (
                                    <>
                                        <img
                                            src={current.image}
                                            alt={current.title}
                                            className="h-full w-full object-cover saturate-[0.72]"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                            <p className="kicker">{current.tags}</p>
                                            {current.description && (
                                                <p className="mt-2 max-w-sm text-sm leading-relaxed text-paper/85">
                                                    {current.description}
                                                </p>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex h-full flex-col bg-[radial-gradient(circle_at_70%_80%,#2a2a2a,transparent_55%),#121212] p-8">
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
        </div>
    );
};

export default WorkIndex;
