'use client';

import Link from 'next/link';
import { useAuthStore } from '@/src/store/auth';
import { useBlogStore } from '@/src/store/blogs';
import { useCallback, useEffect } from 'react';
import { LogOut, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Footer from '../_components/Footer';

export default function BlogsPage() {
    const { isAuthenticated, user, logout } = useAuthStore();
    const {
        blogs,
        loading,
        error,
        currentPage,
        totalPages,
        searchQuery,
        fetchBlogs,
        setSearchQuery,
        setCurrentPage
    } = useBlogStore();

    const router = useRouter();

    useEffect(() => {
        fetchBlogs(currentPage, searchQuery);
    }, [currentPage, searchQuery, fetchBlogs]);

    const handleLogout = useCallback(() => {
        logout();
        router.push('/');
    }, [router, logout]);

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-red-50">
            <nav className="bg-white shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold bg-linear-to-r from-dark-red to-dark-blue bg-clip-text text-transparent">
                            Blogify
                        </h1>
                    </div>
                    <div className="flex gap-4 items-center">
                        {isAuthenticated ? (
                            <>
                                <Link
                                    href="/blogs/create"
                                    className="px-4 py-2 bg-dark-blue text-white rounded-lg transition-colors font-semibold"
                                >
                                    Write Blog
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex gap-2 items-center px-4 py-2 text-dark-blue rounded-lg transition-colors font-semibold"
                                >
                                    Logout <LogOut className="w-5 h-5" />
                                </button>
                            </>
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

            <main className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-12">
                    <h1 className="text-5xl font-bold text-dark-blue mb-4">All Blogs</h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Discover stories and insights from our community of writers.
                    </p>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search blogs by title or author..."
                            value={searchQuery}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="w-full px-6 py-3 rounded-lg border-2 border-gray-200 bg-white focus:outline-none focus:border-dark-blue transition-all text-gray-800 placeholder-gray-400"
                            disabled
                        />
                        <span className="absolute right-4 top-3.5 text-gray-400">
                            <Search className="w-5 h-5" />
                        </span>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border-2 border-dark-red rounded-lg p-4 mb-8">
                        <p className="text-dark-red font-semibold">{error}</p>
                    </div>
                )}

                {loading && (
                    <div className="text-center py-12">
                        <div className="text-lg text-gray-600">Loading blogs...</div>
                    </div>
                )}

                {!loading && blogs.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-2xl text-gray-600 mb-4">
                            {searchQuery.trim() ? 'No blogs match your search' : 'No blogs yet'}
                        </div>
                        {!searchQuery.trim() && (
                            <p className="text-gray-500 mb-8">
                                Be the first to share your story!
                            </p>
                        )}
                    </div>
                )}

                {!loading && blogs.length > 0 && (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                            {blogs.map((blog) => (
                                <Link href={`/blogs/${blog.id}`} key={blog.id}>
                                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:scale-[1.01] transition-all h-full flex flex-col cursor-pointer">
                                        <h2 className="text-2xl font-bold text-dark-blue mb-3 line-clamp-2">
                                            {blog.title}
                                        </h2>

                                        <p className="text-gray-600 mb-4 line-clamp-3 grow">
                                            {blog.body.substring(0, 150)}...
                                        </p>

                                        <div className="flex justify-between items-center text-sm text-gray-500">
                                            <span className="font-semibold text-dark-blue">
                                                {blog.author_name}
                                            </span>
                                            <span>
                                                {new Date(blog.created_at).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-4 mt-12">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="flex items-center gap-2 px-4 py-2 bg-dark-red text-white rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                    Previous
                                </button>

                                <div className="flex gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                        (page) => (
                                            <button
                                                key={page}
                                                onClick={() => handlePageChange(page)}
                                                className={`px-3 py-2 rounded-lg font-semibold transition-all ${currentPage === page
                                                    ? 'bg-dark-blue text-white'
                                                    : 'bg-gray-200 text-dark-blue hover:bg-gray-300'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        )
                                    )}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center gap-2 px-4 py-2 bg-dark-red text-white rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                                >
                                    Next
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </main>

            <Footer />

        </div>
    );
}
