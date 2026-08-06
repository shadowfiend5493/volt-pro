import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient';
import { useAuth } from '../store/auth-store';

const INITIAL_FORM = {
    name: '',
    email: '',
    mobileNumber: '',
    password: '',
};

const LoginPage = () => {
    const [mode, setMode] = useState('login');
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [message, setMessage] = useState('');
    const [isSubmitting, setSubmitting] = useState(false);
    const { loginSuccess } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const isSignup = mode === 'signup';
    const redirectPath = location.state?.from?.pathname ?? '/account';

    const handleModeChange = (nextMode) => {
        setMode(nextMode);
        setFormData(INITIAL_FORM);
        setMessage('');
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        // Controlled inputs keep the form values predictable while the user types.
        setFormData((currentFormData) => ({
            ...currentFormData,
            [name]: value,
        }));
    };

    const handleMobileInvalid = (event) => {
        event.target.setCustomValidity('Mobile number should be 10 digits.');
    };

    const handleMobileChange = (event) => {
        event.target.setCustomValidity('');
        handleChange(event);
    };

    const fillDemoCredentials = (email) => {
        setMode('login');
        setMessage('');
        setFormData({
            name: '',
            email,
            mobileNumber: '',
            password: 'Password@123',
        });
    };

    const login = async (email, password) => {
        const response = await apiClient.post('/v1/auth/login', { email, password });
        loginSuccess(response.data.jwtToken, response.data.user);
        navigate(redirectPath, { replace: true });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setMessage('');

        try {
            if (isSignup) {
                await apiClient.post('/v1/auth/register', formData);
                await login(formData.email, formData.password);
                return;
            }

            await login(formData.email, formData.password);
        } catch (error) {
            const fieldErrors = error.response?.data?.fieldErrors;
            const validationMessages = fieldErrors
                ? Object.values(fieldErrors).filter(Boolean)
                : [];
            const apiMessage = error.response?.data?.message;

            setMessage(
                validationMessages.length > 0
                    ? validationMessages.join(' ')
                    : (apiMessage || 'Authentication failed. Please try again.'),
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="min-h-[calc(100vh-64px)] bg-volt-black px-[clamp(1.5rem,5vw,7rem)] py-16">
            <div className="mx-auto grid max-w-300 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                    <p className="mb-4 mt-0 text-[12px] font-semibold uppercase tracking-[3px] text-volt-accent">
                        Account Access
                    </p>
                    <h1 className="mb-5 mt-0 text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-tight text-volt-text">
                        Sign in to manage your VoltPro work.
                    </h1>
                    <p className="mb-8 text-[1.08rem] leading-8 text-volt-muted">
                        Use the login form for returning users, or switch to signup when a new customer wants to create an account.
                    </p>

                    <div className="mb-8 rounded-2xl border border-volt-border bg-volt-secondary p-5">
                        <h2 className="mb-3 mt-0 text-lg font-bold text-volt-text">
                            Demo accounts
                        </h2>
                        <p className="mb-4 mt-0 leading-7 text-volt-muted">
                            Use these to check user and admin route differences.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <button
                                type="button"
                                className="rounded-md border border-volt-accent px-4 py-2 text-sm font-bold text-volt-accent transition hover:bg-volt-accent hover:text-volt-black"
                                onClick={() => fillDemoCredentials('user@voltpro.com')}
                            >
                                Fill User Login
                            </button>
                            <button
                                type="button"
                                className="rounded-md border border-volt-accent px-4 py-2 text-sm font-bold text-volt-accent transition hover:bg-volt-accent hover:text-volt-black"
                                onClick={() => fillDemoCredentials('admin@voltpro.com')}
                            >
                                Fill Admin Login
                            </button>
                        </div>
                    </div>

                </div>

                <form
                    className="rounded-3xl border border-volt-border bg-volt-secondary p-6 shadow-[0_18px_70px_rgba(0,0,0,0.2)] md:p-8"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                >
                    <div className="mb-6 grid grid-cols-2 rounded-xl border border-volt-border bg-volt-black p-1">
                        <button
                            type="button"
                            className={`rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-[1.5px] transition ${
                                !isSignup ? 'bg-volt-accent text-volt-black' : 'text-volt-muted hover:text-volt-accent'
                            }`}
                            onClick={() => handleModeChange('login')}
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className={`rounded-lg px-4 py-3 text-sm font-bold uppercase tracking-[1.5px] transition ${
                                isSignup ? 'bg-volt-accent text-volt-black' : 'text-volt-muted hover:text-volt-accent'
                            }`}
                            onClick={() => handleModeChange('signup')}
                        >
                            Sign Up
                        </button>
                    </div>

                    <h2 className="mb-2 mt-0 text-2xl font-bold text-volt-text">
                        {isSignup ? 'Create your account' : 'Welcome back'}
                    </h2>
                    <p className="mb-6 mt-0 text-volt-muted">
                        {isSignup ? 'Enter your details to start signup.' : 'Enter your email and password to continue.'}
                    </p>

                    {isSignup && (
                        <label className="mb-5 flex flex-col gap-2 text-sm font-semibold text-volt-text">
                            Full Name
                            <input
                                className="rounded-lg border border-volt-border bg-volt-black px-4 py-3 text-base font-normal text-volt-text outline-none transition focus:border-volt-accent"
                                type="text"
                                name="name"
                                value={formData.name}
                                maxLength={100}
                                autoComplete="off"
                                onChange={handleChange}
                                required
                            />
                        </label>
                    )}

                    <label className="mb-5 flex flex-col gap-2 text-sm font-semibold text-volt-text">
                        Email
                        <input
                            className="rounded-lg border border-volt-border bg-volt-black px-4 py-3 text-base font-normal text-volt-text outline-none transition focus:border-volt-accent"
                            type="email"
                            name="email"
                            value={formData.email}
                            maxLength={100}
                            autoComplete="off"
                            onChange={handleChange}
                            required
                        />
                    </label>

                    {isSignup && (
                        <label className="mb-5 flex flex-col gap-2 text-sm font-semibold text-volt-text">
                            Mobile Number
                            <input
                                className="rounded-lg border border-volt-border bg-volt-black px-4 py-3 text-base font-normal text-volt-text outline-none transition focus:border-volt-accent"
                                type="tel"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                maxLength={10}
                                pattern="[0-9]{10}"
                                title="Mobile number should be 10 digits."
                                autoComplete="off"
                                onInvalid={handleMobileInvalid}
                                onChange={handleMobileChange}
                                required
                            />
                        </label>
                    )}

                    <label className="flex flex-col gap-2 text-sm font-semibold text-volt-text">
                        Password
                        <input
                            className="rounded-lg border border-volt-border bg-volt-black px-4 py-3 text-base font-normal text-volt-text outline-none transition focus:border-volt-accent"
                            type="password"
                            name="password"
                            value={formData.password}
                            minLength={8}
                            autoComplete="new-password"
                            onChange={handleChange}
                            required
                        />
                    </label>

                    {message && (
                        <div className="mt-5 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm font-semibold text-red-300">
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-6 w-full rounded-md bg-volt-accent px-5 py-3 text-sm font-bold uppercase tracking-[1.5px] text-volt-black transition hover:bg-volt-accent-hover"
                    >
                        {isSubmitting ? 'Please wait...' : (isSignup ? 'Create Account' : 'Login')}
                    </button>

                    <button
                        type="button"
                        className="mt-5 w-full border-0 bg-transparent text-sm font-semibold text-volt-muted underline-offset-4 hover:text-volt-accent hover:underline"
                        onClick={() => handleModeChange(isSignup ? 'login' : 'signup')}
                    >
                        {isSignup ? 'Already have an account? Login' : 'New to VoltPro? Sign up'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default LoginPage;
