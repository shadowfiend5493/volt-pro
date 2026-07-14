import axios from 'axios';

// All API calls should use this client so future headers, auth, and timeouts are configured once.
const apiClient = axios.create({
    // Components call paths like /v1/engineers; this baseURL prefixes them with /api.
    baseURL: '/api',
    // A timeout prevents the UI from waiting forever if the backend is unavailable.
    timeout: 10000,
});

export default apiClient;
