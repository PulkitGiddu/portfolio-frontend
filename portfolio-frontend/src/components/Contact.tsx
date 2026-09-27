import { useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
    const { theme } = useTheme();
    const reduce = useReducedMotion();

    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal('ui', {
                styles: { branding: { brandColor: theme === 'dark' ? '#e7e7e4' : '#121211' } },
                hideEventTypeDetails: false,
                layout: 'month_view',
                theme: theme,
            });
        })();
    }, [theme]);

    return (
        <section id="contact" className="scroll-mt-24 border-t border-line/10">
            <div className="shell py-24 md:py-28">
                <div className="grid items-start gap-12 lg:grid-cols-12">
                    <div className="lg:col-span-4 lg:sticky lg:top-24">
                        <p className="kicker">Contact</p>
                        <h2 className="mt-3 font-display text-[clamp(2.6rem,5vw,4.25rem)] leading-[0.95] text-paper">
                            Book 15 minutes.
                        </h2>
                        <p className="mt-5 max-w-sm text-base leading-relaxed text-mute">
                            For a role, a product, or a question about the payment work.
                        </p>
                        <a
                            href="mailto:pulkitgiddu09@gmail.com"
                            className="mt-8 inline-block text-lg text-paper underline decoration-line/30 underline-offset-4 transition-colors hover:decoration-paper"
                        >
                            pulkitgiddu09@gmail.com
                        </a>
                        <div className="mt-6 flex items-center gap-3">
                            <motion.span
                                className="inline-block h-1.5 w-1.5 rounded-full bg-paper"
                                animate={reduce ? undefined : { opacity: [0.25, 1, 0.25] }}
                                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                            />
                            <span className="kicker">15 min · video</span>
                        </div>
                    </div>

                    <div className="min-h-[560px] overflow-hidden border border-line/10 lg:col-span-8">
                        <Cal
                            key={theme}
                            calLink="pulkit-giddu-c098j5/15min"
                            style={{ width: '100%', height: '100%', overflow: 'auto', minHeight: '560px' }}
                            config={{ layout: 'month_view', theme }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
