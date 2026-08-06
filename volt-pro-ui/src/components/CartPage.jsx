import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import CartTable from './CartTable';
import { useCart } from '../store/cart-store';

const CartPage = () => {
    const { cart, clearCart } = useCart();
    const isCartEmpty = cart.length === 0;

    return (
        <section className="min-h-[calc(100vh-64px)] bg-volt-black px-[clamp(1.5rem,5vw,7rem)] py-16">
            <div className="mx-auto max-w-300">
                <div className="mb-10 max-w-180">
                    <p className="mb-4 mt-0 text-[12px] font-semibold uppercase tracking-[3px] text-volt-accent">
                        Cart
                    </p>
                    <h1 className="mb-4 mt-0 text-[clamp(2rem,5vw,3.5rem)] font-extrabold leading-tight text-volt-text">
                        Your selected VoltPro products.
                    </h1>
                    <p className="m-0 text-[1.05rem] leading-7 text-volt-muted">
                        Review product quantities before moving to checkout.
                    </p>
                </div>

                {isCartEmpty ? (
                    <div className="flex flex-col items-center rounded-3xl border border-volt-border bg-volt-secondary p-10 text-center">
                        <div className="mb-6 flex h-18 w-18 items-center justify-center rounded-2xl bg-volt-accent/15 text-3xl text-volt-accent">
                            <FontAwesomeIcon icon={faShoppingBag} />
                        </div>
                        <h2 className="mb-3 mt-0 text-2xl font-bold text-volt-text">
                            Your cart is empty
                        </h2>
                        <p className="mb-6 mt-0 max-w-120 leading-7 text-volt-muted">
                            Add products from the catalogue and they will appear here.
                        </p>
                        <Link
                            to="/products"
                            className="rounded-md bg-volt-accent px-5 py-3 text-sm font-bold uppercase tracking-[1.5px] text-volt-black no-underline transition hover:bg-volt-accent-hover"
                        >
                            Back to Products
                        </Link>
                    </div>
                ) : (
                    <>
                        <CartTable />
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-between">
                            <Link
                                to="/products"
                                className="rounded-md border border-volt-border px-5 py-3 text-center text-sm font-bold uppercase tracking-[1.5px] text-volt-text no-underline transition hover:border-volt-accent hover:text-volt-accent"
                            >
                                Back to Products
                            </Link>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <button
                                    type="button"
                                    className="rounded-md border border-red-500/50 px-5 py-3 text-sm font-bold uppercase tracking-[1.5px] text-red-300 transition hover:bg-red-500/10"
                                    onClick={clearCart}
                                >
                                    Clear Cart
                                </button>
                                <Link
                                    to="/checkout"
                                    className="rounded-md bg-volt-accent px-5 py-3 text-sm font-bold uppercase tracking-[1.5px] text-volt-black no-underline transition hover:bg-volt-accent-hover"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default CartPage;
