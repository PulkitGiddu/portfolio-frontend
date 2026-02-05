import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaDownload, FaBriefcase, FaGraduationCap, FaAward, FaCalendarAlt, FaCode, FaTools, FaDatabase, FaServer } from 'react-icons/fa';

const Resume = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const experience = [
        {
            title: 'Software Engineer',
            company: 'HSBC INDIA',
            period: 'July 2024 - Present',
            description: 'Results-driven Software Engineer building and optimizing complex systems using Java, Spring Boot, Microservices, and Oracle.',
            tags: ['Java', 'Spring Boot', 'Microservices', 'Oracle', 'React.js'],
            achievements: [
                'Implemented global microservice to integrate real-time interest rates for optimized currency mapping.',
                'Developed a REST service for "soft dismissal" of production records, reducing RCOs by over 75%.',
                'Created utility to verify system readiness saving 105 hours monthly while maintaining detailed documentation.',
                'Utilized SonarIQ and Cyberflow for code quality validation, prioritizing issues through JIRA.',
                'Designed and developed a UI Dashboard tracking production environments, improving productivity by 40%.',
                'Engineered a new payment processing module to integrate RBI\'s Structured Financial Messaging System.',
                'Managed end-to-end quarterly release management process, deploying 4 major releases with reduced incidents.'
            ],
            color: 'from-red-600 to-red-800' // HSBC Brand colors roughly
        }
    ];

    const education = [
        {
            degree: 'B. Tech, Electronics & Telecommunication',
            institution: 'Vishwakarma Institute of Technology, Pune',
            period: 'July 2024',
            grade: 'CGPA: 8.05',
            color: 'from-blue-600 to-blue-800'
        }
    ];

    const skills = [
        { category: 'Languages', items: ['Java', 'C++', 'SQL (PL/SQL)', 'JavaScript'], icon: FaCode },
        { category: 'Frameworks', items: ['React.js', 'Spring Boot', 'Microservices', 'Android', 'Kafka', 'Redis'], icon: FaServer },
        { category: 'Tools', items: ['JIRA', 'GIT/GitHub', 'Jenkins', 'SonarIQ', 'Cyberflow', 'ServiceNow'], icon: FaTools },
        { category: 'Databases', items: ['MySQL', 'Oracle', 'PostgreSQL'], icon: FaDatabase },
    ];

    const achievements = [
        'Winner CodeFury-2024, HSBC INDIA',
        'Grand Finalist Hack The Winter 2026',
        'Secure Code Warrior – Yellow Belt',
        'Microservices with Spring Cloud',
        'Solved Over 350+ LeetCode problems'
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section id="resume" className="relative py-24 bg-cream-50 dark:bg-black overflow-hidden" ref={ref}>
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-[5%] w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-float-slow" />
                <div className="absolute bottom-20 left-[5%] w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
            </div>

            <div className="section-container relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.div
                            variants={itemVariants}
                            className="inline-block px-4 py-1 mb-4 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 font-semibold text-sm"
                        >
                            Winner CodeFury-2024, HSBC INDIA
                        </motion.div>
                        <motion.h2
                            variants={itemVariants}
                            className="mono-heading text-5xl md:text-7xl mb-6 text-black dark:text-white"
                        >
                            CAREER <span className="gradient-text">JOURNEY</span>
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed"
                        >
                            Results-driven Software Engineer with hands-on experience in the complete software development lifecycle.
                            Adept at building and optimizing complex systems using Java, Spring Boot, Microservices, and Oracle.
                        </motion.p>

                        <motion.div variants={itemVariants} className="mt-8">
                            <motion.a
                                href="/resume.pdf"
                                download
                                className="inline-flex items-center gap-3 px-8 py-4 bg-black dark:bg-white text-white dark:text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaDownload />
                                DOWNLOAD RESUME
                            </motion.a>
                        </motion.div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12">
                        {/* Left Column: Experience & Education */}
                        <div className="lg:col-span-7 space-y-12">
                            {/* Experience */}
                            <div>
                                <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-black dark:bg-white rounded-xl">
                                        <FaBriefcase className="text-2xl text-white dark:text-black" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-black dark:text-white mono-heading">EXPERIENCE</h3>
                                </motion.div>

                                <div className="relative border-l-2 border-gray-200 dark:border-gray-800 ml-4 md:ml-6 space-y-12">
                                    {experience.map((job, index) => (
                                        <motion.div
                                            key={index}
                                            variants={itemVariants}
                                            className="relative pl-8 md:pl-12"
                                        >
                                            {/* Timeline Dot */}
                                            <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gradient-to-r ${job.color} ring-4 ring-white dark:ring-black`} />

                                            <div className="group glass-card p-8 rounded-3xl hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
                                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                                                    <div>
                                                        <h4 className="text-2xl font-bold text-black dark:text-white mb-2">{job.title}</h4>
                                                        <div className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-gray-600 to-gray-900 dark:from-gray-300 dark:to-white">
                                                            {job.company}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300 whitespace-nowrap">
                                                        <FaCalendarAlt />
                                                        {job.period}
                                                    </div>
                                                </div>

                                                <div className="space-y-3 mb-6">
                                                    {job.achievements.map((item, i) => (
                                                        <div key={i} className="flex items-start gap-3">
                                                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${job.color} flex-shrink-0`} />
                                                            <span className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {job.tags.map((tag, i) => (
                                                        <span key={i} className="px-3 py-1 text-xs font-semibold bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 rounded-full border border-gray-200 dark:border-white/10">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Education */}
                            <div>
                                <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-black dark:bg-white rounded-xl">
                                        <FaGraduationCap className="text-2xl text-white dark:text-black" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-black dark:text-white mono-heading">EDUCATION</h3>
                                </motion.div>

                                <div className="space-y-6">
                                    {education.map((edu, index) => (
                                        <motion.div
                                            key={index}
                                            variants={itemVariants}
                                            className="glass-card p-6 rounded-3xl relative overflow-hidden group"
                                        >
                                            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${edu.color} opacity-10 rounded-bl-full transition-transform group-hover:scale-110`} />

                                            <h4 className="text-xl font-bold text-black dark:text-white mb-2">{edu.degree}</h4>
                                            <p className="text-gray-600 dark:text-gray-300 font-medium mb-4">{edu.institution}</p>

                                            <div className="flex justify-between items-center text-sm">
                                                <span className="bg-gray-100 dark:bg-white/5 px-3 py-1 rounded-full text-gray-600 dark:text-gray-400">
                                                    {edu.period}
                                                </span>
                                                <span className="font-bold text-black dark:text-white">
                                                    {edu.grade}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Skills & Achievements */}
                        <div className="lg:col-span-5 space-y-12">
                            {/* Skills */}
                            <div>
                                <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-black dark:bg-white rounded-xl">
                                        <FaCode className="text-2xl text-white dark:text-black" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-black dark:text-white mono-heading">TECHNICAL SKILLS</h3>
                                </motion.div>

                                <div className="grid gap-4">
                                    {skills.map((skillGroup, index) => (
                                        <motion.div
                                            key={index}
                                            variants={itemVariants}
                                            className="glass-card p-5 rounded-2xl hover:bg-white/50 dark:hover:bg-white/5 transition-colors"
                                        >
                                            <div className="flex items-center gap-3 mb-3">
                                                <skillGroup.icon className="text-orange-500 text-lg" />
                                                <h4 className="font-bold text-black dark:text-white">{skillGroup.category}</h4>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {skillGroup.items.map((skill, i) => (
                                                    <span key={i} className="text-sm px-2 py-1 rounded bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Achievements & Certifications */}
                            <div>
                                <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
                                    <div className="p-3 bg-black dark:bg-white rounded-xl">
                                        <FaAward className="text-2xl text-white dark:text-black" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-black dark:text-white mono-heading">ACHIEVEMENTS</h3>
                                </motion.div>

                                <div className="space-y-4">
                                    {achievements.map((achievement, i) => (
                                        <motion.div
                                            key={i}
                                            variants={itemVariants}
                                            className="glass-card p-4 rounded-2xl flex items-center gap-3 hover:translate-x-2 transition-transform duration-300"
                                        >
                                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex-shrink-0" />
                                            <span className="text-gray-700 dark:text-gray-300 font-medium">{achievement}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Resume;
