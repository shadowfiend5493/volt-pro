import axios from 'axios';
import { AUTH_LOGOUT_EVENT, clearStoredAuth, getStoredJwtToken } from '../store/auth-store';

// All API calls should use this client so future headers, auth, and timeouts are configured once.
const apiClient = axios.create({
    // Components call paths like /v1/engineers; this baseURL prefixes them with /api.
    baseURL: '/api',
    // A timeout prevents the UI from waiting forever if the backend is unavailable.
    timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
    const jwtToken = getStoredJwtToken();

    if (jwtToken) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${jwtToken}`;
    }

    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            clearStoredAuth();
            window.dispatchEvent(new Event(AUTH_LOGOUT_EVENT));
        }

        return Promise.reject(error);
    },
);

export default apiClient;
