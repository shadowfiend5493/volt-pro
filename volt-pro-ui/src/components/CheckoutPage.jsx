import { Link } from 'react-router-dom';
import { useCart } from '../store/cart-store';

const formatPrice = (price) => new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
}).format(Number(price));

const CheckoutPage = () => {
    const { cart, subtotal } = useCart();
    const isCartEmpty = cart.length === 0;

    return (
        <section className="min-h-[calc(100vh-64px)] bg-volt-black px-[clamp(1.5rem,5vw,7rem)] py-16">
            <div className="mx-auto max-w-220 rounded-3xl border border-volt-border bg-volt-secondary p-8">
                <p className="mb-4 mt-0 text-[12px] font-semibold uppercase tracking-[3px] text-volt-accent">
                    Checkout
                </p>
                <h1 className="mb-4 mt-0 text-4xl font-extrabold text-volt-text">
                    Secure checkout
                </h1>
                <p className="mb-6 text-volt-muted">
                    You are logged in and ready to continue with your VoltPro order.
                </p>

                {isCartEmpty ? (
                    <>
                        <p className="mb-6 text-volt-muted">
                            Your cart is empty. Add products before continuing checkout.
                        </p>
                        <Link
                            to="/products"
                            className="inline-block rounded-md bg-volt-accent px-5 py-3 text-sm font-bold uppercase tracking-[1.5px] text-volt-black no-underline transition hover:bg-volt-accent-hover"
                        >
                            Back to Products
                        </Link>
                    </>
                ) : (
                    <div className="rounded-2xl border border-volt-border bg-volt-black p-5">
                        <span className="block text-sm uppercase tracking-[2px] text-volt-muted">Order subtotal</span>
                        <strong className="text-3xl text-volt-accent">{formatPrice(subtotal)}</strong>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CheckoutPage;
