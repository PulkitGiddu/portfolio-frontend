import { useState, useEffect } from 'react';
import { FaXTwitter, FaInstagram, FaLinkedinIn, FaYoutube, FaGithub } from 'react-icons/fa6';
import { SiLeetcode } from 'react-icons/si';

const Footer = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [socialLinks, setSocialLinks] = useState<any[]>([]);

    const iconMap: any = {
        'FaXTwitter': FaXTwitter,
        'FaInstagram': FaInstagram,
        'FaLinkedinIn': FaLinkedinIn,
        'FaYoutube': FaYoutube,
        'FaGithub': FaGithub,
        'SiLeetcode': SiLeetcode
    };

    const DEFAULT_SOCIALS = [
        { name: 'X', Icon: FaXTwitter, url: 'https://twitter.com' },
        { name: 'Instagram', Icon: FaInstagram, url: 'https://www.instagram.com/pulkit.giddu/' },
        { name: 'LinkedIn', Icon: FaLinkedinIn, url: 'https://www.linkedin.com/in/pulkit-giddu-223780206/' },
        { name: 'YouTube', Icon: FaYoutube, url: 'https://www.youtube.com/@pulkitgiddu1568' },
        { name: 'GitHub', Icon: FaGithub, url: 'https://github.com/PulkitGiddu' },
        { name: 'LeetCode', Icon: SiLeetcode, url: 'https://leetcode.com/u/PulkitGiddu/' },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        // Fetch social links
        fetch('http://localhost:8081/api/social-links')
            .then(res => res.json())
            .then(data => {
                if (data && data.length > 0) {
                    const mapped = data.map((link: any) => ({
                        name: link.platformName,
                        url: link.url,
                        Icon: iconMap[link.iconName] || FaGithub
                    }));
                    setSocialLinks(mapped);
                } else {
                    setSocialLinks(DEFAULT_SOCIALS);
                }
            })
            .catch(err => {
                console.error("Failed to fetch social links", err);
                setSocialLinks(DEFAULT_SOCIALS);
            });

        return () => clearInterval(timer);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home', count: '' },
        { name: 'About', href: '#about', count: '' },
        { name: 'Projects', href: '#projects', count: '(06)' },
        { name: 'Journal', href: '#journal', count: '(05)' },
        { name: 'Contact us', href: '#contact', count: '' },
    ];

    const currentLinks = socialLinks.length > 0 ? socialLinks : DEFAULT_SOCIALS;

    return (
        <footer className="bg-cream-50 dark:bg-black text-black dark:text-white py-20 relative overflow-hidden transition-colors duration-300">
            <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">

                {/* Top Section */}
                <div className="grid md:grid-cols-2 gap-20 mb-32">

                    {/* Left: Email CTA */}
                    <div className="space-y-6">
                        <p className="font-mono text-sm tracking-widest text-zinc-500 uppercase">
                            STAY CONNECTED.
                        </p>
                        <p className="text-zinc-600 dark:text-zinc-500 max-w-md text-sm leading-relaxed">
                            Breaking boundaries to craft designs that stand out and deliver results. Blending creativity with strategy.
                        </p>

                        <div className="pt-8">
                            <p className="text-zinc-600 text-xs">Made with Love by Pulkit.</p>
                        </div>
                    </div>

                    {/* Right: Navigation & Socials */}
                    <div className="flex flex-col md:flex-row gap-16 md:gap-32 w-full justify-end">
                        {/* Nav */}
                        <div>
                            <ul className="space-y-4">
                                {navLinks.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.href} className="font-pixel text-xl md:text-2xl text-black dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors flex items-start gap-1 group">
                                            {link.name}
                                            {link.count && <span className="text-xs text-zinc-500 dark:text-zinc-600 group-hover:text-teal-600 dark:group-hover:text-teal-500 font-mono -mt-1">{link.count}</span>}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Socials */}
                        <div>
                            <h3 className="font-pixel text-sm mb-6 text-zinc-500 uppercase">Social Media</h3>
                            <div className="flex gap-4">
                                {currentLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
                                        title={social.name}
                                    >
                                        <social.Icon size={24} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="text-center border-t border-zinc-200 dark:border-zinc-900 pt-8 pb-32 md:pb-8">
                    <p className="text-zinc-500 dark:text-zinc-600 text-xs font-mono">
                        © {currentTime.getFullYear()} PULKIT GIDDU. All rights reserved. •
                        <span className="ml-2 opacity-50">{currentTime.toLocaleTimeString()} IST</span>
                        <a href="http://localhost:8081/oauth2/authorization/google" className="ml-4 opacity-50 hover:opacity-100 hover:text-teal-500 transition-opacity" title="Admin Login">
                            Admin Access
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
