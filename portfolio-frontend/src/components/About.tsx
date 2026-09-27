import { motion, useReducedMotion } from 'framer-motion';
import { Frame } from './ui';

const practices = [
    { name: 'Systems', detail: 'Java, Spring Boot, Kafka, Redis. Payments and the services around them.' },
    { name: 'Product', detail: 'React and full-stack apps, from the first screen to the deploy.' },
    { name: 'Data', detail: 'Oracle, Postgres, MySQL. The query you only notice when it is slow.' },
    { name: 'Care', detail: 'Releases, incidents, and the dashboard that tells the truth.' },
];

const About = () => {
    const reduce = useReducedMotion();

    return (
        <Frame
            id="about"
            kicker="About"
            title="Quiet systems. Clear interfaces."
            lede="The interesting part is usually the failure you kept from happening."
        >
            <div className="grid gap-8 md:grid-cols-2">
                <p className="text-lg font-light leading-relaxed text-paper/85">
                    I&apos;m a software engineer at HSBC in Pune. I work on distributed services — payments, regulatory checks, and the tools that show whether they&apos;re healthy.
                </p>
                <p className="text-lg font-light leading-relaxed text-mute">
                    Alongside that I design and ship products: booking, learning, commerce. I like the work where the system and the screen are the same problem.
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
