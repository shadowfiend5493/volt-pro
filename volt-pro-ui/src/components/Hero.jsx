import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="hero-bg relative h-[calc(100vh-64px)] min-h-[600px] flex flex-col justify-start overflow-hidden max-md:h-auto max-md:min-h-svh">
            {/* hero-panel darkens the image behind the text so the headline stays readable. */}
            <div className="hero-panel absolute top-0 left-0 bottom-0 w-[58%] pointer-events-none z-1" aria-hidden="true" />

            <div className="relative z-2 pt-20 pb-8 px-[clamp(1.5rem,5vw,7rem)] shrink-0">
                <div className="max-w-[520px]">
                    <p className="text-[12px] font-semibold tracking-[3px] uppercase text-volt-accent mb-5 m-0">
                        Enterprise Electrical Engineering
                    </p>
                    <h1 className="text-[clamp(2.4rem,6vw,4.5rem)] font-extrabold leading-[1.1] text-volt-text tracking-[-1px] mb-6 mt-0">
                        Powering Fortune 500<br />
                        <span className="text-volt-accent [text-shadow:0_0_40px_rgba(34,197,94,0.4)]">
                            Infrastructure
                        </span>
                    </h1>
                    <p className="text-[1.1rem] leading-7 text-volt-muted max-w-[520px] mb-10 mt-0">
                        Mission-critical electrical engineering solutions trusted by the world's
                        leading companies. From planning to full-scale execution.
                    </p>
                    <div className="flex items-center gap-4 flex-wrap">
                        {/* Link changes routes without reloading the full page. */}
                        <Link
                            to="/solutions"
                            className="bg-volt-accent text-volt-black px-7 py-3.5 rounded text-[14px] font-bold tracking-[1px] uppercase no-underline transition-all duration-200 shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:bg-volt-accent-hover hover:shadow-[0_0_32px_rgba(34,197,94,0.5)] hover:-translate-y-px"
                        >
                            Explore Solutions →
                        </Link>
                        <Link
                            to="/engineers"
                            className="border border-volt-border text-volt-muted px-7 py-3.5 rounded text-[14px] font-semibold tracking-[1px] uppercase no-underline transition-all duration-200 hover:border-volt-accent hover:text-volt-accent"
                        >
                            View Engineers
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
