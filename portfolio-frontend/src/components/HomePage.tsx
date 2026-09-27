import SiteNav from './SiteNav';
import Hero from './Hero';
import About from './About';
import Resume from './Resume';
import Projects from './Projects';
import Clients from './Clients';
import Blog from './Blog';
import Contact from './Contact';
import Footer from './Footer';

const HomePage = () => {
    return (
        <>
            <SiteNav />
            <main>
                <Hero />
                <About />
                <Projects />
                <Clients />
                <Resume />
                <Blog />
                <Contact />
            </main>
            <Footer />
        </>
    );
};

export default HomePage;
