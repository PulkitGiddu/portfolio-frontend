import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import VoiceRecorder from './VoiceRecorder';

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

            const response = await fetch('http://localhost:8081/api/contact', {
                method: 'POST',
                body: formDataToSend, // Browser sets Content-Type with boundary
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

    return (
        <section id="contact" className="relative py-20 bg-cream-50 dark:bg-black overflow-hidden" ref={ref}>
            {/* Background Image with rounded container */}
            <div className="section-container">
                <div className="relative rounded-6xl overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=1920&h=1080&fit=crop"
                            alt="Contact Background"
                            className="w-full h-full object-cover"
                        />
                        {/* Dark overlay with red/burgundy tint */}
                        <div className="absolute inset-0 bg-gradient-to-br from-burgundy-900/80 via-black/70 to-black/90" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center p-12 md:p-20 min-h-[600px]">
                        {/* Left Side - Text */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 1 }}
                            className="space-y-6"
                        >
                            <h2 className="mono-heading text-7xl md:text-8xl text-white leading-tight">
                                GET IN
                                <br />
                                TOUCH
                            </h2>
                            <p className="text-lg text-white/70 max-w-md">
                                Have a project in mind? Whether you're launching a brand, designing
                                a product, or exploring your digital presence, we're here to bring
                                your vision to life.
                            </p>
                        </motion.div>

                        {/* Right Side - Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: 0.3, duration: 1 }}
                        >
                            <form onSubmit={handleSubmit} className="glass-card p-8 md:p-10 space-y-6 bg-black/40">
                                <p className="label-text text-white/70 mb-6">CONTACT US,25</p>

                                {/* Name Fields */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-white/70 mb-2">First name</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="John"
                                            required
                                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-white/70 mb-2">Last name</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Smith"
                                            required
                                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Email and Phone */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-white/70 mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="jane@framer.com"
                                            required
                                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-white/70 mb-2">Phone no.</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="(+1)234-000-0000"
                                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/40 transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Voice Recorder */}
                                <div>
                                    <label className="block text-sm text-white/70 mb-2">Voice Message (Optional)</label>
                                    <VoiceRecorder
                                        onRecordingComplete={setVoiceBlob}
                                        onDelete={() => setVoiceBlob(null)}
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={status === 'sending'}
                                    className="w-full bg-white text-black rounded-full py-4 font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {status === 'sending' ? 'SENDING...' : 'SUBMIT'}
                                </button>

                                {/* Status Messages */}
                                {status === 'success' && (
                                    <p className="text-green-400 text-center text-sm">Message sent successfully!</p>
                                )}
                                {status === 'error' && (
                                    <p className="text-red-400 text-center text-sm">Failed to send message. Please try again.</p>
                                )}
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
