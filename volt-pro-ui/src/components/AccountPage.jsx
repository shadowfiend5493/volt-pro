import { useEffect, useState } from 'react';
import apiClient from '../api/apiClient';
import { useAuth } from '../store/auth-store';

const AccountPage = () => {
    const { user } = useAuth();
    const [serverUser, setServerUser] = useState(user);
    const [message, setMessage] = useState('');

    useEffect(() => {
        let ignoreResponse = false;

        const loadCurrentUser = async () => {
            try {
                const response = await apiClient.get('/v1/account/me');
                if (!ignoreResponse) {
                    setServerUser(response.data);
                    setMessage('User access verified from the secured backend.');
                }
            } catch (error) {
                if (!ignoreResponse) {
                    setMessage(error.response?.data?.message ?? 'Unable to verify user access.');
                }
            }
        };

        loadCurrentUser();

        return () => {
            ignoreResponse = true;
        };
    }, []);

    return (
        <section className="min-h-[calc(100vh-64px)] bg-volt-black px-[clamp(1.5rem,5vw,7rem)] py-16">
            <div className="mx-auto max-w-220 rounded-3xl border border-volt-border bg-volt-secondary p-8">
                <p className="mb-4 mt-0 text-[12px] font-semibold uppercase tracking-[3px] text-volt-accent">
                    User Dashboard
                </p>
                <h1 className="mb-4 mt-0 text-4xl font-extrabold text-volt-text">
                    Welcome, {serverUser?.name ?? 'VoltPro user'}
                </h1>
                <p className="mb-6 text-volt-muted">
                    This page is available to any authenticated user.
                </p>

                <div className="grid gap-4 text-volt-text sm:grid-cols-2">
                    <div className="rounded-2xl border border-volt-border bg-volt-black p-5">
                        <span className="block text-sm uppercase tracking-[2px] text-volt-muted">Email</span>
                        <strong>{serverUser?.email}</strong>
                    </div>
                    <div className="rounded-2xl border border-volt-border bg-volt-black p-5">
                        <span className="block text-sm uppercase tracking-[2px] text-volt-muted">Roles</span>
                        <strong>{serverUser?.roles?.join(', ')}</strong>
                    </div>
                </div>

                {message && (
                    <div className="mt-6 rounded-xl border border-volt-accent/40 bg-volt-accent/10 p-4 text-sm font-semibold text-volt-accent">
                        {message}
                    </div>
                )}
            </div>
        </section>
    );
};

export default AccountPage;
