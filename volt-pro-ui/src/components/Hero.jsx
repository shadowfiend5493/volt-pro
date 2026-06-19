const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-text-panel" aria-hidden="true" />

            <div className="page-container hero-wrapper">
                <div className="hero-text">
                    <p className="hero-eyebrow">Enterprise Electrical Engineering</p>
                    <h1 className="hero-headline">
                        Powering Fortune 500<br />
                        <span className="hero-headline-accent">Infrastructure</span>
                    </h1>
                    <p className="hero-subtitle">
                        Mission-critical electrical engineering solutions trusted by the world's
                        leading companies. From planning to full-scale execution.
                    </p>
                    <div className="hero-actions">
                        <a href="/solutions" className="btn-primary">Explore Solutions →</a>
                        <a href="/engineers" className="btn-ghost">View Engineers</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
