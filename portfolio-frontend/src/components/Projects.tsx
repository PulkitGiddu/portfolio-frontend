import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../config/api';

interface ProjectCard {
    id: number;
    title: string;
    label: string;
    image: string;
    bgColor: string;
    textColor: string;
}

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const navigate = useNavigate();

    const [projects, setProjects] = useState<ProjectCard[]>([]);

    // Default/Fallback projects
    const DEFAULT_PROJECTS: ProjectCard[] = [
        {
            id: 1,
            title: 'BOOKIT',
            label: 'FULL STACK DEVELOPMENT',
            image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=1000&fit=crop', // Office/Meeting room image
            bgColor: 'from-blue-600 to-blue-800',
            textColor: 'text-white',
        },
        {
            id: 2,
            title: 'BRAND REDEFINE',
            label: 'BRAND IDENTITY',
            image: 'https://images.unsplash.com/photo-1634926878768-2a5b3c42f139?w=800&h=1000&fit=crop',
            bgColor: 'from-teal-500 to-teal-600',
            textColor: 'text-white',
        },
    ];

    const getBgColor = (index: number) => {
        const colors = [
            'from-burgundy-500 to-burgundy-600',
            'from-teal-500 to-teal-600',
            'from-orange-500 to-orange-600',
            'from-gray-800 to-gray-900'
        ];
        return colors[index % colors.length];
    };

    useEffect(() => {
        fetch(ENDPOINTS.PROJECTS)
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    const mappedProjects = data.map((p: any, index: number) => ({
                        id: p.id,
                        title: p.title,
                        label: p.tags || 'PROJECT',
                        image: p.imageData
                            ? `data:${p.imageContentType};base64,${p.imageData}`
                            : 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=800&h=1000&fit=crop',
                        bgColor: getBgColor(index),
                        textColor: 'text-white'
                    }));
                    setProjects(mappedProjects);
                } else {
                    // API returned empty array, show defaults
                    console.log("No projects found in database, showing default projects");
                    setProjects(DEFAULT_PROJECTS);
                }
            })
            .catch(err => {
                console.error("Failed to fetch projects, using defaults", err);
                setProjects(DEFAULT_PROJECTS);
            });
    }, []);

    return (
        <section id="projects" className="relative py-20 bg-cream-50 dark:bg-black" ref={ref}>
            <div className="section-container">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="mb-16"
                >
                    <h2 className="mono-heading text-6xl md:text-7xl mb-4 text-black dark:text-white">
                        WORKS
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-xl">
                        A curated collection of projects that showcase creativity,
                        strategy, and technical excellence.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {projects.slice(0, 3).map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                            className="group cursor-pointer"
                            onClick={() => navigate(`/project/${project.id}`)}
                        >
                            <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-gray-900">
                                {/* Background Image */}
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                />

                                {/* Subtle Gradient Overlay - Bottom only */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                                {/* Content - Clean bottom positioning */}
                                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                    <p className="text-xs font-medium tracking-widest text-white/70 mb-2 uppercase">
                                        {project.label}
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
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="mt-16 text-center"
                >
                    <button
                        className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-gray-300 dark:border-white/20 rounded-full text-sm font-medium tracking-widest text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                        onClick={() => navigate('/work')}
                    >
                        VIEW ALL WORKS
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
