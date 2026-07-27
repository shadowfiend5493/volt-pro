import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const ErrorPage = ({
    statusCode = '500',
    title = 'Something went wrong',
    message = 'The page could not be displayed. Please try again or return home.',
    error,
}) => (
    <section className="min-h-[calc(100vh-64px)] bg-volt-black px-[clamp(1.5rem,5vw,7rem)] py-16">
        <div className="mx-auto flex max-w-220 flex-col items-center text-center">
            <div className="mb-6 flex h-18 w-18 items-center justify-center rounded-2xl border border-red-500/40 bg-red-500/10 text-3xl text-red-300">
                <FontAwesomeIcon icon={faTriangleExclamation} />
            </div>
            <p className="mb-4 mt-0 text-[12px] font-semibold uppercase tracking-[3px] text-volt-accent">
                Error {statusCode}
            </p>
            <h1 className="mb-4 mt-0 text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-tight text-volt-text">
                {title}
            </h1>
            <p className="mb-8 max-w-160 text-[1.05rem] leading-8 text-volt-muted">
                {message}
            </p>

            {error && (
                <pre className="mb-8 w-full overflow-auto rounded-2xl border border-volt-border bg-volt-secondary p-5 text-left text-sm leading-6 text-red-200">
                    {error.message || String(error)}
                </pre>
            )}

            <div className="flex flex-wrap justify-center gap-3">
                <Link
                    to="/"
                    className="rounded-md bg-volt-accent px-5 py-3 text-sm font-bold uppercase tracking-[1.5px] text-volt-black no-underline transition hover:bg-volt-accent-hover"
                >
                    Back Home
                </Link>
                <Link
                    to="/contact"
                    className="rounded-md border border-volt-border px-5 py-3 text-sm font-bold uppercase tracking-[1.5px] text-volt-text no-underline transition hover:border-volt-accent hover:text-volt-accent"
                >
                    Contact Support
                </Link>
            </div>
        </div>
    </section>
);

export default ErrorPage;
