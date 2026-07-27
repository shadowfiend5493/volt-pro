import { useEffect, useMemo, useReducer } from 'react';
import { CartContext } from './cart-store';

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CLEAR_CART = 'CLEAR_CART';

const readStoredCart = () => {
    try {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
        return [];
    }
};

const cartReducer = (currentCart, action) => {
    switch (action.type) {
        case ADD_TO_CART: {
            const { product, quantity } = action.payload;
            const existingItem = currentCart.find((item) => item.productId === product.productId);

            if (existingItem) {
                return currentCart
                    .map((item) => (
                        item.productId === product.productId
                            ? { ...item, quantity: Math.max(item.quantity + quantity, 0) }
                            : item
                    ))
                    .filter((item) => item.quantity > 0);
            }

            return quantity > 0 ? [...currentCart, { ...product, quantity }] : currentCart;
        }
        case REMOVE_FROM_CART:
            return currentCart.filter((item) => item.productId !== action.payload.productId);
        case CLEAR_CART:
            return [];
        default:
            return currentCart;
    }
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, undefined, readStoredCart);

    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.error('Failed to save cart to localStorage:', error);
        }
    }, [cart]);

    const cartValue = useMemo(() => {
        const addToCart = (product, quantity = 1) => {
            dispatch({
                type: ADD_TO_CART,
                payload: {
                    product: {
                        productId: product.productId,
                        name: product.name,
                        imageUrl: product.imageUrl,
                        price: Number(product.price),
                    },
                    quantity,
                },
            });
        };

        const removeFromCart = (productId) => {
            dispatch({ type: REMOVE_FROM_CART, payload: { productId } });
        };

        const clearCart = () => {
            dispatch({ type: CLEAR_CART });
        };

        const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
        const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

        return {
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            totalQuantity,
            subtotal,
        };
    }, [cart]);

    return (
        <CartContext.Provider value={cartValue}>
            {children}
        </CartContext.Provider>
    );
};
