import SiteNav from '../components/SiteNav';
import Footer from '../components/Footer';
import Blog from '../components/Blog';

const Journal = () => {
    return (
        <div className="min-h-screen bg-ink text-paper">
            <SiteNav />
            <main className="pt-14">
                <Blog />
            </main>
            <Footer />
        </div>
    );
};

export default Journal;
