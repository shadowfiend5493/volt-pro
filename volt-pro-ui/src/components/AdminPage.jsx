import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';

const AdminPage = () => {
    const [message, setMessage] = useState('Checking admin access...');

    useEffect(() => {
        let ignoreResponse = false;

        const verifyAdminAccess = async () => {
            try {
                const response = await apiClient.get('/v1/admin/overview');
                if (!ignoreResponse) {
                    setMessage(response.data.message);
                }
            } catch (error) {
                if (!ignoreResponse) {
                    setMessage(error.response?.data?.message ?? 'Unable to verify admin access.');
                }
            }
        };

        verifyAdminAccess();

        return () => {
            ignoreResponse = true;
        };
    }, []);

    return (
        <section className="min-h-[calc(100vh-64px)] bg-volt-black px-[clamp(1.5rem,5vw,7rem)] py-16">
            <div className="mx-auto max-w-220 rounded-3xl border border-volt-border bg-volt-secondary p-8">
                <p className="mb-4 mt-0 text-[12px] font-semibold uppercase tracking-[3px] text-volt-accent">
                    Admin Dashboard
                </p>
                <h1 className="mb-4 mt-0 text-4xl font-extrabold text-volt-text">
                    Admin-only area
                </h1>
                <p className="mb-6 text-volt-muted">
                    This route is visible only when the logged-in user has the ADMIN role.
                </p>
                <div className="rounded-xl border border-volt-accent/40 bg-volt-accent/10 p-4 text-sm font-semibold text-volt-accent">
                    {message}
                </div>
            </div>
        </section>
    );
};

export default AdminPage;
