import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SnakeGame from './SnakeGame';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="about" className="relative py-20 bg-cream-50 dark:bg-black overflow-hidden orange-glow" ref={ref}>
            {/* Orange Glow Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[800px] h-[800px] bg-orange-500/20 rounded-full blur-[150px]" />
            </div>

            <div className="section-container relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Side - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="space-y-8"
                    >
                        <div>
                            <p className="label-text text-gray-500 dark:text-gray-500 mb-4">ABOUT US,25</p>
                            <h2 className="mono-heading text-6xl md:text-7xl text-black dark:text-white leading-tight">
                                ABOUT
                            </h2>
                        </div>

                        <div className="space-y-6 text-gray-600 dark:text-gray-300">
                            <p className="text-lg leading-relaxed">
                                I try to craft designs that don't just look stunning—they
                                create impact. Blending creativity with strategy, I try to transform ideas
                                into immersive digital experiences that captivate, engage, and connect.
                            </p>
                            <p className="text-lg leading-relaxed">
                                With expertise in modern web technologies and a passion for innovation,
                                I try to bring visions to life through clean, efficient code and thoughtful design.
                            </p>
                        </div>

                        {/* Skills */}
                        <div className="grid grid-cols-2 gap-6 pt-6">
                            {[
                                { name: 'Frontend', level: '95%' },
                                { name: 'Backend', level: '90%' },
                                { name: 'UI/UX', level: '85%' },
                                { name: 'DevOps', level: '80%' },
                            ].map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                                    className="space-y-2"
                                >
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-semibold text-black dark:text-white">{skill.name}</span>
                                        <span className="text-sm text-gray-500">{skill.level}</span>
                                    </div>
                                    <div className="h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={isInView ? { width: skill.level } : {}}
                                            transition={{ delay: 0.8 + index * 0.1, duration: 1.2, ease: "easeOut" }}
                                            className="h-full bg-black dark:bg-white rounded-full"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side - Image */}
                    {/* Right Side - Interactive Game */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
                        className="relative h-full"
                    >
                        <SnakeGame />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
