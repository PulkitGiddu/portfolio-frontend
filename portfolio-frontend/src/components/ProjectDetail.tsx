import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SiteNav from './SiteNav';
import Footer from './Footer';
import { TextLink } from './ui';
import { ENDPOINTS } from '../config/api';
import { mapProject, type WorkItem } from '../data/work';

const BOOKIT_ESSAY = {
    challenge:
        'A booking tool that stays fair when a whole office tries to grab the same room at once.',
    solution:
        'A credit-based booking economy, role-based access, and a flow that refuses a double booking.',
    results: [
        'Clear roles for who can book, and who can override.',
        'Concurrent requests resolved without two people owning one room.',
        'A record of use, so the rooms stop being a rumour.',
    ],
    technologies: ['React', 'Spring Boot', 'PostgreSQL', 'AWS'],
};

type Essay = typeof BOOKIT_ESSAY | null;

const ProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState<WorkItem | null>(null);
    const [essay, setEssay] = useState<Essay>(null);
    const [status, setStatus] = useState<'loading' | 'ready' | 'missing'>('loading');

    useEffect(() => {
        window.scrollTo(0, 0);
        let cancelled = false;

        fetch(ENDPOINTS.PROJECTS)
            .then((res) => res.json())
            .then((data: unknown) => {
                if (cancelled) return;
                const list = Array.isArray(data) ? data.map(mapProject) : [];
                const found = list.find((item) => String(item.id) === String(id));
                if (found) {
                    setProject(found);
                    setEssay(/bookit/i.test(found.title) ? BOOKIT_ESSAY : null);
                    setStatus('ready');
                    return;
                }
                if (String(id) === '1') {
                    setProject({
                        id: 1,
                        title: 'Bookit',
                        tags: 'Full stack',
                        description:
                            'A centralized booking platform for office rooms. Credits, roles, and a workflow that keeps one room from being promised twice.',
                    });
                    setEssay(BOOKIT_ESSAY);
                    setStatus('ready');
                    return;
                }
                setStatus('missing');
            })
            .catch(() => {
                if (cancelled) return;
                if (String(id) === '1') {
                    setProject({
                        id: 1,
                        title: 'Bookit',
                        tags: 'Full stack',
                        description:
                            'A centralized booking platform for office rooms. Credits, roles, and a workflow that keeps one room from being promised twice.',
                    });
                    setEssay(BOOKIT_ESSAY);
                    setStatus('ready');
                } else {
                    setStatus('missing');
                }
            });

        return () => {
            cancelled = true;
        };
    }, [id]);

    return (
        <div className="min-h-screen bg-ink text-paper">
            <SiteNav />
            <main className="pt-14">
                {status === 'loading' && (
                    <div className="shell flex min-h-[50vh] items-center">
                        <p className="kicker">Opening the project</p>
                    </div>
                )}

                {status === 'missing' && (
                    <div className="shell flex min-h-[60vh] flex-col justify-center">
                        <h1 className="font-display text-5xl">This one isn’t written up yet.</h1>
                        <Link to="/work" className="mt-8 w-fit">
                            <TextLink>All work</TextLink>
                        </Link>
                    </div>
                )}

                {status === 'ready' && project && (
                    <article>
                        <header className="shell py-16 md:py-24">
                            <Link to="/work" className="kicker transition-colors hover:text-paper">
                                ← Work
                            </Link>
                            <p className="kicker mt-10">{project.tags}</p>
                            <h1 className="mt-4 max-w-4xl font-display text-[clamp(3.2rem,8vw,7rem)] leading-[0.9] text-paper">
                                {project.title}
                            </h1>
                            {project.description && (
                                <p className="mt-8 max-w-2xl text-lg font-light leading-relaxed text-paper/80">
                                    {project.description}
                                </p>
                            )}
                            {project.url && (
                                <a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block">
                                    <TextLink>Visit</TextLink>
                                </a>
                            )}
                        </header>

                        {project.image && (
                            <div className="shell">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="max-h-[70vh] w-full object-cover saturate-[0.75]"
                                />
                            </div>
                        )}

                        {essay && (
                            <div className="shell grid gap-16 py-20 md:grid-cols-12">
                                <div className="md:col-span-6">
                                    <p className="kicker">The problem</p>
                                    <p className="mt-4 text-lg font-light leading-relaxed text-paper/85">{essay.challenge}</p>
                                </div>
                                <div className="md:col-span-6">
                                    <p className="kicker">The approach</p>
                                    <p className="mt-4 text-lg font-light leading-relaxed text-paper/85">{essay.solution}</p>
                                </div>
                                <div className="md:col-span-12">
                                    <p className="kicker">Stack</p>
                                    <p className="mt-4 text-paper/85">{essay.technologies.join('  ·  ')}</p>
                                </div>
                                <ul className="grid gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08] md:col-span-12 md:grid-cols-3">
                                    {essay.results.map((result) => (
                                        <li key={result} className="bg-ink p-6 text-sm leading-relaxed text-paper/85">
                                            {result}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="shell pb-20">
                            <Link to="/work">
                                <TextLink>All work</TextLink>
                            </Link>
                        </div>
                    </article>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default ProjectDetail;
