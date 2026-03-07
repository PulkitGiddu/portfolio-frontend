import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import VoiceRecorder from './VoiceRecorder';
import { ENDPOINTS } from '../config/api';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [voiceBlob, setVoiceBlob] = useState<Blob | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('name', `${formData.firstName} ${formData.lastName}`);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('message', formData.message);
            if (voiceBlob) {
                formDataToSend.append('voiceMemo', voiceBlob, 'voice-memo.webm');
            }

            const response = await fetch(ENDPOINTS.CONTACT, {
                method: 'POST',
                body: formDataToSend,
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
                setVoiceBlob(null);
            } else {
                setStatus('error');
            }

            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const inputClass =
        'w-full bg-transparent border-b border-gray-300 dark:border-gray-700 px-0 py-3 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition-colors text-sm';

    return (
        <section id="contact" className="relative py-24 bg-cream-50 dark:bg-black" ref={ref}>
            <div className="section-container">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left Side - Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 1 }}
                        className="space-y-6"
                    >
                        <p className="label-text text-gray-400">CONTACT</p>

                        <h2 className="mono-heading text-6xl md:text-7xl text-black dark:text-white leading-tight">
                            GET IN
                            <br />
                            TOUCH
                        </h2>

                        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
                            Have a project in mind? Whether you're launching a brand, designing
                            a product, or exploring your digital presence — let's build something
                            great together.
                        </p>

                    </motion.div>

                    {/* Right Side - Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2, duration: 1 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-mono tracking-wider text-gray-400 dark:text-gray-500 mb-1 uppercase">
                                        First name
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}

                                        required
                                        className={inputClass}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-mono tracking-wider text-gray-400 dark:text-gray-500 mb-1 uppercase">
                                        Last name
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}

                                        required
                                        className={inputClass}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-xs font-mono tracking-wider text-gray-400 dark:text-gray-500 mb-1 uppercase">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}

                                    required
                                    className={inputClass}
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-xs font-mono tracking-wider text-gray-400 dark:text-gray-500 mb-1 uppercase">
                                    Phone (optional)
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}

                                    className={inputClass}
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-xs font-mono tracking-wider text-gray-400 dark:text-gray-500 mb-1 uppercase">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={2}
                                    className="w-full bg-transparent border-b border-gray-300 dark:border-gray-700 px-0 py-3 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:border-black dark:focus:border-white transition-colors text-sm resize-none"
                                />
                            </div>

                            {/* Voice Recorder */}
                            <div>
                                <label className="block text-xs font-mono tracking-wider text-gray-400 dark:text-gray-500 mb-2 uppercase">
                                    Voice message
                                </label>
                                <VoiceRecorder
                                    onRecordingComplete={setVoiceBlob}
                                    onDelete={() => setVoiceBlob(null)}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className="w-full bg-black dark:bg-white text-white dark:text-black rounded-full py-4 font-mono text-sm tracking-wider uppercase hover:opacity-80 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
                            </button>

                            {/* Status Messages */}
                            {status === 'success' && (
                                <motion.p
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-teal-500 text-center text-sm font-mono"
                                >
                                    Message sent successfully!
                                </motion.p>
                            )}
                            {status === 'error' && (
                                <motion.p
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-center text-sm font-mono"
                                >
                                    Failed to send. Please try again.
                                </motion.p>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
