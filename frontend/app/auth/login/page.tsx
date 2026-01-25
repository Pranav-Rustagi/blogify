'use client';

import { useState } from 'react';
import { useAuthStore } from '@/src/store/auth';
import { validateLoginForm, ValidationErrors } from '@/src/utils/validation';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const { login, loading, error: storeError } = useAuthStore();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState<ValidationErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name as keyof ValidationErrors]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError(null);

        const validationErrors = validateLoginForm(formData.email, formData.password);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await login(formData.email, formData.password);
            router.push('/');
        } catch (err: any) {
            setSubmitError(err.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-white p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">

                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-dark-blue mb-2">Welcome Back</h1>
                        <p className="text-gray-600">Sign in to your account</p>
                    </div>

                    {(submitError || storeError) && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-dark-red text-sm font-medium">
                                {submitError || storeError}
                            </p>
                        </div>
                    )}


                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                                className={`w-full px-4 py-3 rounded-lg border-2 transition-all ${errors.email
                                        ? 'border-dark-red bg-red-50 focus:outline-none focus:border-dark-red'
                                        : 'border-gray-200 bg-gray-50 focus:outline-none focus:border-dark-blue'
                                    } text-gray-800 placeholder-gray-400`}
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-dark-red font-medium">{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all pr-12 ${errors.password
                                            ? 'border-dark-red bg-red-50 focus:outline-none focus:border-dark-red'
                                            : 'border-gray-200 bg-gray-50 focus:outline-none focus:border-dark-blue'
                                        } text-gray-800 placeholder-gray-400`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-3.5 text-gray-600 hover:text-dark-blue transition-colors"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-sm text-dark-red font-medium">{errors.password}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 mt-6 bg-linear-to-r from-dark-red to-red-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>


                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            Don't have an account?{' '}
                            <Link
                                href="/auth/signup"
                                className="text-dark-red font-semibold hover:text-dark-blue transition-colors"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
