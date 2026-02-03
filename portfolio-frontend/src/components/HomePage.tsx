import FloatingNav from './FloatingNav';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Clients from './Clients';
import Blog from './Blog';
import Contact from './Contact';
import Footer from './Footer';

const HomePage = () => {
    return (
        <>
            <FloatingNav />
            <main>
                <Hero />
                <About />
                <Projects />
                <Clients />
                <Blog />
                <Contact />
            </main>
            <Footer />
        </>
    );
};

export default HomePage;
