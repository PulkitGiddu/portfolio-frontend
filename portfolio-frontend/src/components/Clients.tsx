import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useRef, useEffect } from 'react';

import bookitLogo from '../assets/bookit.png';
import bet2learnLogo from '../assets/bet2learn.png';
import snatchMartLogo from '../assets/snatchMart.png';
import winqlyLogo from '../assets/winqlybg.png';

const Counter = ({ value, duration = 2 }: { value: number, duration?: number }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    useEffect(() => {
        if (inView) {
            animate(count, value, { duration });
        }
    }, [count, inView, value, duration]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
};

const Clients = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    // Real client logos
    const clients = [
        { name: 'BOOKIT', logo: bookitLogo },
        { name: 'BET2LEARN', logo: bet2learnLogo },
        { name: 'SNATCHMART', logo: snatchMartLogo },
        { name: 'WINQLY', logo: winqlyLogo }
    ];

    // Duplicate clients for seamless marquee
    const marqueeClients = [...clients, ...clients, ...clients, ...clients, ...clients, ...clients, ...clients, ...clients];

    return (
        <section id="clients" className="relative py-20 bg-cream-50 dark:bg-dark-400" ref={ref}>
            <div className="section-container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="mb-16"
                >
                    <h2 className="mono-heading text-6xl md:text-7xl text-black dark:text-white mb-6">
                        CLIENTS
                    </h2>

                </motion.div>

                {/* Client Grid */}
                {/* Animated Client Row */}
                <div className="py-16 overflow-hidden">
                    <div className="relative w-full flex overflow-hidden mask-linear-gradient">
                        <motion.div
                            className="flex items-center gap-16 md:gap-24 whitespace-nowrap w-max"
                            initial={{ x: 0 }}
                            animate={{ x: "-50%" }}
                            transition={{
                                duration: 30,
                                ease: "linear",
                                repeat: Infinity,
                                repeatType: "loop",
                            }}
                        >
                            {marqueeClients.map((client, index) => (
                                <div
                                    key={`client-${index}`}
                                    className="flex items-center justify-center cursor-pointer group shrink-0"
                                >
                                    {client.name === 'YOU?' ? (
                                        <div className="flex items-center justify-center h-full">
                                            <span className="font-pixel text-4xl font-bold text-black dark:text-white group-hover:scale-110 transition-transform duration-300">YOU?</span>
                                        </div>
                                    ) : (
                                        <img
                                            src={client.logo}
                                            alt={client.name}
                                            className="h-10 md:h-14 w-auto object-contain opacity-50 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0"
                                        />
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid md:grid-cols-2 gap-6 mt-16">
                    {/* Services Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="bg-white dark:bg-dark-300 rounded-5xl p-12 flex flex-col h-full"
                    >
                        <h3 className="mono-heading text-4xl text-black dark:text-white mb-12">
                            SERVICES
                        </h3>

                        <div className="space-y-6">
                            {[
                                { number: '01', title: 'Strategy', desc: 'Digital strategy and brand positioning' },
                                { number: '02', title: 'Design', desc: 'UI/UX and visual design' },
                                { number: '03', title: 'Website Development', desc: 'Full-stack web development' },
                                { number: '04', title: 'Mobile App Development', desc: 'Android-IOS development' },
                                { number: '05', title: 'Content Creation', desc: 'Content creation for social media and blogs' },
                            ].map((service, index) => (
                                <motion.div
                                    key={service.number}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                                    className="flex gap-4 items-start group cursor-pointer"
                                >
                                    <span className="text-sm label-text text-orange-500">{service.number}</span>
                                    <div>
                                        <h4 className="text-xl font-semibold text-black dark:text-white mb-1 group-hover:text-orange-500 transition-colors">
                                            {service.title}
                                        </h4>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">{service.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Milestones Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="bg-white dark:bg-dark-300 rounded-5xl p-12 flex flex-col h-full"
                    >
                        <h3 className="mono-heading text-4xl text-black dark:text-white mb-12">
                            MILESTONES
                        </h3>

                        <div className="space-y-10">
                            <div>
                                <div className="mono-heading text-7xl text-black dark:text-white mb-2 flex items-center">
                                    <Counter value={6} />+
                                </div>
                                <p className="text-gray-500 dark:text-gray-400">Extensive Industry Experience</p>
                            </div>
                            <div className="h-px bg-gray-200 dark:bg-gray-700" />
                            <div>
                                <div className="mono-heading text-7xl text-black dark:text-white mb-2 flex items-center">
                                    <Counter value={24} />+
                                </div>
                                <p className="text-gray-500 dark:text-gray-400">Projects Completed</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Clients;
