import { useEffect, useState } from 'react';
import { ENDPOINTS } from '../config/api';

type Social = {
    name: string;
    url: string;
};

const DEFAULT_SOCIALS: Social[] = [
    { name: 'Email', url: 'mailto:pulkitgiddu09@gmail.com' },
    { name: 'GitHub', url: 'https://github.com/PulkitGiddu' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/pulkit-giddu-223780206/' },
    { name: 'LeetCode', url: 'https://leetcode.com/u/PulkitGiddu/' },
    { name: 'Instagram', url: 'https://www.instagram.com/wynklo_tech/?hl=en' },
];

const NAME_TO_LABEL: Record<string, string> = {
    gmail: 'Email',
    email: 'Email',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    leetcode: 'LeetCode',
    instagram: 'Instagram',
    youtube: 'YouTube',
};

const Footer = () => {
    const [now, setNow] = useState(() => new Date());
    const [socials, setSocials] = useState<Social[]>(DEFAULT_SOCIALS);
    const [views, setViews] = useState<number | null>(null);

    useEffect(() => {
        const timer = window.setInterval(() => setNow(new Date()), 1000);

        fetch(ENDPOINTS.TRACKING_COUNT)
            .then((res) => (res.ok ? res.json() : null))
            .then((count) => {
                if (typeof count === 'number') setViews(count);
            })
            .catch(() => undefined);

        fetch(ENDPOINTS.SOCIAL_LINKS)
            .then((res) => res.json())
            .then((data: { platformName?: string; url?: string }[]) => {
                if (!Array.isArray(data) || data.length === 0) return;
                const mapped = data
                    .filter((link) => link.url)
                    .map((link) => {
                        const raw = (link.platformName || 'Link').trim();
                        const label = NAME_TO_LABEL[raw.toLowerCase()] || raw;
                        return { name: label, url: link.url as string };
                    });
                if (mapped.length > 0) setSocials(mapped);
            })
            .catch(() => undefined);

        return () => window.clearInterval(timer);
    }, []);

    const time = now.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Kolkata',
    });

    return (
        <footer className="border-t border-line/10">
            <div className="shell py-16 md:py-20">
                <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
                    <a href="/#contact" className="max-w-md">
                        <p className="kicker">Stay in touch</p>
                        <p className="mt-3 font-display text-4xl leading-none text-paper md:text-5xl">
                            Write, or take the fifteen minutes.
                        </p>
                    </a>
                    <ul className="flex flex-wrap gap-x-6 gap-y-3">
                        {socials.map((social) => (
                            <li key={social.name}>
                                <a
                                    href={social.url}
                                    target={social.url.startsWith('mailto:') ? undefined : '_blank'}
                                    rel="noopener noreferrer"
                                    className="text-sm text-mute transition-colors duration-300 hover:text-paper"
                                >
                                    {social.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <p className="mt-16 font-display text-[clamp(4.5rem,16vw,11rem)] leading-[0.8] tracking-[-0.045em] text-paper">
                    Pulkit
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line/10 pt-5">
                    <p className="kicker">© {now.getFullYear()} Pulkit Giddu</p>
                    <span className="kicker">{time} IST</span>
                    {views !== null && <span className="kicker">{views.toLocaleString()} visits</span>}
                    <a href={ENDPOINTS.OAUTH2_GOOGLE} className="kicker transition-colors hover:text-paper">
                        Admin
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
