import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import resumePdf from '../assets/SoftwareResume_Pulkit1.pdf';
import { Frame, TextLink } from './ui';

const achievements = [
    'Integrated an asynchronous payment module with RBI’s Structured Financial Messaging System.',
    'Owned a full-stack observability dashboard across 40+ environments.',
    'Led incident triage and cut recurring operational defects by 75%.',
    'Cached region lookups in Redis so the same configuration stopped hitting the database.',
    'Built a multi-level GST–CIBIL validation service for regulatory compliance.',
    'Ran quarterly releases with zero-downtime deployments.',
    'Wrote a downstream-readiness utility that saves about 105 hours a month.',
];

const skills = [
    { category: 'Languages', items: ['Java', 'C++', 'SQL', 'JavaScript'] },
    { category: 'Frameworks', items: ['Spring Boot', 'React', 'Kafka', 'Flutter', 'Android', 'JUnit'] },
    { category: 'Data', items: ['Oracle', 'PostgreSQL', 'MySQL', 'Redis'] },
    { category: 'Tools', items: ['Git', 'Jenkins', 'JIRA', 'SonarQube', 'ServiceNow'] },
];

const marks = [
    'Winner, CodeFury 2024 — HSBC India',
    'Grand finalist, Hack The Winter 2026',
    'Secure Code Warrior — Yellow Belt',
    'Microservices with Spring Cloud',
    '350+ LeetCode problems',
];

const Resume = () => {
    const [viewerOpen, setViewerOpen] = useState(false);
    const [showAll, setShowAll] = useState(false);
    const shown = showAll ? achievements : achievements.slice(0, 3);

    return (
        <Frame
            id="resume"
            kicker="Record"
            title="HSBC, and before that."
            lede="Results-minded engineer. Java, Spring, and the unglamorous work of keeping a system up."
            action={
                <div className="flex items-center gap-5">
                    <button onClick={() => setViewerOpen(true)} className="text-left">
                        <TextLink>View</TextLink>
                    </button>
                    <a href={resumePdf} download="Pulkit_Giddu_Resume.pdf">
                        <TextLink>Download</TextLink>
                    </a>
                </div>
            }
        >
            <AnimatePresence>
                {viewerOpen && (
                    <motion.div
                        className="fixed inset-0 z-[80] flex flex-col bg-ink/95 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
                            <p className="text-sm text-paper">Resume — Pulkit Giddu</p>
                            <div className="flex items-center gap-5">
                                <a href={resumePdf} download="Pulkit_Giddu_Resume.pdf" className="text-sm text-mute hover:text-paper">
                                    Download
                                </a>
                                <button onClick={() => setViewerOpen(false)} className="text-sm text-paper">
                                    Close
                                </button>
                            </div>
                        </div>
                        <iframe title="Resume" src={`${resumePdf}#toolbar=0`} className="m-4 min-h-0 flex-1 border border-white/[0.08]" />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="grid gap-16 lg:grid-cols-12">
                <div className="lg:col-span-7">
                    <article className="border-t border-white/[0.08] pt-8">
                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                            <h3 className="font-display text-3xl text-paper">Software Engineer</h3>
                            <p className="kicker">Jul 2024 — present</p>
                        </div>
                        <p className="mt-2 text-paper/80">HSBC India</p>
                        <p className="mt-5 max-w-xl text-sm leading-relaxed text-mute">
                            Distributed microservices in Java and Spring Boot, powering financial workflows that have to stay fast and available.
                        </p>
                        <ul className="mt-6 space-y-3">
                            {shown.map((item) => (
                                <li key={item} className="grid grid-cols-[auto_1fr] gap-3 text-sm leading-relaxed text-paper/80">
                                    <span className="mt-2 h-1 w-1 bg-paper/50" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => setShowAll((value) => !value)}
                            className="kicker mt-6 text-left transition-colors hover:text-paper"
                        >
                            {showAll ? 'Show less' : `Show ${achievements.length - 3} more`}
                        </button>
                    </article>

                    <article className="mt-12 border-t border-white/[0.08] pt-8">
                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                            <h3 className="font-display text-3xl text-paper">B.Tech, Electronics &amp; Telecommunication</h3>
                            <p className="kicker">2020 — 2024</p>
                        </div>
                        <p className="mt-2 text-paper/80">Vishwakarma Institute of Technology, Pune</p>
                        <p className="kicker mt-4">CGPA 8.03</p>
                    </article>
                </div>

                <div className="lg:col-span-5">
                    <p className="kicker">Stack</p>
                    <div className="mt-6 space-y-6">
                        {skills.map((group) => (
                            <div key={group.category}>
                                <p className="text-sm text-paper">{group.category}</p>
                                <p className="mt-2 text-sm leading-relaxed text-mute">{group.items.join('  ·  ')}</p>
                            </div>
                        ))}
                    </div>

                    <p className="kicker mt-12">Marks</p>
                    <ul className="mt-6 space-y-3">
                        {marks.map((mark) => (
                            <li key={mark} className="border-t border-white/[0.08] py-3 text-sm text-paper/85">
                                {mark}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Frame>
    );
};

export default Resume;
