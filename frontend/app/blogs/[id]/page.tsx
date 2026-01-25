'use client';

import Link from 'next/link';
import { useAuthStore } from '@/src/store/auth';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { BLOG_ROUTES } from '@/src/constants';
import { Edit, MoveLeft, Trash2 } from 'lucide-react';

interface Blog {
    id: string;
    title: string;
    body: string;
    author_id: string;
    author_name: string;
    created_at: string;
    updated_at: string;
}

export default function BlogDetailPage() {
    const params = useParams();
    const router = useRouter();
    const blogId = params.id as string;
    const { user } = useAuthStore();
    const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchBlogById = useCallback(async (id: string) => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get(`${BLOG_ROUTES.FETCH}/${id}`);
            setCurrentBlog(response.data?.data);
        } catch (err) {
            console.error('Error fetching blog:', err);
            setError('Failed to load blog. Please try again later.');
            setCurrentBlog(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (blogId) {
            fetchBlogById(blogId);
        }
    }, [blogId, fetchBlogById]);

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;

        try {
            setIsDeleting(true);
            await axios.delete(`${BLOG_ROUTES.DELETE}/${blogId}`);
            router.push('/blogs');
        } catch (error: any) {
            alert(error.response?.data?.message || 'Failed to delete blog');
        } finally {
            setIsDeleting(false);
        }
    };

    const isAuthor = currentBlog && user && currentBlog.author_id === user.id;

    return (
        <main className="relative max-w-6xl mx-auto px-4 py-14">
            {/* {!loading && currentBlog && (
          <div className="hidden lg:flex absolute left-0 -translate-x-full top-28 flex-col gap-4 z-20">
            <button
              className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md
                   flex items-center justify-center text-gray-600
                   hover:text-dark-red hover:scale-105
                   transition-all"
              title="Like"
            >
              <Heart className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard');
              }}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 shadow-md
                   flex items-center justify-center text-gray-600
                   hover:text-dark-blue hover:border-blue-200 hover:scale-105
                   transition-all"
              title="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        )} */}

            {loading && (
                <div className="flex flex-col items-center justify-center py-24">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-dark-blue border-t-transparent mb-4" />
                    <p className="text-gray-600 text-lg">Loading blog...</p>
                </div>
            )}

            {error && !loading && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center shadow-sm">
                    <p className="text-dark-red font-semibold text-xl mb-6">{error}</p>
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-dark-red text-white rounded-xl hover:bg-red-700 transition-all font-semibold"
                    >
                        ← Back to Blogs
                    </Link>
                </div>
            )}

            {!loading && currentBlog && (
                <article className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 md:p-14">

                    <div className="mb-6 flex justify-between">
                        <Link
                            href="/blogs"
                            className="inline-flex items-center gap-2 font-semibold text-gray-500 hover:text-dark-blue transition-colors"
                        >
                            <MoveLeft className="w-4 h-4 inline" />
                            Back to Blogs
                        </Link>
                        {isAuthor && (
                            <div className="flex gap-10 md:items-end">
                                <Link
                                    href={`/blogs/${blogId}/edit`}
                                    className="inline-flex items-center justify-center gap-2 transition-all font-semibold text-dark-blue"
                                >
                                    Edit
                                    <Edit className="w-4 h-4 inline" />
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    className="inline-flex items-center justify-center gap-2 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-dark-red"
                                >
                                    {isDeleting ? 'Deleting…' : 'Delete'}
                                    <Trash2 className="w-4 h-4 inline" />
                                </button>
                            </div>
                        )}
                    </div>

                    <header className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 mb-10">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-dark-blue leading-tight mb-4">
                                {currentBlog.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                                <span>
                                    <span className="font-semibold text-dark-red">
                                        @{currentBlog.author_name}
                                    </span>
                                </span>
                                <span className="hidden sm:inline">•</span>
                                <span>
                                    {new Date(currentBlog.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </span>
                                {
                                    currentBlog.updated_at !== currentBlog.created_at && (
                                        <>
                                            <span className="hidden sm:inline">•</span>
                                            <span>
                                                Updated on{' '}
                                                {new Date(currentBlog.updated_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    </header>

                    <div className="relative my-10">
                        <div className="h-px bg-linear-to-r from-transparent via-gray-300 to-transparent" />
                    </div>

                    <div className="prose prose-xl md:prose-2xl max-w-none text-gray-800 leading-[1.8] whitespace-pre-wrap text-lg">
                        {currentBlog.body}
                    </div>
                </article>
            )}
        </main>
    );
}
