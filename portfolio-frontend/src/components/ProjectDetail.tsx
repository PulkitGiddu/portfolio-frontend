import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FloatingNav from './FloatingNav';

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    technologies: string[];
    challenge: string;
    solution: string;
    results: string[];
    gallery: string[];
}

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState<Project | null>(null);

    useEffect(() => {
        // Mock project data - replace with API call
        const mockProjects: Project[] = [
            {
                id: 1,
                title: 'BOOKIT',
                category: 'FULL STACK DEVELOPMENT',
                description: 'The Advanced Meeting Room Booking System is a centralized enterprise-grade platform designed to optimize office meeting room utilization. It introduces a credit-based booking economy combined with Role-Based Access Control (RBAC) to ensure fair usage, eliminate scheduling conflicts, and enforce accountability through an automated and professional workflow.',
                image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
                technologies: ['React.js', 'Springboot', 'PostgreSQL', 'AWS'],
                challenge: 'Building a scalable product that could handle high traffic during office times while maintaining performance and managing office meeting rooms effectively.',
                solution: 'Implemented microservices architecture with Redis caching, rate limiting, security and CDN integration for optimal performance.',
                results: [
                    '100% efficient resource usage in offices',
                    'Provide clear role-based access and responsibilities',
                    '99.9% uptime during peak usage',
                    'Prevent double bookings and handle concurrent access safely'
                ],
                gallery: [
                    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800', // Meeting room
                    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800', // Conference
                    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800'  // Dashboard concept
                ]
            },
            {
                id: 2,
                title: 'AI-Powered Analytics',
                category: 'DATA SCIENCE',
                description: 'Machine learning platform for predictive analytics and business intelligence.',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
                technologies: ['Python', 'TensorFlow', 'React', 'PostgreSQL', 'Docker'],
                challenge: 'Processing large datasets in real-time while providing actionable insights.',
                solution: 'Developed custom ML models with distributed computing for real-time analysis.',
                results: [
                    'Reduced analysis time by 85%',
                    'Improved prediction accuracy to 94%',
                    'Processed 10M+ data points daily'
                ],
                gallery: [
                    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
                    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
                    'https://images.unsplash.com/photo-1557821552-17105176677c?w=800'
                ]
            }
        ];

        const foundProject = mockProjects.find(p => p.id === Number(id));
        setProject(foundProject || null);
    }, [id]);

    if (!project) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-2xl">Project not found</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            <FloatingNav />

            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative min-h-screen flex items-center justify-center overflow-hidden"
            >
                <div className="absolute inset-0">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
                </div>

                <div className="relative z-10 container mx-auto px-8 text-center">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="space-y-6"
                    >
                        <p className="text-orange-500 text-sm font-mono tracking-widest">{project.category}</p>
                        <h1 className="text-7xl md:text-9xl font-bold text-white font-mono tracking-tight">
                            {project.title}
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            {project.description}
                        </p>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="absolute bottom-12 left-1/2 -translate-x-1/2"
                >
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
                        <motion.div
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1.5 h-1.5 bg-white rounded-full"
                        />
                    </div>
                </motion.div>
            </motion.section>

            {/* Technologies */}
            <section className="py-24 px-8">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-white font-mono mb-12">TECHNOLOGIES</h2>
                        <div className="flex flex-wrap gap-4">
                            {project.technologies.map((tech, index) => (
                                <motion.div
                                    key={tech}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="glass-card px-8 py-4 rounded-full"
                                >
                                    <span className="text-white font-mono text-lg">{tech}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Challenge & Solution */}
            <section className="py-24 px-8 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ x: -30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="glass-card p-12 rounded-6xl"
                        >
                            <h3 className="text-3xl font-bold text-white font-mono mb-6">THE CHALLENGE</h3>
                            <p className="text-gray-300 text-lg leading-relaxed">{project.challenge}</p>
                        </motion.div>

                        <motion.div
                            initial={{ x: 30, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="glass-card p-12 rounded-6xl"
                        >
                            <h3 className="text-3xl font-bold text-white font-mono mb-6">THE SOLUTION</h3>
                            <p className="text-gray-300 text-lg leading-relaxed">{project.solution}</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Results */}
            <section className="py-24 px-8">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-white font-mono mb-12">RESULTS</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {project.results.map((result, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ y: 30, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.2, duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="glass-card p-8 rounded-6xl text-center"
                                >
                                    <div className="text-orange-500 text-5xl font-bold font-mono mb-4">✓</div>
                                    <p className="text-white text-lg">{result}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Gallery */}
            <section className="py-24 px-8">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-white font-mono mb-12">GALLERY</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            {project.gallery.map((image, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: index * 0.1, duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="rounded-6xl overflow-hidden aspect-video"
                                >
                                    <img
                                        src={image}
                                        alt={`${project.title} screenshot ${index + 1}`}
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Back to Projects */}
            <section className="py-24 px-8">
                <div className="container mx-auto max-w-6xl text-center">
                    <motion.button
                        onClick={() => navigate('/')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-12 py-4 bg-white text-black rounded-full text-lg font-medium hover:bg-gray-100 transition-all duration-300"
                    >
                        ← BACK TO HOME
                    </motion.button>
                </div>
            </section>
        </div>
    );
};

export default ProjectDetail;
