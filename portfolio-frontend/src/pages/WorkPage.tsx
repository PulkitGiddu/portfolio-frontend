import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa6';
import { ENDPOINTS } from '../config/api';

interface Project {
    id: number;
    title: string;
    tags: string;
    imageData?: string;
    imageContentType?: string;
    description?: string;
}

const WorkPage = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [projects, setProjects] = useState<Project[]>([]);

    // Default fallback projects
    const DEFAULT_PROJECTS: Project[] = [
        {
            id: 1,
            title: 'BOOKIT',
            tags: 'FULL STACK DEVELOPMENT',
            description: 'Automated meeting room booking system streamlining corporate scheduling.',
        },
        {
            id: 2,
            title: 'BRAND REDEFINE',
            tags: 'BRAND IDENTITY',
            description: 'Comprehensive brand overhaul for a leading tech startup.',
        },
        {
            id: 3,
            title: 'EVERY SECOND',
            tags: 'CAMPAIGN',
            description: 'Global ad campaign focused on the value of time.',
        },
    ];

    const getBgColor = (index: number) => {
        const colors = [
            'from-burgundy-500 to-burgundy-600',
            'from-teal-500 to-teal-600',
            'from-orange-500 to-orange-600',
            'from-blue-600 to-blue-800',
            'from-gray-800 to-gray-900'
        ];
        return colors[index % colors.length];
    };

    useEffect(() => {
        // Fetch projects from API
        fetch(ENDPOINTS.PROJECTS)
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    setProjects(data);
                } else {
                    console.log("No projects found in database, showing default projects");
                    setProjects(DEFAULT_PROJECTS);
                }
            })
            .catch(err => {
                console.error("Failed to fetch projects, using defaults", err);
                setProjects(DEFAULT_PROJECTS);
            });

        window.scrollTo(0, 0);
    }, []);

    const getProjectImage = (project: Project, index: number) => {
        if (project.imageData && project.imageContentType) {
            return `data:${project.imageContentType};base64,${project.imageData}`;
        }
        // Fallback images
        const fallbackImages = [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&h=1000&fit=crop',
        ];
        return fallbackImages[index % fallbackImages.length];
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-cream-50 dark:bg-black text-black dark:text-white selection:bg-black/20 dark:selection:bg-white/20">
            {/* Floating Navigation Bar (matching homepage) */}
            <div
                style={{
                    position: 'fixed',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 50,
                }}
            >
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <div className="bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-full border border-gray-200 dark:border-white/20 px-6 py-3 shadow-2xl">
                        <div className="flex items-center gap-6">
                            {/* Navigation Links */}
                            <button
                                onClick={() => navigate('/')}
                                className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
                            >
                                HOME
                            </button>
                            <button
                                onClick={() => navigate('/#about')}
                                className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
                            >
                                ABOUT
                            </button>
                            <button
                                onClick={() => navigate('/#resume')}
                                className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
                            >
                                RESUME
                            </button>
                            <button
                                onClick={() => navigate('/work')}
                                className="text-sm font-medium text-black dark:text-white transition-colors duration-300"
                            >
                                WORK
                            </button>
                            <button
                                onClick={() => navigate('/journal')}
                                className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300"
                            >
                                JOURNAL
                            </button>

                            <div className="w-px h-6 bg-gray-300 dark:bg-white/20" />

                            {/* Theme Toggle */}
                            <button
                                onClick={toggleTheme}
                                className="p-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                                aria-label="Toggle theme"
                            >
                                {theme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
                            </button>

                            {/* Contact Button */}
                            <button
                                onClick={() => navigate('/#contact')}
                                className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                            >
                                CONTACT <span className="text-lg leading-none">+</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Main Content */}
            <main className="section-container py-20">
                {/* Page Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="mb-16 pt-10"
                >
                    <h1 className="mono-heading text-6xl md:text-7xl mb-4">
                        WORKS
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-xl text-lg">
                        A curated collection of projects that showcase creativity,
                        strategy, and technical excellence.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.8,
                                delay: 0.4 + index * 0.1,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            className="group cursor-pointer"
                            onClick={() => navigate(`/project/${project.id}`)}
                        >
                            <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-gray-900">
                                {/* Background Image */}
                                <img
                                    src={getProjectImage(project, index)}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-xs font-medium tracking-widest text-white/70 mb-2 uppercase">
                                        {project.tags || 'PROJECT'}
                                    </p>
                                    <div className="flex justify-between items-end">
                                        <h3 className="mono-heading text-2xl md:text-3xl text-white font-light">
                                            {project.title}
                                        </h3>
                                        <motion.div
                                            whileHover={{ x: 5 }}
                                            className="hidden group-hover:flex items-center justify-center w-10 h-10 rounded-full border border-white/20 text-white"
                                        >
                                            <span className="text-lg">→</span>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-20 mb-20 text-center"
                >
                    <p className="text-gray-500 dark:text-gray-400 mb-4">You've reached the end</p>
                    <button
                        onClick={scrollToTop}
                        className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors uppercase tracking-widest text-sm"
                    >
                        Back to Top
                    </button>
                </motion.div>
            </main>
        </div>
    );
};

export default WorkPage;
