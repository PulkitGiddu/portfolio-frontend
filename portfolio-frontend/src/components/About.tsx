import { motion, useReducedMotion } from 'framer-motion';
import { Frame } from './ui';

const practices = [
    {
        name: 'Payments',
        detail: 'Java, Spring Boot, Kafka and REST APIs. Building reliable services for high-throughput financial workflows.',
    },
    {
        name: 'Products',
        detail: 'Wynklo and independent products spanning commerce, booking and real-time applications.',
    },
    {
        name: 'Systems',
        detail: 'Distributed systems, PostgreSQL, Oracle, Redis and event-driven architectures built for scale.',
    },
    {
        name: 'Production',
        detail: 'Observability across 40+ environments, production debugging, CI/CD and zero-downtime releases.',
    },
];

const About = () => {
    const reduce = useReducedMotion();

    return (
        <Frame
            id="about"
            kicker="About"
            title="Payments at HSBC. Products of my own."
            lede="Software Engineer at HSBC, Pune — since July 2024."
        >
            <div className="mt-10 grid gap-8 md:grid-cols-2">
                <p className="text-lg font-light leading-relaxed text-paper/85">
                    At HSBC, I build distributed payment systems using Java, Spring Boot and event-driven architecture. My work spans payment processing, regulatory validation, production observability and the systems that keep critical financial services reliable.
                </p>
                <p className="text-lg font-light leading-relaxed text-mute">
                    Outside HSBC, I build products of my own. I&apos;m currently building{' '}
                    <a
                        href="https://www.wynklo.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-paper underline decoration-line/40 underline-offset-4 transition-colors hover:decoration-paper"
                    >
                        Wynklo
                    </a>
                    , alongside projects exploring real-time systems, commerce and scalable backend architecture.
                </p>
            </div>

            <dl className="mt-16 grid gap-px overflow-hidden border border-line/10 bg-line/10 sm:grid-cols-2 lg:grid-cols-4">
                {practices.map((item, index) => (
                    <motion.div
                        key={item.name}
                        className="bg-ink p-6"
                        initial={reduce ? false : { opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.6, delay: index * 0.06 }}
                    >
                        <dt className="font-display text-2xl text-paper">{item.name}</dt>
                        <dd className="mt-3 text-sm leading-relaxed text-mute">{item.detail}</dd>
                    </motion.div>
                ))}
            </dl>
        </Frame>
    );
};

export default About;
