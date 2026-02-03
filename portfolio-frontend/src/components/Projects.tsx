import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        {
            id: 3,
            title: 'EVERY SECOND',
            label: 'AD CAMPAIGN',
            image: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=800&h=1000&fit=crop',
            bgColor: 'from-orange-500 to-orange-600',
            textColor: 'text-white',
        },
        {
            id: 4,
            title: 'TIMELESS MASTERY',
            label: 'ART DIRECTION',
            image: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&h=1000&fit=crop',
            bgColor: 'from-gray-800 to-gray-900',
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
        fetch('http://localhost:8081/api/projects')
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

                {/* Bento Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                            className="group cursor-pointer"
                            onClick={() => navigate(`/project/${project.id}`)}
                        >
                            <div className={`relative aspect-[4/5] bento-card overflow-hidden bg-gradient-to-br ${project.bgColor}`}>
                                {/* Background Image */}
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-110 transition-transform duration-700"
                                />

                                {/* Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.bgColor} opacity-80`} />

                                {/* Content - Centered with blur overlay */}
                                <div className="relative h-full flex items-center justify-center p-8 md:p-12">
                                    {/* Label at top-left */}
                                    <p className={`absolute top-8 left-8 md:left-12 label-text ${project.textColor}`}>
                                        {project.label}
                                    </p>

                                    {/* Centered blur overlay */}
                                    <div className="bg-black/40 backdrop-blur-md rounded-3xl px-8 py-10 md:px-12 md:py-12 text-center max-w-md">
                                        <h3 className="mono-heading text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-6">
                                            {project.title}
                                        </h3>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            className="text-white text-sm font-medium inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full transition-all duration-300"
                                        >
                                            Explore More
                                            <span className="text-lg">+</span>
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Hover Effect */}
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View All Button */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-12 text-center"
                >
                    <button className="btn-primary">
                        VIEW ALL PROJECTS
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
