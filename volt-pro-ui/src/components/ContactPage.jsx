import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import apiClient from '../api/apiClient';

const CONTACT_API_URL = '/v1/contacts';
const INITIAL_FORM = {
    name: '',
    email: '',
    mobileNumber: '',
    message: '',
};

const CONTACT_DETAILS = [
    { icon: faEnvelope, label: 'Email', value: 'support@voltpro.example' },
    { icon: faPhone, label: 'Phone', value: '+44 020 0000 0000' },
    { icon: faLocationDot, label: 'Location', value: 'London, United Kingdom' },
];

const FieldError = ({ message }) => (
    message ? <span className="text-xs font-semibold text-red-300">{message}</span> : null
);

const ContactPage = () => {
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [submitting, setSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        // Controlled inputs keep React state as the source of truth for every field.
        setFormData((currentFormData) => ({
            ...currentFormData,
            [name]: value,
        }));
        setFieldErrors((currentFieldErrors) => ({
            ...currentFieldErrors,
            [name]: '',
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitting(true);
        setSuccessMessage('');
        setErrorMessage('');
        setFieldErrors({});

        try {
            const response = await apiClient.post(CONTACT_API_URL, {
                name: formData.name.trim(),
                email: formData.email.trim(),
                mobileNumber: formData.mobileNumber.trim(),
                message: formData.message.trim(),
            });

            setSuccessMessage(response.data.message);
            setFormData(INITIAL_FORM);
        } catch (err) {
            const apiError = err.response?.data;

            setErrorMessage(apiError?.message || 'Unable to send your message right now.');
            setFieldErrors(apiError?.fieldErrors || {});
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="min-h-[calc(100vh-64px)] bg-volt-black px-[clamp(1.5rem,5vw,7rem)] py-16">
            <div className="mx-auto grid max-w-300 gap-10 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                    <p className="mb-4 mt-0 text-[12px] font-semibold uppercase tracking-[3px] text-volt-accent">
                        Contact Us
                    </p>
                    <h1 className="mb-5 mt-0 text-[clamp(2.2rem,5vw,4.2rem)] font-extrabold leading-tight text-volt-text">
                        Tell us what electrical support you need.
                    </h1>
                    <p className="mb-8 text-[1.08rem] leading-8 text-volt-muted">
                        Send your project details and the VoltPro team will route the request to the right support path.
                    </p>

                    <div className="grid gap-4">
                        {CONTACT_DETAILS.map((detail) => (
                            <div
                                key={detail.label}
                                className="flex items-center gap-4 rounded-2xl border border-volt-border bg-volt-secondary p-5"
                            >
                                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-volt-accent/15 text-volt-accent">
                                    <FontAwesomeIcon icon={detail.icon} />
                                </span>
                                <div>
                                    <p className="m-0 text-sm font-semibold text-volt-text">
                                        {detail.label}
                                    </p>
                                    <p className="m-0 text-volt-muted">
                                        {detail.value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <form
                    className="rounded-3xl border border-volt-border bg-volt-secondary p-6 shadow-[0_18px_70px_rgba(0,0,0,0.2)] md:p-8"
                    onSubmit={handleSubmit}
                >
                    <div className="grid gap-5 md:grid-cols-2">
                        <label className="flex flex-col gap-2 text-sm font-semibold text-volt-text">
                            Name
                            <input
                                className="rounded-lg border border-volt-border bg-volt-black px-4 py-3 text-base font-normal text-volt-text outline-none transition focus:border-volt-accent"
                                type="text"
                                name="name"
                                value={formData.name}
                                minLength={2}
                                maxLength={100}
                                onChange={handleChange}
                                aria-invalid={Boolean(fieldErrors.name)}
                                required
                            />
                            <FieldError message={fieldErrors.name} />
                        </label>

                        <label className="flex flex-col gap-2 text-sm font-semibold text-volt-text">
                            Email
                            <input
                                className="rounded-lg border border-volt-border bg-volt-black px-4 py-3 text-base font-normal text-volt-text outline-none transition focus:border-volt-accent"
                                type="email"
                                name="email"
                                value={formData.email}
                                maxLength={100}
                                onChange={handleChange}
                                aria-invalid={Boolean(fieldErrors.email)}
                                required
                            />
                            <FieldError message={fieldErrors.email} />
                        </label>
                    </div>

                    <label className="mt-5 flex flex-col gap-2 text-sm font-semibold text-volt-text">
                        Mobile Number
                        <input
                            className="rounded-lg border border-volt-border bg-volt-black px-4 py-3 text-base font-normal text-volt-text outline-none transition focus:border-volt-accent"
                            type="tel"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            pattern="[0-9+()\\-\\s]{7,15}"
                            maxLength={15}
                            onChange={handleChange}
                            title="Use 7 to 15 phone characters: numbers, spaces, +, -, (, or )."
                            aria-invalid={Boolean(fieldErrors.mobileNumber)}
                            required
                        />
                        <FieldError message={fieldErrors.mobileNumber} />
                    </label>

                    <label className="mt-5 flex flex-col gap-2 text-sm font-semibold text-volt-text">
                        Message
                        <textarea
                            className="min-h-36 resize-y rounded-lg border border-volt-border bg-volt-black px-4 py-3 text-base font-normal text-volt-text outline-none transition focus:border-volt-accent"
                            name="message"
                            value={formData.message}
                            minLength={10}
                            maxLength={500}
                            onChange={handleChange}
                            aria-invalid={Boolean(fieldErrors.message)}
                            required
                        />
                        <FieldError message={fieldErrors.message} />
                    </label>

                    <div className="mt-2 text-right text-xs text-volt-muted">
                        {formData.message.length}/500 characters
                    </div>

                    {successMessage && (
                        <div className="mt-5 rounded-xl border border-volt-accent/40 bg-volt-accent/10 p-4 text-sm font-semibold text-volt-accent">
                            {successMessage}
                        </div>
                    )}

                    {errorMessage && (
                        <div className="mt-5 rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm font-semibold text-red-200">
                            {errorMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="mt-6 w-full rounded-md bg-volt-accent px-5 py-3 text-sm font-bold uppercase tracking-[1.5px] text-volt-black transition hover:bg-volt-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={submitting}
                    >
                        {submitting ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ContactPage;
