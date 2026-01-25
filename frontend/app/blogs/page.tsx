'use client';

import { useAuthStore } from '@/src/store/auth';
import { useBlogStore } from '@/src/store/blogs';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BlogSearch from '../_components/BlogSearch';
import BlogCard from '../_components/BlogCard';
import Pagination from '../_components/Pagination';

export default function BlogsPage() {
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

    useEffect(() => {
        fetchBlogs(currentPage, searchQuery);
    }, [currentPage, searchQuery, fetchBlogs]);

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    return (
        <main className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-12">
                <h1 className="text-5xl font-bold text-dark-blue mb-4">All Blogs</h1>
                <p className="text-xl text-gray-600 mb-8">
                    Discover stories and insights from our community of writers.
                </p>

                <div className="relative">
                    <BlogSearch
                        searchQuery={searchQuery}
                        onSearchChange={handleSearchChange}
                        disabled
                    />
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
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </main>
    );
}
