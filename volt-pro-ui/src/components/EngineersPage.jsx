import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faLocationDot, faUserGear } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../api/apiClient';

const ENGINEERS_API_URL = '/v1/engineers';

const EngineersPage = () => {
    // These three state values drive the page: data, loading message, and error message.
    const [engineers, setEngineers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // useEffect runs once when this page loads, then calls the backend API.
    useEffect(() => {
        const fetchEngineers = async () => {
            try {
                // apiClient adds the /api base URL, then Vite proxies it to Spring Boot locally.
                const response = await apiClient.get(ENGINEERS_API_URL);
                // The backend returns EngineerResponse DTOs, not JPA entities.
                setEngineers(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Unable to load engineers right now.');
            } finally {
                setLoading(false);
            }
        };

        fetchEngineers();
    }, []);

    return (
        <section className="min-h-[calc(100vh-64px)] bg-volt-black px-[clamp(1.5rem,5vw,7rem)] py-16">
            <div className="mx-auto max-w-[1200px]">
                <div className="mb-10 max-w-[680px]">
                    <p className="mb-4 mt-0 text-[12px] font-semibold uppercase tracking-[3px] text-volt-accent">
                        Available Engineers
                    </p>
                    <h1 className="mb-4 mt-0 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight text-volt-text">
                        Certified specialists ready for critical infrastructure work.
                    </h1>
                    <p className="m-0 text-[1.05rem] leading-7 text-volt-muted">
                        Browse the engineers currently available in the VoltPro network.
                    </p>
                </div>

                {/* Show one of four states: loading, error, empty, or the engineer cards. */}
                {loading && (
                    <div className="rounded-xl border border-volt-border bg-volt-secondary p-6 text-volt-muted">
                        Loading engineers...
                    </div>
                )}

                {!loading && error && (
                    <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-6 text-red-200">
                        {error}
                    </div>
                )}

                {!loading && !error && engineers.length === 0 && (
                    <div className="rounded-xl border border-volt-border bg-volt-secondary p-6 text-volt-muted">
                        No engineers are available yet.
                    </div>
                )}

                {!loading && !error && engineers.length > 0 && (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {engineers.map((engineer) => (
                            <article
                                key={engineer.id}
                                className="rounded-2xl border border-volt-border bg-volt-secondary p-6 shadow-[0_18px_60px_rgba(0,0,0,0.18)] transition-all duration-200 hover:border-volt-accent/70 hover:-translate-y-1"
                            >
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-volt-accent/10 text-volt-accent">
                                    <FontAwesomeIcon icon={faBolt} />
                                </div>
                                <h2 className="mb-2 mt-0 text-xl font-bold text-volt-text">
                                    {engineer.name}
                                </h2>
                                <p className="mb-5 mt-0 text-volt-muted">
                                    {engineer.role}
                                </p>
                                <div className="flex flex-col gap-3 text-sm text-volt-muted">
                                    <span className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faUserGear} className="text-volt-accent" />
                                        Specialist Engineer
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <FontAwesomeIcon icon={faLocationDot} className="text-volt-accent" />
                                        {engineer.location}
                                    </span>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default EngineersPage;
