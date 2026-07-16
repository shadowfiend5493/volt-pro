import { useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faStar as faSolidStar, faUserGear } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import apiClient from '../api/apiClient';
import Dropdown from './common/Dropdown';
import SearchBox from './common/SearchBox';

const ENGINEERS_API_URL = '/v1/engineers';
const ENGINEERS_PER_PAGE = 6;
const SORT_OPTIONS = [
    { label: 'Name A-Z', value: 'name-asc' },
    { label: 'Name Z-A', value: 'name-desc' },
    { label: 'Rating High-Low', value: 'rating-desc' },
    { label: 'Rating Low-High', value: 'rating-asc' },
    { label: 'Location A-Z', value: 'location-asc' },
];

const sortEngineers = (engineers, sortOption) => {
    // Copy before sorting so React state is never mutated directly.
    const sortedEngineers = [...engineers];

    switch (sortOption) {
        case 'name-desc':
            return sortedEngineers.sort((first, second) => second.name.localeCompare(first.name));
        case 'rating-desc':
            return sortedEngineers.sort((first, second) => second.rating - first.rating);
        case 'rating-asc':
            return sortedEngineers.sort((first, second) => first.rating - second.rating);
        case 'location-asc':
            return sortedEngineers.sort((first, second) => first.location.localeCompare(second.location));
        case 'name-asc':
        default:
            return sortedEngineers.sort((first, second) => first.name.localeCompare(second.name));
    }
};

const StarRating = ({ rating }) => (
    <div className="flex items-center gap-1 text-sm" aria-label={`${rating.toFixed(1)} out of 5 rating`}>
        {Array.from({ length: 5 }, (_, index) => {
            const starValue = index + 1;
            // Decimal ratings fill each star by percentage, e.g. 4.7 fills 70% of the fifth star.
            const fillPercentage = Math.min(Math.max(rating - index, 0), 1) * 100;

            return (
                <span key={`rating-star-${starValue}`} className="relative inline-flex text-volt-muted/50">
                    <FontAwesomeIcon icon={faRegularStar} />
                    <span
                        className="absolute inset-0 overflow-hidden text-volt-accent"
                        style={{ width: `${fillPercentage}%` }}
                        aria-hidden="true"
                    >
                        <FontAwesomeIcon icon={faSolidStar} />
                    </span>
                </span>
            );
        })}
        <span className="ml-2 text-volt-muted">{rating.toFixed(1)}/5</span>
    </div>
);

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
    // Build page numbers from the total so pagination stays data-driven.
    const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-volt-border bg-volt-secondary p-4 sm:flex-row">
            <button
                type="button"
                className="rounded-md border border-volt-border px-4 py-2 text-sm font-semibold text-volt-text transition hover:border-volt-accent hover:text-volt-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-volt-border disabled:hover:text-volt-text"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </button>

            <div className="flex flex-wrap justify-center gap-2">
                {pages.map((page) => (
                    <button
                        type="button"
                        key={page}
                        className={`h-9 w-9 rounded-md border text-sm font-semibold transition ${
                            page === currentPage
                                ? 'border-volt-accent bg-volt-accent text-volt-black'
                                : 'border-volt-border text-volt-muted hover:border-volt-accent hover:text-volt-accent'
                        }`}
                        onClick={() => onPageChange(page)}
                        aria-current={page === currentPage ? 'page' : undefined}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                type="button"
                className="rounded-md border border-volt-border px-4 py-2 text-sm font-semibold text-volt-text transition hover:border-volt-accent hover:text-volt-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-volt-border disabled:hover:text-volt-text"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};

const EngineerCard = ({ engineer }) => (
    <article className="overflow-hidden rounded-2xl border border-volt-border bg-volt-secondary shadow-[0_18px_60px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-1 hover:border-volt-accent/70">
        <img
            src={engineer.photoUrl}
            alt={`${engineer.name}, ${engineer.role}`}
            className="h-56 w-full object-cover"
        />
        <div className="p-6">
            <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                    <h2 className="mb-2 mt-0 text-xl font-bold text-volt-text">
                        {engineer.name}
                    </h2>
                    <p className="m-0 text-volt-muted">
                        {engineer.role}
                    </p>
                </div>
                <StarRating rating={engineer.rating} />
            </div>
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
        </div>
    </article>
);

const EngineersPage = () => {
    // API state controls the four page states: loading, error, empty, and content.
    const [engineers, setEngineers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    // UI state controls what the user is currently searching, sorting, and viewing.
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState(SORT_OPTIONS[0].value);
    const [currentPage, setCurrentPage] = useState(1);

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

    const displayedEngineers = useMemo(() => {
        const normalizedSearchTerm = searchTerm.trim().toLowerCase();
        // Search checks the fields visible on each card so results match what users can scan.
        const filteredEngineers = normalizedSearchTerm
            ? engineers.filter((engineer) =>
                [engineer.name, engineer.role, engineer.location]
                    .some((value) => value.toLowerCase().includes(normalizedSearchTerm))
            )
            : engineers;

        return sortEngineers(filteredEngineers, sortOption);
    }, [engineers, searchTerm, sortOption]);

    const totalPages = Math.max(1, Math.ceil(displayedEngineers.length / ENGINEERS_PER_PAGE));
    // Clamp the visible page in case filtering reduces the number of available pages.
    const visiblePage = Math.min(currentPage, totalPages);

    const paginatedEngineers = useMemo(() => {
        // Pagination happens after filtering and sorting so each page follows the active controls.
        const startIndex = (visiblePage - 1) * ENGINEERS_PER_PAGE;

        return displayedEngineers.slice(startIndex, startIndex + ENGINEERS_PER_PAGE);
    }, [displayedEngineers, visiblePage]);

    const handleSearch = (value) => {
        setSearchTerm(value);
        // Start from the first page whenever the result set changes.
        setCurrentPage(1);
    };

    const handleSort = (value) => {
        setSortOption(value);
        // Sorting can move items across pages, so reset to the top of the sorted list.
        setCurrentPage(1);
    };

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
                    <>
                        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-volt-border bg-volt-secondary p-5 md:flex-row md:items-center md:justify-between">
                            <SearchBox
                                label="Search"
                                placeholder="Search by name, role, or location"
                                value={searchTerm}
                                handleSearch={handleSearch}
                            />
                            <Dropdown
                                label="Sort by"
                                options={SORT_OPTIONS}
                                selectedValue={sortOption}
                                handleSort={handleSort}
                            />
                        </div>

                        {displayedEngineers.length === 0 ? (
                            <div className="rounded-xl border border-volt-border bg-volt-secondary p-6 text-volt-muted">
                                No engineers match your search.
                            </div>
                        ) : (
                            <>
                                <div className="mb-4 text-sm text-volt-muted">
                                    Showing {(visiblePage - 1) * ENGINEERS_PER_PAGE + 1}-
                                    {Math.min(visiblePage * ENGINEERS_PER_PAGE, displayedEngineers.length)} of {displayedEngineers.length} engineers
                                </div>
                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                                    {paginatedEngineers.map((engineer) => (
                                        <EngineerCard key={engineer.id} engineer={engineer} />
                                    ))}
                                </div>
                                {totalPages > 1 && (
                                    <PaginationControls
                                        currentPage={visiblePage}
                                        totalPages={totalPages}
                                        onPageChange={setCurrentPage}
                                    />
                                )}
                            </>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default EngineersPage;
