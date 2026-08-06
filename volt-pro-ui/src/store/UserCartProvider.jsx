import { useAuth } from './auth-store';
import { CartProvider } from './cart-context';

// Remounts cart state whenever the logged-in user changes so each account keeps its own cart.
export const UserCartProvider = ({ children }) => {
    const { user } = useAuth();
    const userEmail = user?.email ?? null;

    return (
        <CartProvider key={userEmail ?? 'guest'} userEmail={userEmail}>
            {children}
        </CartProvider>
    );
};
