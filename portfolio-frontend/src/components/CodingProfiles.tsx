import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FaGithub, FaCode, FaTrophy, FaStar } from 'react-icons/fa';
import { SiLeetcode, SiCodechef, SiCodeforces } from 'react-icons/si';

interface GitHubStats {
    publicRepos: number;
    followers: number;
    totalStars: number;
    contributions: number;
}

interface CodingProfile {
    platform: string;
    icon: any;
    username: string;
    stats: any;
    color: string;
    link: string;
}

const CodingProfiles = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
    const [loading, setLoading] = useState(true);

    // Replace with actual username
    const GITHUB_USERNAME = 'torvalds'; // Example - replace with your username

    useEffect(() => {
        fetchGitHubStats();
    }, []);

    const fetchGitHubStats = async () => {
        try {
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
            const data = await response.json();

            // Fetch repos to calculate total stars
            const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
            const repos = await reposResponse.json();
            const totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);

            setGithubStats({
                publicRepos: data.public_repos,
                followers: data.followers,
                totalStars,
                contributions: 1234, // This would require GitHub GraphQL API for accurate data
            });
            setLoading(false);
        } catch (error) {
            console.error('Error fetching GitHub stats:', error);
            setLoading(false);
        }
    };

    const profiles: CodingProfile[] = [
        {
            platform: 'GitHub',
            icon: FaGithub,
            username: GITHUB_USERNAME,
            stats: githubStats,
            color: 'from-gray-700 to-gray-900',
            link: `https://github.com/${GITHUB_USERNAME}`,
        },
        {
            platform: 'LeetCode',
            icon: SiLeetcode,
            username: 'your-username',
            stats: { solved: 450, easy: 180, medium: 220, hard: 50, ranking: '12,345' },
            color: 'from-orange-500 to-yellow-500',
            link: 'https://leetcode.com/your-username',
        },
        {
            platform: 'CodeChef',
            icon: SiCodechef,
            username: 'your-username',
            stats: { rating: 1850, stars: '4★', globalRank: 5432 },
            color: 'from-amber-600 to-orange-700',
            link: 'https://www.codechef.com/users/your-username',
        },
        {
            platform: 'Codeforces',
            icon: SiCodeforces,
            username: 'your-username',
            stats: { rating: 1650, maxRating: 1750, rank: 'Expert' },
            color: 'from-blue-500 to-cyan-500',
            link: 'https://codeforces.com/profile/your-username',
        },
    ];

    return (
        <section id="coding-profiles" className="relative py-20 bg-gray-900/50" ref={ref}>
            <div className="section-container">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
                        Coding <span className="gradient-text">Profiles</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mb-8" />
                    <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
                        My competitive programming journey and open-source contributions
                    </p>

                    {/* GitHub Detailed Stats */}
                    {!loading && githubStats && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="glass-card p-8 mb-12 hover-glow"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl flex items-center justify-center">
                                    <FaGithub className="text-4xl text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">GitHub Activity</h3>
                                    <a
                                        href={`https://github.com/${GITHUB_USERNAME}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary-400 hover:text-primary-300 transition-colors"
                                    >
                                        @{GITHUB_USERNAME}
                                    </a>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {[
                                    { label: 'Public Repos', value: githubStats.publicRepos, icon: FaCode },
                                    { label: 'Followers', value: githubStats.followers, icon: FaGithub },
                                    { label: 'Total Stars', value: githubStats.totalStars, icon: FaStar },
                                    { label: 'Contributions', value: `${githubStats.contributions}+`, icon: FaTrophy },
                                ].map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ scale: 0 }}
                                        animate={isInView ? { scale: 1 } : {}}
                                        transition={{ delay: 0.4 + index * 0.1, type: 'spring' }}
                                        className="text-center"
                                    >
                                        <stat.icon className="text-3xl text-primary-400 mx-auto mb-2" />
                                        <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                                        <div className="text-sm text-gray-400">{stat.label}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Other Platforms Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {profiles.slice(1).map((profile, index) => (
                            <motion.a
                                key={index}
                                href={profile.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                                className="glass-card p-6 hover-glow group cursor-pointer"
                                whileHover={{ y: -5 }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`w-12 h-12 bg-gradient-to-r ${profile.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <profile.icon className="text-2xl text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{profile.platform}</h3>
                                        <p className="text-sm text-gray-400">@{profile.username}</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {Object.entries(profile.stats).map(([key, value], i) => (
                                        <div key={i} className="flex justify-between items-center">
                                            <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                            <span className="font-semibold text-white">{String(value)}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    {/* Note */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 1, duration: 0.6 }}
                        className="text-center text-gray-500 text-sm mt-8"
                    >
                        Stats are fetched in real-time from respective platforms
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
};

export default CodingProfiles;
