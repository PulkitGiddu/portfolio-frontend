import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingNav from '../components/FloatingNav';
import Blog from '../components/Blog';
import { motion } from 'framer-motion';

const Journal = () => {
    return (
        <div className="bg-cream-50 dark:bg-black min-h-screen">
            <FloatingNav />

            {/* Back Button */}
            <div className="absolute top-8 left-8 z-20">
                <a href="/" className="flex items-center gap-2 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors font-mono text-sm group">
                    <span className="group-hover:-translate-x-1 transition-transform">←</span> BACK TO PORTFOLIO
                </a>
            </div>

            <main className="pt-0">
                <Blog className="pt-46" />
            </main>

            <Footer />
        </div>
    );
};

export default Journal;
