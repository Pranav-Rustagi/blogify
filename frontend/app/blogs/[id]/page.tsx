'use client';

import Link from 'next/link';
import { useAuthStore } from '@/src/store/auth';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

interface Blog {
  id: string;
  title: string;
  body: string;
  author_id: string;
  author_name: string;
  created_at: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const blogId = params.id as string;
  const { isAuthenticated, user, logout } = useAuthStore();
  const [currentBlog, setCurrentBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchBlogById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`/api/blogs/${id}`);
      setCurrentBlog(response.data);
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
      await axios.delete(`/api/blogs/${blogId}`);
      router.push('/blogs');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to delete blog');
    } finally {
      setIsDeleting(false);
    }
  };

  const isAuthor = currentBlog && user && currentBlog.author_id === user.id;

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-red-50">
      {/* Navigation */}
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
              className="px-4 py-2 text-dark-blue font-semibold hover:text-dark-red transition-colors"
            >
              All Blogs
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  href="/blogs/create"
                  className="px-4 py-2 bg-dark-red text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  Write Blog
                </Link>
                <div className="text-sm text-gray-600">
                  Welcome, <span className="font-semibold text-dark-blue">{user?.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-dark-blue font-semibold hover:text-dark-red transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 bg-dark-red text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">Loading blog...</div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-50 border-2 border-dark-red rounded-lg p-6 text-center">
            <p className="text-dark-red font-semibold text-lg mb-4">{error}</p>
            <Link
              href="/blogs"
              className="inline-block px-6 py-2 bg-dark-red text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
            >
              Back to Blogs
            </Link>
          </div>
        )}

        {/* Blog Content */}
        {!loading && currentBlog && (
          <div>
            {/* Blog Header */}
            <div className="mb-8">
              <h1 className="text-5xl font-bold text-dark-blue mb-4">
                {currentBlog.title}
              </h1>

              <div className="flex justify-between items-start border-b-2 border-gray-200 pb-6">
                <div>
                  <p className="text-gray-600 mb-2">
                    By <span className="font-semibold text-dark-blue">{currentBlog.author_name}</span>
                  </p>
                  <p className="text-gray-500">
                    Published on{' '}
                    {new Date(currentBlog.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>

                {/* Edit and Delete buttons for author */}
                {isAuthor && (
                  <div className="flex gap-2">
                    <Link
                      href={`/blogs/${blogId}/edit`}
                      className="px-4 py-2 bg-dark-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="px-4 py-2 bg-dark-red text-white rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Blog Content */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-8">
              <div className="prose prose-lg max-w-none text-gray-800 whitespace-pre-wrap leading-relaxed">
                {currentBlog.body}
              </div>
            </div>

            {/* Back Button */}
            <div className="text-center">
              <Link
                href="/blogs"
                className="inline-block px-6 py-3 bg-dark-blue text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                ← Back to All Blogs
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
