import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../api/apiClient';
import Dropdown from './common/Dropdown';
import SearchBox from './common/SearchBox';
import { useAuth } from '../store/auth-store';
import { useCart } from '../store/cart-store';

const PRODUCTS_API_URL = '/v1/products';
const PRODUCTS_PER_PAGE = 6;
const PRODUCT_IMAGE_FALLBACK = 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80';
const SORT_OPTIONS = [
    { label: 'Name A-Z', value: 'name-asc' },
    { label: 'Name Z-A', value: 'name-desc' },
    { label: 'Price Low-High', value: 'price-asc' },
    { label: 'Price High-Low', value: 'price-desc' },
    { label: 'Stock High-Low', value: 'stock-desc' },
    { label: 'Category A-Z', value: 'category-asc' },
];

const formatPrice = (price) => new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
}).format(Number(price));

const sortProducts = (products, sortOption) => {
    const sortedProducts = [...products];

    switch (sortOption) {
        case 'name-desc':
            return sortedProducts.sort((first, second) => second.name.localeCompare(first.name));
        case 'price-asc':
            return sortedProducts.sort((first, second) => Number(first.price) - Number(second.price));
        case 'price-desc':
            return sortedProducts.sort((first, second) => Number(second.price) - Number(first.price));
        case 'stock-desc':
            return sortedProducts.sort((first, second) => second.stockQuantity - first.stockQuantity);
        case 'category-asc':
            return sortedProducts.sort((first, second) => first.category.localeCompare(second.category));
        case 'name-asc':
        default:
            return sortedProducts.sort((first, second) => first.name.localeCompare(second.name));
    }
};

const PaginationControls = ({ currentPage, totalPages, onPageChange }) => {
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

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [addedProductId, setAddedProductId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState(SORT_OPTIONS[0].value);
    const [currentPage, setCurrentPage] = useState(1);
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await apiClient.get(PRODUCTS_API_URL);
                setProducts(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Unable to load products right now.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: { pathname: '/products' } } });
            return;
        }

        addToCart(product, 1);
        setAddedProductId(product.productId);
    };

    const displayedProducts = useMemo(() => {
        const normalizedSearchTerm = searchTerm.trim().toLowerCase();
        const filteredProducts = normalizedSearchTerm
            ? products.filter((product) =>
                [product.name, product.category, product.description]
                    .some((value) => value.toLowerCase().includes(normalizedSearchTerm))
            )
            : products;

        return sortProducts(filteredProducts, sortOption);
    }, [products, searchTerm, sortOption]);

    const totalPages = Math.max(1, Math.ceil(displayedProducts.length / PRODUCTS_PER_PAGE));
    const visiblePage = Math.min(currentPage, totalPages);
    const paginatedProducts = useMemo(() => {
        const startIndex = (visiblePage - 1) * PRODUCTS_PER_PAGE;

        return displayedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
    }, [displayedProducts, visiblePage]);

    const handleSearch = (value) => {
        setSearchTerm(value);
        setCurrentPage(1);
    };

    const handleSort = (value) => {
        setSortOption(value);
        setCurrentPage(1);
    };

    return (
        <section className="min-h-[calc(100vh-64px)] bg-volt-black px-[clamp(1.5rem,5vw,7rem)] py-16">
            <div className="mx-auto max-w-300">
                <div className="mb-10 max-w-180">
                    <p className="mb-4 mt-0 text-[12px] font-semibold uppercase tracking-[3px] text-volt-accent">
                        Products
                    </p>
                    <h1 className="mb-4 mt-0 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight text-volt-text">
                        Electrical products ready for your project cart.
                    </h1>
                    <p className="m-0 text-[1.05rem] leading-7 text-volt-muted">
                        Browse practical electrical products, view details, and add items to your cart.
                    </p>
                </div>

                {loading && (
                    <div className="rounded-xl border border-volt-border bg-volt-secondary p-6 text-volt-muted">
                        Loading products...
                    </div>
                )}

                {!loading && error && (
                    <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-6 text-red-200">
                        {error}
                    </div>
                )}

                {!loading && !error && products.length === 0 && (
                    <div className="rounded-xl border border-volt-border bg-volt-secondary p-6 text-volt-muted">
                        No products are available yet.
                    </div>
                )}

                {!loading && !error && products.length > 0 && (
                    <>
                        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-volt-border bg-volt-secondary p-5 md:flex-row md:items-center md:justify-between">
                            <SearchBox
                                label="Search"
                                placeholder="Search by name, category, or description"
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

                        {displayedProducts.length === 0 ? (
                            <div className="rounded-xl border border-volt-border bg-volt-secondary p-6 text-volt-muted">
                                No products match your search.
                            </div>
                        ) : (
                            <>
                                <div className="mb-4 text-sm text-volt-muted">
                                    Showing {(visiblePage - 1) * PRODUCTS_PER_PAGE + 1}-
                                    {Math.min(visiblePage * PRODUCTS_PER_PAGE, displayedProducts.length)} of {displayedProducts.length} products
                                </div>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                    {paginatedProducts.map((product) => (
                                        <article
                                            key={product.productId}
                                            className="overflow-hidden rounded-2xl border border-volt-border bg-volt-secondary shadow-[0_18px_60px_rgba(0,0,0,0.18)] transition hover:-translate-y-1 hover:border-volt-accent/70"
                                        >
                                            <Link
                                                to={`/products/${product.productId}`}
                                                className="block text-volt-text no-underline"
                                            >
                                                <img
                                                    src={product.imageUrl}
                                                    alt={product.name}
                                                    className="h-56 w-full object-cover"
                                                    onError={(event) => {
                                                        event.currentTarget.src = PRODUCT_IMAGE_FALLBACK;
                                                    }}
                                                />
                                            </Link>
                                            <div className="p-6">
                                                <div className="mb-4 flex items-start justify-between gap-4">
                                                    <div>
                                                        <p className="mb-2 mt-0 text-xs font-semibold uppercase tracking-[2px] text-volt-accent">
                                                            {product.category}
                                                        </p>
                                                        <Link
                                                            to={`/products/${product.productId}`}
                                                            className="text-xl font-bold text-volt-text no-underline hover:text-volt-accent"
                                                        >
                                                            {product.name}
                                                        </Link>
                                                    </div>
                                                    <span className="shrink-0 whitespace-nowrap rounded-full border border-volt-border px-3 py-1 text-xs font-semibold text-volt-muted">
                                                        {product.stockQuantity} left
                                                    </span>
                                                </div>

                                                <p className="mb-6 line-clamp-3 min-h-21 leading-7 text-volt-muted">
                                                    {product.description}
                                                </p>

                                                <div className="flex items-center justify-between gap-4">
                                                    <span className="text-2xl font-bold text-volt-text">
                                                        {formatPrice(product.price)}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        className="inline-flex items-center gap-2 rounded-md bg-volt-accent px-4 py-2 text-sm font-bold text-volt-black transition hover:bg-volt-accent-hover"
                                                        onClick={() => handleAddToCart(product)}
                                                    >
                                                        <FontAwesomeIcon icon={faCartPlus} />
                                                        {addedProductId === product.productId ? 'Added' : 'Add'}
                                                    </button>
                                                </div>
                                            </div>
                                        </article>
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

export default ProductsPage;
