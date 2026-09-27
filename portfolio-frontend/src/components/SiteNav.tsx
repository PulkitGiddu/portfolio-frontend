import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { bindUiSounds, play, setSoundEnabled, soundEnabled } from '../lib/sound';

const SECTIONS = ['home', 'about', 'projects', 'resume', 'journal', 'contact'] as const;

const LINKS = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Work' },
    { id: 'resume', label: 'Record' },
    { id: 'journal', label: 'Notes' },
    { id: 'contact', label: 'Talk' },
];

const SOCIALS = [
    { label: 'GitHub', href: 'https://github.com/PulkitGiddu' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pulkit-giddu-223780206/' },
    { label: 'Email', href: 'mailto:pulkitgiddu09@gmail.com' },
];

const SiteNav = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [soundOn, setSoundOn] = useState(true);
    const [active, setActive] = useState('home');
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 24, restDelta: 0.001 });

    useEffect(() => {
        bindUiSounds();
        setSoundOn(soundEnabled());
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
                play('close');
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open]);

    useEffect(() => {
        if (location.pathname !== '/' || !location.hash) return;
        const id = location.hash.replace('#', '');
        const timer = window.setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 60);
        return () => window.clearTimeout(timer);
    }, [location.pathname, location.hash]);

    useEffect(() => {
        if (location.pathname.startsWith('/work') || location.pathname.startsWith('/project')) {
            setActive('projects');
            return;
        }
        if (location.pathname.startsWith('/journal')) {
            setActive('journal');
            return;
        }
        if (location.pathname !== '/') return;

        let frame = 0;
        const update = () => {
            const mark = window.innerHeight * 0.32;
            let current: (typeof SECTIONS)[number] = 'home';
            for (const id of SECTIONS) {
                const node = document.getElementById(id);
                if (!node) continue;
                if (node.getBoundingClientRect().top <= mark) current = id;
            }
            setActive(current);
        };

        const onScroll = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, [location.pathname]);

    const go = (id: string) => {
        setOpen(false);
        if (id === 'home') {
            if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                navigate('/');
            }
            return;
        }
        if (location.pathname !== '/') {
            navigate(`/#${id}`);
            return;
        }
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    const openMenu = () => {
        setOpen(true);
        play('open');
    };

    const closeMenu = () => {
        setOpen(false);
        play('close');
    };

    const toggleSound = () => {
        const next = !soundOn;
        setSoundEnabled(next);
        setSoundOn(next);
        if (next) play('toggle');
    };

    const index = Math.max(1, SECTIONS.indexOf(active as (typeof SECTIONS)[number]) + 1);
    const label = index.toString().padStart(2, '0');

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            <a
                href="#home"
                className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:bg-paper focus:px-3 focus:py-2 focus:text-sm focus:text-ink"
            >
                Skip to content
            </a>
            <div className="border-b border-white/[0.08] bg-ink/75 backdrop-blur-md">
                <div className="shell flex h-14 items-center justify-between gap-6">
                    <button
                        data-sound="none"
                        onClick={() => go('home')}
                        className="font-display text-[1.35rem] leading-none tracking-[-0.03em] text-paper"
                    >
                        Pulkit
                    </button>

                    <div className="flex items-center gap-4">
                        <span className="kicker tabular-nums" aria-hidden="true">
                            {label}
                        </span>
                        {!open && (
                            <motion.button
                                layoutId="nav-menu"
                                data-sound="none"
                                onClick={openMenu}
                                className="inline-flex items-center gap-2 rounded-full bg-paper px-4 py-1.5 text-sm text-ink"
                                aria-expanded={false}
                                aria-label="Open menu"
                            >
                                <span className="h-1.5 w-1.5 rounded-full bg-ink" />
                                Menu
                            </motion.button>
                        )}
                    </div>
                </div>
            </div>
            <motion.div style={{ scaleX }} className="h-px origin-left bg-paper/80" />

            <AnimatePresence>
                {open && (
                    <motion.button
                        data-sound="none"
                        aria-label="Close menu"
                        className="fixed inset-0 z-[70] cursor-default bg-black/45"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeMenu}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {open && (
                    <motion.div
                        layoutId="nav-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Menu"
                        className="fixed right-3 top-3 z-[80] flex w-[min(34rem,calc(100vw-1.5rem))] flex-col overflow-y-auto bg-paper p-6 text-ink shadow-2xl sm:right-5 sm:top-5 sm:p-8"
                        style={{ borderRadius: 28, maxHeight: 'calc(100dvh - 1.5rem)' }}
                    >
                        <div className="flex justify-end">
                            <button
                                data-sound="none"
                                onClick={closeMenu}
                                className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-1.5 text-sm text-paper"
                            >
                                Close
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>

                        <nav className="mt-6 flex flex-col" aria-label="Primary">
                            {LINKS.map((link) => {
                                const on = active === link.id;
                                return (
                                    <button
                                        key={link.id}
                                        data-sound="none"
                                        onMouseEnter={() => play('hover')}
                                        onClick={() => {
                                            play('tap');
                                            go(link.id);
                                        }}
                                        className={`py-0.5 text-left font-display text-[clamp(2.05rem,4.8vw,3.7rem)] leading-[0.95] tracking-[-0.04em] transition-colors duration-200 ${on ? 'text-ink' : 'text-neutral-400 hover:text-ink'}`}
                                        aria-current={on ? 'true' : undefined}
                                    >
                                        {link.label}
                                    </button>
                                );
                            })}
                        </nav>

                        <div className="mt-8 flex items-center justify-between gap-4 border-t border-black/10 pt-5">
                            <div className="flex gap-4">
                                {SOCIALS.map((social) => (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        target={social.href.startsWith('mailto:') ? undefined : '_blank'}
                                        rel="noopener noreferrer"
                                        className="text-sm text-neutral-500 transition-colors hover:text-ink"
                                    >
                                        {social.label}
                                    </a>
                                ))}
                            </div>
                            <button
                                data-sound="none"
                                onClick={toggleSound}
                                className="text-sm text-neutral-500 transition-colors hover:text-ink"
                                aria-pressed={soundOn}
                            >
                                Sound {soundOn ? 'on' : 'off'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default SiteNav;
