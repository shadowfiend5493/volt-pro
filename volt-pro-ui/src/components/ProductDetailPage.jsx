import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../api/apiClient';
import { useCart } from '../store/cart-store';

const PRODUCT_IMAGE_FALLBACK = 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80';

const formatPrice = (price) => new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
}).format(Number(price));

const ProductDetailPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [added, setAdded] = useState(false);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await apiClient.get(`/v1/products/${productId}`);
                setProduct(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Unable to load this product right now.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        setAdded(true);
    };

    return (
        <section className="min-h-[calc(100vh-64px)] bg-volt-black px-[clamp(1.5rem,5vw,7rem)] py-16">
            <div className="mx-auto max-w-300">
                <Link
                    to="/products"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-volt-muted no-underline hover:text-volt-accent"
                >
                    <FontAwesomeIcon icon={faChevronLeft} />
                    Back to Products
                </Link>

                {loading && (
                    <div className="rounded-xl border border-volt-border bg-volt-secondary p-6 text-volt-muted">
                        Loading product...
                    </div>
                )}

                {!loading && error && (
                    <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-6 text-red-200">
                        {error}
                    </div>
                )}

                {!loading && !error && product && (
                    <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-full max-h-150 w-full rounded-3xl border border-volt-border object-cover shadow-[0_18px_70px_rgba(0,0,0,0.2)]"
                            onError={(event) => {
                                event.currentTarget.src = PRODUCT_IMAGE_FALLBACK;
                            }}
                        />

                        <div className="rounded-3xl border border-volt-border bg-volt-secondary p-6 md:p-8">
                            <p className="mb-4 mt-0 text-[12px] font-semibold uppercase tracking-[3px] text-volt-accent">
                                {product.category}
                            </p>
                            <h1 className="mb-5 mt-0 text-[clamp(2rem,5vw,4rem)] font-extrabold leading-tight text-volt-text">
                                {product.name}
                            </h1>
                            <p className="mb-8 text-[1.05rem] leading-8 text-volt-muted">
                                {product.description}
                            </p>

                            <div className="mb-8 grid gap-4 sm:grid-cols-3">
                                <div className="rounded-2xl border border-volt-border bg-volt-black p-4">
                                    <p className="m-0 text-xs uppercase tracking-[2px] text-volt-muted">Price</p>
                                    <p className="mb-0 mt-2 text-2xl font-bold text-volt-text">
                                        {formatPrice(product.price)}
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-volt-border bg-volt-black p-4">
                                    <p className="m-0 text-xs uppercase tracking-[2px] text-volt-muted">Stock</p>
                                    <p className="mb-0 mt-2 text-2xl font-bold text-volt-text">
                                        {product.stockQuantity}
                                    </p>
                                </div>
                                <div className="rounded-2xl border border-volt-border bg-volt-black p-4">
                                    <p className="m-0 text-xs uppercase tracking-[2px] text-volt-muted">Type</p>
                                    <p className="mb-0 mt-2 text-lg font-bold text-volt-text">
                                        B2B Product
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                                <label className="flex flex-col gap-2 text-sm font-semibold text-volt-text">
                                    Quantity
                                    <input
                                        type="number"
                                        min="1"
                                        max={product.stockQuantity}
                                        value={quantity}
                                        onChange={(event) => {
                                            const requestedQuantity = Number(event.target.value) || 1;
                                            setQuantity(Math.min(Math.max(requestedQuantity, 1), product.stockQuantity));
                                        }}
                                        className="w-28 rounded-lg border border-volt-border bg-volt-black px-4 py-3 text-base font-normal text-volt-text outline-none transition focus:border-volt-accent"
                                    />
                                </label>

                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center gap-2 rounded-md bg-volt-accent px-5 py-3 text-sm font-bold uppercase tracking-[1.5px] text-volt-black transition hover:bg-volt-accent-hover"
                                    onClick={handleAddToCart}
                                >
                                    <FontAwesomeIcon icon={faCartPlus} />
                                    {added ? 'Added to Cart' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductDetailPage;
