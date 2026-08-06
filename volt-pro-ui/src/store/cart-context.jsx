import { useEffect, useMemo, useReducer } from 'react';
import { CartContext } from './cart-store';

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const CLEAR_CART = 'CLEAR_CART';
const LEGACY_CART_KEY = 'cart';
const CART_STORAGE_PREFIX = 'voltpro-cart:';

const getCartStorageKey = (userEmail) => (
    userEmail ? `${CART_STORAGE_PREFIX}${userEmail}` : null
);

const readStoredCart = (userEmail) => {
    const storageKey = getCartStorageKey(userEmail);

    if (!storageKey) {
        return [];
    }

    try {
        const storedCart = localStorage.getItem(storageKey);
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

export const CartProvider = ({ children, userEmail = null }) => {
    const [cart, dispatch] = useReducer(
        cartReducer,
        undefined,
        () => {
            localStorage.removeItem(LEGACY_CART_KEY);
            return readStoredCart(userEmail);
        },
    );

    useEffect(() => {
        const storageKey = getCartStorageKey(userEmail);

        if (!storageKey) {
            return;
        }

        try {
            localStorage.setItem(storageKey, JSON.stringify(cart));
        } catch (error) {
            console.error('Failed to save cart to localStorage:', error);
        }
    }, [cart, userEmail]);

    const cartValue = useMemo(() => {
        const addToCart = (product, quantity = 1) => {
            if (!userEmail) {
                return false;
            }

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

            return true;
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
            isCartReady: Boolean(userEmail),
        };
    }, [cart, userEmail]);

    return (
        <CartContext.Provider value={cartValue}>
            {children}
        </CartContext.Provider>
    );
};
