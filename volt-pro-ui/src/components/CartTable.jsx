import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../store/cart-store';

const formatPrice = (price) => new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
}).format(Number(price));

const CartTable = () => {
    const { cart, addToCart, removeFromCart, subtotal } = useCart();

    const updateCartQuantity = (productId, quantity) => {
        const product = cart.find((item) => item.productId === productId);
        const nextQuantity = Math.max(quantity, 1);

        if (product) {
            addToCart(product, nextQuantity - product.quantity);
        }
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-volt-border bg-volt-secondary">
            <div className="overflow-x-auto">
                <table className="w-full min-w-180 border-collapse text-left">
                    <thead className="border-b border-volt-border text-xs uppercase tracking-[2px] text-volt-accent">
                        <tr>
                            <th className="px-5 py-4">Product</th>
                            <th className="px-5 py-4">Quantity</th>
                            <th className="px-5 py-4">Price</th>
                            <th className="px-5 py-4">Total</th>
                            <th className="px-5 py-4">Remove</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-volt-border">
                        {cart.map((item) => (
                            <tr key={item.productId} className="text-volt-muted">
                                <td className="px-5 py-4">
                                    <Link
                                        to={`/products/${item.productId}`}
                                        className="flex items-center gap-4 text-volt-text no-underline hover:text-volt-accent"
                                    >
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="h-16 w-16 rounded-lg object-cover"
                                        />
                                        <span className="font-semibold">{item.name}</span>
                                    </Link>
                                </td>
                                <td className="px-5 py-4">
                                    <input
                                        type="number"
                                        inputMode="numeric"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(event) => updateCartQuantity(
                                            item.productId,
                                            Number.parseInt(event.target.value, 10) || 1,
                                        )}
                                        className="w-20 rounded-lg border border-volt-border bg-volt-black px-3 py-2 text-volt-text outline-none transition focus:border-volt-accent"
                                    />
                                </td>
                                <td className="px-5 py-4">{formatPrice(item.price)}</td>
                                <td className="px-5 py-4 font-semibold text-volt-text">
                                    {formatPrice(item.price * item.quantity)}
                                </td>
                                <td className="px-5 py-4">
                                    <button
                                        type="button"
                                        aria-label={`Remove ${item.name}`}
                                        className="flex h-10 w-10 items-center justify-center rounded-md border border-red-500/50 text-red-300 transition hover:bg-red-500/10"
                                        onClick={() => removeFromCart(item.productId)}
                                    >
                                        <FontAwesomeIcon icon={faXmark} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr className="text-volt-text">
                            <td className="px-5 py-5" colSpan="3"></td>
                            <td className="px-5 py-5 text-sm font-bold uppercase tracking-[2px]">
                                Subtotal
                            </td>
                            <td className="px-5 py-5 text-xl font-bold text-volt-accent">
                                {formatPrice(subtotal)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CartTable;
