import { motion } from 'framer-motion';
import mineImage from '../assets/mine.png';

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center bg-cream-50 dark:bg-black overflow-hidden">
            {/* Content Container */}
            <div className="section-container w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="space-y-6"
                    >
                        <motion.h1
                            className="mono-heading text-7xl md:text-8xl lg:text-9xl leading-none text-black dark:text-white"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 1 }}
                        >
                            PULKIT
                            <br />
                            GIDDU
                        </motion.h1>

                        <motion.p
                            className="text-sm label-text text-gray-500 dark:text-gray-400"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 1 }}
                        >
                            SOFTWARE DEVELOPER · Pune
                        </motion.p>

                        <motion.p
                            className="text-lg text-gray-600 dark:text-gray-400 max-w-md leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 1 }}
                        >
                            Crafting digital experiences that stand out and deliver results.
                            I blend creativity with strategy, turning bold ideas into immersive
                            experiences that captivate and inspire.
                        </motion.p>
                    </motion.div>

                    {/* Right Side - Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
                        className="relative"
                    >
                        <div className="relative aspect-[3/4] rounded-6xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                            <img
                                src={mineImage}
                                alt="Profile"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />

                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>

                        {/* Floating badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2, duration: 0.8 }}
                            className="absolute -bottom-6 -right-6 bg-black dark:bg-white rounded-5xl p-6 shadow-2xl"
                        >
                            <p className="text-xs label-text text-gray-400 dark:text-gray-600 mb-2">AVAILABLE FOR</p>
                            <p className="mono-heading text-2xl text-white dark:text-black">NEW
                                <br />PROJECTS</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-6 h-10 border-2 border-black dark:border-white rounded-full flex items-start justify-center p-2"
                >
                    <div className="w-1 h-2 bg-black dark:bg-white rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
};

export default Hero;
