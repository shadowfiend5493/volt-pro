import { useEffect, useMemo, useReducer } from 'react';
import {
    AUTH_LOGOUT_EVENT,
    AUTH_STORAGE_KEY,
    AuthContext,
    clearStoredAuth,
    readStoredAuth,
} from './auth-store';

const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';

const initialAuthState = () => {
    const storedAuth = readStoredAuth();

    return {
        jwtToken: storedAuth?.jwtToken ?? null,
        user: storedAuth?.user ?? null,
        isAuthenticated: Boolean(storedAuth?.jwtToken && storedAuth?.user),
    };
};

const authReducer = (currentState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                jwtToken: action.payload.jwtToken,
                user: action.payload.user,
                isAuthenticated: true,
            };
        case LOGOUT:
            return {
                jwtToken: null,
                user: null,
                isAuthenticated: false,
            };
        default:
            return currentState;
    }
};

export const AuthProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, undefined, initialAuthState);

    useEffect(() => {
        try {
            if (authState.isAuthenticated) {
                localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
                    jwtToken: authState.jwtToken,
                    user: authState.user,
                }));
            } else {
                clearStoredAuth();
            }
        } catch (error) {
            console.error('Failed to save auth state to localStorage:', error);
        }
    }, [authState]);

    useEffect(() => {
        const handleExternalLogout = () => {
            dispatch({ type: LOGOUT });
        };

        window.addEventListener(AUTH_LOGOUT_EVENT, handleExternalLogout);
        return () => window.removeEventListener(AUTH_LOGOUT_EVENT, handleExternalLogout);
    }, []);

    const authValue = useMemo(() => {
        const loginSuccess = (jwtToken, user) => {
            dispatch({ type: LOGIN_SUCCESS, payload: { jwtToken, user } });
        };

        const logout = () => {
            dispatch({ type: LOGOUT });
        };

        const hasRole = (role) => authState.user?.roles?.includes(role) ?? false;

        return {
            jwtToken: authState.jwtToken,
            user: authState.user,
            isAuthenticated: authState.isAuthenticated,
            loginSuccess,
            logout,
            hasRole,
        };
    }, [authState]);

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};
