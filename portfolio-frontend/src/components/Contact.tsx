import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { useTheme } from '../context/ThemeContext';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { theme } = useTheme();

    useEffect(() => {
        (async function () {
            const cal = await getCalApi();
            cal('ui', {
                styles: { branding: { brandColor: '#14b8a6' } },
                hideEventTypeDetails: false,
                layout: 'month_view',
                theme: theme,
            });
        })();
    }, [theme]);

    return (
        <section id="contact" className="relative py-24 bg-cream-50 dark:bg-black" ref={ref}>
            <div className="section-container">
                <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
                    {/* Left Side - Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1 }}
                        className="space-y-6"
                    >
                        <p className="label-text text-gray-400">LET'S CONNECT</p>

                        <h2 className="mono-heading text-6xl md:text-7xl text-black dark:text-white leading-tight">
                            BOOK A
                            <br />
                            CALL
                        </h2>

                        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
                            Want to discuss a project, collaboration, or just have a quick chat?
                            Pick a time that works for you and let's connect.
                        </p>

                        <div className="flex items-center gap-3 pt-4">
                            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                            <span className="text-sm font-mono text-gray-500 dark:text-gray-400">
                                15 min · Video call
                            </span>
                        </div>
                    </motion.div>

                    {/* Right Side - Cal.com Embed */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2, duration: 1 }}
                        className="w-full min-h-[500px] rounded-2xl overflow-hidden"
                    >
                        <Cal
                            key={theme}
                            calLink="pulkit-giddu-c098j5/15min"
                            style={{
                                width: '100%',
                                height: '100%',
                                overflow: 'scroll',
                                minHeight: '500px',
                                borderRadius: '16px',
                            }}
                            config={{
                                layout: 'month_view',
                                theme: theme,
                            }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;

