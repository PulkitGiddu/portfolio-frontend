import bookitLogo from '../assets/bookit.png';
import bet2learnLogo from '../assets/bet2learn.png';
import snatchMartLogo from '../assets/snatchMart.png';
import wynkloLogo from '../assets/wynklo.png';

const clients = [
    { name: 'Wynklo', logo: wynkloLogo },
    { name: 'Bookit', logo: bookitLogo },
    { name: 'SnatchMart', logo: snatchMartLogo },
    { name: 'Bet2Learn', logo: bet2learnLogo },
];

const services = [
    ['01', 'Payments', 'SFMS, Kafka, and Spring services at HSBC.'],
    ['02', 'Web', 'React and Spring Boot, from the API to the page.'],
    ['03', 'Mobile', 'Android and Flutter, on the products that need them.'],
    ['04', 'Releases', 'Quarterly releases, incidents, and a dashboard across 40+ environments.'],
];

const Clients = () => {
    return (
        <section id="clients" className="border-t border-line/10">
            <div className="shell py-16 md:py-20">
                <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
                    <div className="lg:col-span-4">
                        <p className="kicker">Products</p>
                        <h2 className="mt-3 font-display text-4xl leading-none text-paper">What I build</h2>
                    </div>
                    <ul className="grid grid-cols-2 gap-px overflow-hidden border border-line/10 bg-line/10 sm:grid-cols-4 lg:col-span-8">
                        {clients.map((client) => (
                            <li key={client.name} className="flex h-28 items-center justify-center bg-ink px-6">
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className="max-h-14 w-auto max-w-[90%] object-contain"
                                />
                            </li>
                        ))}
                    </ul>
                </div>

                <ol className="mt-14 grid gap-px overflow-hidden border border-line/10 bg-line/10 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map(([index, title, detail]) => (
                        <li key={index} className="bg-ink p-5">
                            <p className="kicker">{index}</p>
                            <p className="mt-3 font-display text-2xl text-paper">{title}</p>
                            <p className="mt-2 text-sm leading-relaxed text-mute">{detail}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
};

export default Clients;
