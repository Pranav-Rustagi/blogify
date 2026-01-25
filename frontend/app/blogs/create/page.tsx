'use client';

import Link from 'next/link';
import { useAuthStore } from '@/src/store/auth';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/app/_components/ProtectedRoute';
import { Button, TextInput, Card, FormSection } from '@/app/_components/form-components';
import { BLOG_ROUTES } from '@/src/constants';
import { useApi } from '@/src/hooks/useApi';

function CreateBlogContent() {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();

    const { request, loading, error } = useApi();

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

        if (!validateForm()) return;

        const result = await request(
            "POST",
            BLOG_ROUTES.CREATE,
            {
                title: formData.title,
                body: formData.body,
            },
            {
                onSuccess: () => {
                    setFormData({
                        title: "",
                        body: "",
                    });

                    router.push("/blogs");
                },
                onError: (message) => {
                    console.error("Failed to create blog:", message);
                },
            }
        );

        if (!result) return;
    };


    return (
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
                            maxLength={50}
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
    );
}

export default function CreateBlogPage() {
    return (
        <ProtectedRoute>
            <CreateBlogContent />
        </ProtectedRoute>
    );
}
