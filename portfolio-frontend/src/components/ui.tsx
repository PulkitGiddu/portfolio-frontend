import type { ReactNode } from 'react';

type FrameProps = {
    id: string;
    kicker: string;
    title: string;
    lede?: string;
    action?: ReactNode;
    children: ReactNode;
};

export function Frame({ id, kicker, title, lede, action, children }: FrameProps) {
    return (
        <section id={id} className="scroll-mt-24 border-t border-line/10">
            <div className="shell py-24 md:py-28">
                <div className="mb-12 md:mb-16">
                    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
                        <div className="max-w-3xl">
                            <p className="kicker">{kicker}</p>
                            <h2 className="mt-3 font-display text-[clamp(2.4rem,5vw,4.25rem)] leading-[0.95] text-paper">
                                {title}
                            </h2>
                        </div>
                        {action && <div className="shrink-0 pb-1">{action}</div>}
                    </div>
                    {lede && (
                        <p className="mt-5 max-w-xl text-base leading-relaxed text-mute">{lede}</p>
                    )}
                </div>
                {children}
            </div>
        </section>
    );
}

export function TextLink({
    children,
    className = '',
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <span className={`group inline-flex items-center gap-2 text-sm text-paper ${className}`}>
            <span className="border-b border-line/30 pb-0.5 transition-colors duration-150 group-hover:border-paper">
                {children}
            </span>
            <span aria-hidden="true" className="transition-transform duration-150 ease-out group-hover:translate-x-0.5">
                →
            </span>
        </span>
    );
}
