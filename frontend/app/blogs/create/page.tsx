'use client';

import Link from 'next/link';
import { useAuthStore } from '@/src/store/auth';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { ProtectedRoute } from '@/app/_components/ProtectedRoute';
import { Button, TextInput, Card, FormSection } from '@/app/_components/form-components';
import { BLOG_ROUTES } from '@/src/constants';
import { LogOut } from 'lucide-react';
import Footer from '@/app/_components/Footer';

function CreateBlogContent() {
    const router = useRouter();
    const { isAuthenticated, logout } = useAuthStore();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        body: '',
    });

    const [validationErrors, setValidationErrors] = useState({
        title: '',
        body: '',
    });

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/auth/login');
        }
    }, [isAuthenticated, router]);

    const handleLogout = useCallback(() => {
        logout();
        router.push('/');
    }, [router, logout]);

    const validateForm = () => {
        const errors = {
            title: '',
            body: '',
        };

        if (!formData.title.trim()) {
            errors.title = 'Title is required';
        } else if (formData.title.trim().length < 5) {
            errors.title = 'Title must be at least 5 characters long';
        }

        if (!formData.body.trim()) {
            errors.body = 'Content is required';
        } else if (formData.body.trim().length < 50) {
            errors.body = 'Content must be at least 50 characters long';
        } else if (formData.body.trim().length > 1000) {
            errors.body = 'Content must be at most 1000 characters long';
        }

        setValidationErrors(errors);
        return !Object.values(errors).some((error) => error !== '');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        setValidationErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);

            await axios.post(BLOG_ROUTES.CREATE, {
                title: formData.title,
                body: formData.body,
            });

            setFormData({
                title: '',
                body: '',
            });

            router.push('/blogs');
        } catch (error: any) {
            console.error('Failed to create blog:', error);
            setError(error.response?.data?.message || 'Failed to create blog. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-red-50">

            <nav className="bg-white shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/">
                        <h1 className="text-2xl font-bold bg-linear-to-r from-dark-red to-dark-blue bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
                            Blogify
                        </h1>
                    </Link>
                    <div className="flex gap-4 items-center">
                        <Link
                            href="/blogs"
                            className="px-4 py-2 bg-blue-100 text-dark-blue rounded-lg hover:text-dark-blue transition-colors font-semibold"
                        >
                            Read Blogs
                        </Link>

                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="flex gap-2 items-center px-4 py-2 text-dark-blue rounded-lg transition-colors font-semibold"
                            >
                                Logout <LogOut className="w-5 h-5" />
                            </button>
                        ) : (
                            <>
                                <Link
                                    href="/auth/login"
                                    className="px-4 py-2 bg-blue-100 text-dark-blue rounded-lg hover:text-dark-blue transition-colors font-semibold"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/auth/signup"
                                    className="px-4 py-2 bg-dark-blue text-white rounded-lg transition-colors font-semibold"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-12">
                <Card>
                    <FormSection
                        title="Create New Blog"
                        subtitle="Share your thoughts and stories with the world"
                    >
                        {error && (
                            <div className="bg-red-50 border-2 border-dark-red rounded-lg p-4 mb-6">
                                <p className="text-dark-red font-semibold">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <TextInput
                                id="title"
                                name="title"
                                label="Blog Title"
                                placeholder="Enter a compelling title for your blog"
                                value={formData.title}
                                onChange={handleChange}
                                error={validationErrors.title}
                            />

                            <div>
                                <label
                                    htmlFor="body"
                                    className="block text-sm font-semibold text-gray-700 mb-2"
                                >
                                    Content
                                </label>
                                <textarea
                                    id="body"
                                    name="body"
                                    placeholder="Write your blog content here. Minimum 50 characters."
                                    value={formData.body}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all resize-vertical ${validationErrors.body
                                        ? 'border-dark-red bg-red-50 focus:outline-none focus:border-dark-red'
                                        : 'border-gray-200 bg-gray-50 focus:outline-none focus:border-dark-blue'
                                        } text-gray-800 placeholder-gray-400 min-h-64`}
                                />
                                {validationErrors.body && (
                                    <p className="mt-2 text-sm text-dark-red font-medium">
                                        {validationErrors.body}
                                    </p>
                                )}
                                <p className="mt-1 text-sm text-gray-500">
                                    {formData.body.length} / 1000 characters
                                </p>
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    type="submit"
                                    variant="primary"
                                    disabled={loading}
                                    loading={loading}
                                    loadingText="Publishing..."
                                >
                                    Publish Blog
                                </Button>
                                <Link href="/blogs">
                                    <Button
                                        type="button"
                                        variant="secondary"
                                    >
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </FormSection>
                </Card>
            </main>

            <Footer />
        </div>
    );
}

export default function CreateBlogPage() {
    return (
        <ProtectedRoute>
            <CreateBlogContent />
        </ProtectedRoute>
    );
}
