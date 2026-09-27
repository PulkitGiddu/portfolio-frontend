import { motion, useReducedMotion } from 'framer-motion';
import Field from './motion/Field';
import portrait from '../assets/mine.png';

const ease = [0.22, 1, 0.36, 1] as const;

const Hero = () => {
    const reduce = useReducedMotion();

    return (
        <section id="home" className="relative flex min-h-[100svh] items-end overflow-hidden">
            <Field className="absolute inset-0 h-full w-full" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(var(--c-ink))_0%,rgb(var(--c-ink)/0.78)_28%,rgb(var(--c-ink)/0.18)_62%,rgb(var(--c-ink)/0.55)_100%)]" />

            <div className="shell relative z-10 pb-14 pt-28 md:pb-20">
                <motion.p
                    className="kicker"
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease }}
                >
                    Software engineer · Pune
                </motion.p>

                <motion.h1
                    className="mt-5 font-display text-[clamp(4.4rem,12vw,8.75rem)] leading-[0.86] text-paper"
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.08, ease }}
                >
                    Pulkit
                    <br />
                    Giddu
                </motion.h1>

                <motion.div
                    className="mt-10 flex flex-col gap-10 md:mt-14 md:flex-row md:items-end md:justify-between"
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.22, ease }}
                >
                    <p className="max-w-md text-lg font-light leading-relaxed text-paper/80">
                        I build payment systems at HSBC by day and my own products by choice — currently building{' '}
                        <a
                            href="https://www.wynklo.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-baseline gap-1 text-paper underline decoration-line/40 underline-offset-4 transition-colors hover:decoration-paper"
                        >
                            Wynklo
                            <span aria-hidden="true">→</span>
                        </a>
                        .
                    </p>

                    <div className="flex items-center gap-4">
                        <img
                            src={portrait}
                            alt="Pulkit Giddu"
                            className="h-14 w-14 rounded-full object-cover"
                        />
                        <div>
                            <p className="text-sm text-paper">Open to a conversation</p>
                            <p className="kicker mt-1">HSBC · since 2024</p>
                        </div>
                    </div>
                </motion.div>

                <div className="mt-10 flex items-center gap-8">
                    <a
                        href="#contact"
                        className="rounded-full bg-paper px-5 py-2.5 text-sm text-ink transition-transform duration-300 hover:scale-[1.03]"
                    >
                        Book a call
                    </a>
                    <a href="#projects" className="text-sm text-mute transition-colors duration-300 hover:text-paper">
                        Selected work
                    </a>
                </div>
            </div>

        </section>
    );
};

export default Hero;
