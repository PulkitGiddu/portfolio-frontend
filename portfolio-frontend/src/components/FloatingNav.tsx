import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa6';
import mineImage from '../assets/mine.png';
import { useNavigate, useLocation } from 'react-router-dom';

const FloatingNav = () => {
    const { theme, toggleTheme } = useTheme();
    const [activeSection, setActiveSection] = useState('home');
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        { id: 'home', label: 'HOME' },
        { id: 'about', label: 'ABOUT' },
        { id: 'resume', label: 'RESUME' },
        { id: 'work', label: 'WORK' },
        { id: 'journal', label: 'JOURNAL' },
    ];

    const scrollToSection = (id: string) => {
        setActiveSection(id);

        if (id === 'journal') {
            navigate('/journal');
            return;
        }

        if (id === 'work') {
            navigate('/work');
            return;
        }

        if (location.pathname !== '/') {
            navigate('/');
            // Wait for navigation then scroll
            setTimeout(() => {
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToContact = () => {
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
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
                transition={{ delay: 1, duration: 0.8 }}
            >
                <div className="bg-white/80 dark:bg-white/10 backdrop-blur-lg rounded-full border border-gray-200 dark:border-white/20 px-6 py-3 shadow-2xl">
                    <div className="flex items-center gap-8">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center overflow-hidden">
                            <img
                                src={mineImage}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Nav Links */}
                        <div className="flex items-center gap-6">
                            {navItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => scrollToSection(item.id)}
                                    className={`text-sm font-medium transition-colors duration-300 ${activeSection === item.id
                                        ? 'text-black dark:text-white'
                                        : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
                                        }`}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>

                        <div className="w-px h-6 bg-gray-300 dark:bg-white/20 mx-2" />

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
                            onClick={scrollToContact}
                            className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                        >
                            CONTACT <span className="text-lg leading-none">+</span>
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default FloatingNav;
