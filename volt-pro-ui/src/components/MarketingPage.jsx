import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBookOpen,
    faChartLine,
    faPlugCircleBolt,
    faShieldHalved,
} from '@fortawesome/free-solid-svg-icons';

const PAGE_CONTENT = {
    solutions: {
        eyebrow: 'Solutions',
        title: 'Electrical project support from design to maintenance.',
        summary: 'VoltPro helps businesses plan, install, monitor, and maintain reliable electrical infrastructure with verified specialists and practical service packages.',
        heroPoints: ['Power system design', 'Emergency response', 'Preventive maintenance'],
        sections: [
            {
                icon: faPlugCircleBolt,
                title: 'Design and Installation',
                text: 'Scope new electrical work, coordinate certified engineers, and keep every stage aligned with safety and performance requirements.',
            },
            {
                icon: faShieldHalved,
                title: 'Compliance and Safety',
                text: 'Support audits, inspections, and corrective work with documented processes for critical power environments.',
            },
            {
                icon: faChartLine,
                title: 'Monitoring and Maintenance',
                text: 'Use scheduled visits and performance reviews to reduce downtime before it becomes expensive.',
            },
        ],
    },
    about: {
        eyebrow: 'About VoltPro',
        title: 'A focused marketplace for trusted electrical expertise.',
        summary: 'VoltPro is being built as a learning project and a realistic B2B platform for finding certified engineers, services, and electrical support.',
        heroPoints: ['Verified network', 'Clear workflows', 'Built to learn'],
        sections: [
            {
                icon: faShieldHalved,
                title: 'Trust First',
                text: 'Engineer profiles, ratings, and clear service categories help buyers choose support with confidence.',
            },
            {
                icon: faPlugCircleBolt,
                title: 'Electrical Focus',
                text: 'The product stays close to one domain so every feature can serve real power, maintenance, and safety needs.',
            },
            {
                icon: faBookOpen,
                title: 'Learning Journal',
                text: 'Each feature practices full-stack concepts across React, routing, Spring Boot APIs, and database persistence.',
            },
        ],
    },
};

const MarketingPage = ({ pageKey }) => {
    const page = PAGE_CONTENT[pageKey] ?? PAGE_CONTENT.solutions;
    const isAboutPage = pageKey === 'about';

    return (
        <section className="min-h-[calc(100vh-64px)] bg-volt-black px-[clamp(1.5rem,5vw,7rem)] py-16">
            <div className="mx-auto max-w-300">
                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <div>
                        <p className="mb-4 mt-0 text-[12px] font-semibold uppercase tracking-[3px] text-volt-accent">
                            {page.eyebrow}
                        </p>
                        <h1 className="mb-5 mt-0 text-[clamp(2.2rem,5vw,4.6rem)] font-extrabold leading-tight text-volt-text">
                            {page.title}
                        </h1>
                        <p className="mb-8 text-[1.08rem] leading-8 text-volt-muted">
                            {page.summary}
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {page.heroPoints.map((point) => (
                                <span
                                    key={point}
                                    className="rounded-full border border-volt-border bg-volt-secondary px-4 py-2 text-sm font-semibold text-volt-text"
                                >
                                    {point}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-volt-border bg-volt-secondary p-7 shadow-[0_18px_70px_rgba(0,0,0,0.2)]">
                        <p className="mb-3 mt-0 text-sm font-semibold uppercase tracking-[2px] text-volt-accent">
                            {isAboutPage ? 'Engineer Network' : 'Need Support?'}
                        </p>
                        <p className="mb-6 text-volt-muted">
                            {isAboutPage
                                ? 'Meet the certified specialists available through the VoltPro network.'
                                : 'Share your project requirements and VoltPro will help route the request to the right electrical support.'}
                        </p>
                        <Link
                            to={isAboutPage ? '/engineers' : '/contact'}
                            className="inline-flex rounded-md bg-volt-accent px-5 py-3 text-sm font-bold uppercase tracking-[1.5px] text-volt-black no-underline transition hover:bg-volt-accent-hover"
                        >
                            {isAboutPage ? 'View Engineers' : 'Contact Us'}
                        </Link>
                    </div>
                </div>

                <div className="mt-12 grid gap-5 md:grid-cols-3">
                    {page.sections.map((section) => (
                        <article
                            key={section.title}
                            className="rounded-2xl border border-volt-border bg-volt-secondary p-6 transition hover:-translate-y-1 hover:border-volt-accent/70"
                        >
                            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-volt-accent/15 text-xl text-volt-accent">
                                <FontAwesomeIcon icon={section.icon} />
                            </div>
                            <h2 className="mb-3 mt-0 text-xl font-bold text-volt-text">
                                {section.title}
                            </h2>
                            <p className="m-0 leading-7 text-volt-muted">
                                {section.text}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MarketingPage;
