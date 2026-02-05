import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    year: string;
    description: string;
}

const WorkPage = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState<Project[]>([]);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number] // Custom ease for "calm" feel
            }
        }
    };

    const textRevealVariants = {
        hidden: { y: "100%" },
        visible: {
            y: "0%",
            transition: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number]
            }
        }
    };

    // Placeholder data (matching what we saw in Projects.tsx roughly, but elevated)
    // In a real scenario, we might fetch this, but for now we'll use static data for the "design" phase
    // to ensure it matches the aesthetic perfectly.
    const DISPLAY_PROJECTS: Project[] = [
        {
            id: 1,
            title: 'Bookit',
            category: 'Systems Architecture',
            year: '2025',
            description: 'Automated meeting room booking system streamlining corporate scheduling.',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=1200&fit=crop'
        },
        {
            id: 2,
            title: 'Brand Redefine',
            category: 'Identity',
            year: '2024',
            description: 'Comprehensive brand overhaul for a leading tech startup.',
            image: 'https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?w=1600&h=1200&fit=crop'
        },
        {
            id: 3,
            title: 'Every Second',
            category: 'Campaign',
            year: '2023',
            description: 'Global ad campaign focused on the value of time.',
            image: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=1600&h=1200&fit=crop'
        },
        {
            id: 4,
            title: 'Timeless Mastery',
            category: 'Art Direction',
            year: '2023',
            description: 'Visual direction for a luxury watch brand.',
            image: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=1600&h=1200&fit=crop'
        },
    ];

    useEffect(() => {
        // Here we could fetch from API, but for the design task we'll use the constants
        setProjects(DISPLAY_PROJECTS);
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20 selection:text-white">
            {/* Header Section */}
            <header className="fixed top-0 left-0 w-full p-8 md:p-12 z-50 flex justify-between items-center mix-blend-difference text-white">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-sm font-medium tracking-widest uppercase cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    Pulkit Giddu
                </motion.div>
                <div
                    className="text-sm font-medium tracking-widest uppercase cursor-pointer"
                    onClick={() => navigate('/')}
                >
                    Close
                </div>
            </header>

            <main className="pt-32 pb-20 px-6 md:px-12 lg:px-24">
                {/* Page Title */}
                <div className="mb-32 mt-10 md:mt-20 overflow-hidden">
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter"
                    >
                        {['Selected', 'Works'].map((word, i) => (
                            <div key={i} className="overflow-hidden inline-block mr-4 md:mr-8 align-top">
                                <motion.span
                                    variants={textRevealVariants}
                                    className="inline-block"
                                >
                                    {word}
                                </motion.span>
                            </div>
                        ))}
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="mt-8 max-w-xl text-gray-400 text-lg font-light leading-relaxed"
                    >
                        A showcase of digital craftsmanship, blending technical precision with aesthetic calm.
                    </motion.div>
                </div>

                {/* Projects List */}
                <div className="flex flex-col gap-32 md:gap-48">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-10%" }}
                            variants={itemVariants}
                            className="group cursor-pointer"
                            onClick={() => navigate(`/project/${project.id}`)}
                        >
                            {/* Project Layout - Alternating or Consistent? Let's go consistent for calm feel */}
                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                                {/* Project Info */}
                                <div className="lg:col-span-4 lg:mb-12 order-2 lg:order-1">
                                    <div className="overflow-hidden mb-4">
                                        <motion.div variants={textRevealVariants}>
                                            <span className="text-xs font-mono text-gray-500 mb-2 block">0{index + 1} &mdash; {project.year}</span>
                                        </motion.div>
                                    </div>
                                    <div className="overflow-hidden mb-4">
                                        <motion.h2 variants={textRevealVariants} className="text-4xl md:text-5xl font-light mb-4">
                                            {project.title}
                                        </motion.h2>
                                    </div>
                                    <div className="overflow-hidden mb-6">
                                        <motion.p variants={textRevealVariants} className="text-gray-400 text-lg">
                                            {project.description}
                                        </motion.p>
                                    </div>
                                    <div className="overflow-hidden">
                                        <motion.div variants={textRevealVariants} className="flex flex-wrap gap-2">
                                            <span className="px-3 py-1 border border-white/20 rounded-full text-xs uppercase tracking-wider text-white/80">
                                                {project.category}
                                            </span>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Project Image */}
                                <div className="lg:col-span-8 order-1 lg:order-2 overflow-hidden bg-gray-900 aspect-[4/3] relative">
                                    <motion.div
                                        variants={{
                                            hidden: { scale: 1.1, opacity: 0.8 },
                                            visible: {
                                                scale: 1,
                                                opacity: 1,
                                                transition: { duration: 1.2, ease: "easeOut" }
                                            }
                                        }}
                                        className="w-full h-full"
                                    >
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                        />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer / Next Steps */}
                <div className="mt-40 mb-20 text-center">
                    <p className="text-gray-500 mb-4">You've reached the end</p>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="text-white hover:text-gray-300 transition-colors uppercase tracking-widest text-sm"
                    >
                        Back to Top
                    </button>
                </div>
            </main>
        </div>
    );
};

export default WorkPage;
