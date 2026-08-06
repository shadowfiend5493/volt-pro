import { createContext, useContext } from 'react';

export const AUTH_STORAGE_KEY = 'voltpro-auth';
export const AUTH_LOGOUT_EVENT = 'voltpro-auth-logout';

export const AuthContext = createContext(null);

export const readStoredAuth = () => {
    try {
        const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
        return storedAuth ? JSON.parse(storedAuth) : null;
    } catch (error) {
        console.error('Failed to parse auth state from localStorage:', error);
        return null;
    }
};

export const getStoredJwtToken = () => readStoredAuth()?.jwtToken ?? null;

export const clearStoredAuth = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }

    return context;
};
