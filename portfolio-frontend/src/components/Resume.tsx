import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaDownload, FaBriefcase, FaGraduationCap, FaAward } from 'react-icons/fa';

const Resume = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const experience = [
        {
            title: 'Senior Full Stack Developer',
            company: 'Tech Company Inc.',
            period: '2022 - Present',
            description: 'Leading development of scalable web applications using React, Node.js, and cloud technologies.',
            achievements: [
                'Improved application performance by 40%',
                'Led a team of 5 developers',
                'Implemented CI/CD pipeline',
            ],
        },
        {
            title: 'Full Stack Developer',
            company: 'StartUp XYZ',
            period: '2020 - 2022',
            description: 'Developed and maintained multiple client projects using modern web technologies.',
            achievements: [
                'Built 10+ production applications',
                'Reduced bug reports by 60%',
                'Mentored junior developers',
            ],
        },
    ];

    const education = [
        {
            degree: 'Bachelor of Technology in Computer Science',
            institution: 'University Name',
            period: '2016 - 2020',
            grade: 'CGPA: 8.5/10',
        },
    ];

    const certifications = [
        'AWS Certified Solutions Architect',
        'Google Cloud Professional Developer',
        'MongoDB Certified Developer',
        'React Advanced Certification',
    ];

    return (
        <section id="resume" className="relative py-20" ref={ref}>
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
                        My <span className="gradient-text">Resume</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mb-8" />

                    {/* Download Button */}
                    <div className="flex justify-center mb-12">
                        <motion.a
                            href="/resume.pdf"
                            download
                            className="btn-primary flex items-center gap-3"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaDownload className="text-xl" />
                            Download Resume
                        </motion.a>
                    </div>

                    {/* Experience Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mb-12"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                                <FaBriefcase className="text-2xl text-white" />
                            </div>
                            <h3 className="text-3xl font-bold text-white">Experience</h3>
                        </div>

                        <div className="space-y-6">
                            {experience.map((job, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                                    className="glass-card p-6 hover-glow"
                                >
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                                        <div>
                                            <h4 className="text-xl font-bold text-white">{job.title}</h4>
                                            <p className="text-primary-400">{job.company}</p>
                                        </div>
                                        <span className="text-gray-400 text-sm">{job.period}</span>
                                    </div>
                                    <p className="text-gray-300 mb-3">{job.description}</p>
                                    <ul className="space-y-1">
                                        {job.achievements.map((achievement, i) => (
                                            <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                                                <span className="text-accent-500 mt-1">▸</span>
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Education Section */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="mb-12"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                                <FaGraduationCap className="text-2xl text-white" />
                            </div>
                            <h3 className="text-3xl font-bold text-white">Education</h3>
                        </div>

                        <div className="space-y-6">
                            {education.map((edu, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                                    className="glass-card p-6 hover-glow"
                                >
                                    <h4 className="text-xl font-bold text-white mb-2">{edu.degree}</h4>
                                    <p className="text-primary-400 mb-1">{edu.institution}</p>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-400">{edu.period}</span>
                                        <span className="text-accent-400 font-semibold">{edu.grade}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Certifications Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.6, duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                                <FaAward className="text-2xl text-white" />
                            </div>
                            <h3 className="text-3xl font-bold text-white">Certifications</h3>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            {certifications.map((cert, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ delay: 0.7 + index * 0.05, duration: 0.3 }}
                                    className="glass-card p-4 hover-glow flex items-center gap-3"
                                    whileHover={{ x: 5 }}
                                >
                                    <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
                                    <span className="text-gray-300">{cert}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Resume;
