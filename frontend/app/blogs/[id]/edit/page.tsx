'use client';

import Link from 'next/link';
import { useAuthStore } from '@/src/store/auth';
import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ProtectedRoute } from '@/app/_components/ProtectedRoute';
import { Button, TextInput, Card, FormSection } from '@/app/_components/form-components';
import { BLOG_ROUTES } from '@/src/constants';
import { useApi } from '@/src/hooks/useApi';

function UpdateBlogContent() {
    const router = useRouter();
    const params = useParams();
    const blogId = params.id as string;
    const { isAuthenticated, user } = useAuthStore();
    const [submitting, setSubmitting] = useState(false);
    const [isAuthor, setIsAuthor] = useState(false);

    const { request, loading, error } = useApi();

    const [formData, setFormData] = useState({
        title: '',
        body: '',
    });

    const [validationErrors, setValidationErrors] = useState({
        title: '',
        body: '',
    });

    const fetchBlogById = useCallback(
        async (id: string) => {
            const response = await request(
                "GET",
                `${BLOG_ROUTES.FETCH}/${id}`,
                undefined,
                {
                    onError: (message) => {
                        console.error("Error fetching blog:", message);
                    },
                }
            ) as any;

            const blog = response?.data;

            if (!blog) return;

            setFormData({
                title: blog.title,
                body: blog.body,
            });

            if (user && blog.author_id === user.id) {
                setIsAuthor(true);
            }
        },
        [user, request]
    );

    useEffect(() => {
        if (blogId) {
            fetchBlogById(blogId);
        }
    }, [blogId, fetchBlogById]);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/auth/login');
        } else if (!loading && !isAuthor) {
            router.push(`/blogs/${blogId}`);
        }
    }, [isAuthenticated, isAuthor, loading, router, blogId]);

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

        try {
            setSubmitting(true);

            await request(
                "PATCH",
                BLOG_ROUTES.UPDATE,
                {
                    id: blogId,
                    title: formData.title,
                    body: formData.body,
                },
                {
                    onError: (message) => {
                        console.error("Failed to update blog:", message);
                    },
                }
            );

            router.push(`/blogs/${blogId}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="max-w-4xl mx-auto px-4 py-12">
            {loading && (
                <div className="flex flex-col items-center justify-center py-24">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-dark-blue border-t-transparent mb-4" />
                    <p className="text-gray-600 text-lg">Loading blog...</p>
                </div>
            )}

            {!loading && !isAuthor && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center shadow-sm">
                    <p className="text-dark-red font-semibold text-xl mb-6">You don't have permission to edit this blog</p>
                    <Link
                        href={`/blogs/${blogId}`}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-dark-red text-white rounded-xl hover:bg-red-700 transition-all font-semibold"
                    >
                        ← Back to Blog
                    </Link>
                </div>
            )}

            {!loading && isAuthor && (
                <Card>
                    <FormSection
                        title="Edit Blog"
                        subtitle="Update your blog post"
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
                                    disabled={submitting}
                                    loading={submitting}
                                    loadingText="Updating..."
                                >
                                    Update Blog
                                </Button>
                                <Link href={`/blogs/${blogId}`}>
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
            )}
        </main>
    );
}

export default function UpdateBlogPage() {
    return (
        <ProtectedRoute>
            <UpdateBlogContent />
        </ProtectedRoute>
    );
}
