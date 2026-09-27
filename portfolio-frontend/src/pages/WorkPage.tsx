import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SiteNav from '../components/SiteNav';
import Footer from '../components/Footer';
import WorkIndex from '../components/WorkIndex';
import { TextLink } from '../components/ui';

const WorkPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-ink text-paper">
            <SiteNav />
            <main className="pt-14">
                <section className="shell py-20 md:py-28">
                    <p className="kicker">Work</p>
                    <h1 className="mt-4 max-w-3xl font-display text-[clamp(3rem,7vw,6rem)] leading-[0.92] text-paper">
                        Everything, in one list.
                    </h1>
                    <p className="mt-6 max-w-md text-lg font-light leading-relaxed text-mute">
                        The same index as the front page, without the cutoff.
                    </p>
                    <div className="mt-16">
                        <WorkIndex />
                    </div>
                    <div className="mt-12">
                        <Link to="/">
                            <TextLink>Back home</TextLink>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default WorkPage;
