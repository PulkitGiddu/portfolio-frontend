import bookitLogo from '../assets/bookit.png';
import bet2learnLogo from '../assets/bet2learn.png';
import snatchMartLogo from '../assets/snatchMart.png';
import wynkloLogo from '../assets/wynklo.png';

const clients = [
    { name: 'Bookit', logo: bookitLogo },
    { name: 'Bet2Learn', logo: bet2learnLogo },
    { name: 'SnatchMart', logo: snatchMartLogo },
    { name: 'Wynklo', logo: wynkloLogo },
];

const services = [
    ['01', 'Strategy', 'Where the product should stand.'],
    ['02', 'Interface', 'Screens that stay out of the way.'],
    ['03', 'Web', 'Full-stack, from the model to the page.'],
    ['04', 'Mobile', 'Android and iOS, when the work asks for it.'],
];

const Clients = () => {
    return (
        <section id="clients" className="border-t border-white/[0.08]">
            <div className="shell py-16 md:py-20">
                <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
                    <div className="lg:col-span-4">
                        <p className="kicker">Alongside</p>
                        <h2 className="mt-3 font-display text-4xl leading-none text-paper">Built with</h2>
                    </div>
                    <ul className="grid grid-cols-2 gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08] sm:grid-cols-4 lg:col-span-8">
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

                <ol className="mt-14 grid gap-px overflow-hidden border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
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
