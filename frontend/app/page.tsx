'use client';

import Link from 'next/link';
import { useAuthStore } from '@/src/store/auth';
// import { useBlogStore } from '@/src/store/blog';
import { useCallback, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { isAuthenticated, user, logout } = useAuthStore();
  // const { blogs, fetchAllBlogs } = useBlogStore();

  const router = useRouter();

  const fetchAllBlogs = () => { };
  const blogs: any = [];

  useEffect(() => {
    fetchAllBlogs();
  }, [fetchAllBlogs]);

  const handleLogout = useCallback(() => {
    logout();
    router.push('/');
  }, [router, logout]);

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
            <Link
              href="/blogs"
              className="px-4 py-2 bg-blue-100 text-dark-blue rounded-lg hover:text-dark-blue transition-colors font-semibold"
            >
              Read Blogs
            </Link>
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

      <main className="max-w-7xl mx-auto px-4 flex flex-col gap-32">
        <div className="text-center min-h-screen flex flex-col justify-center items-center">

          <div className="inline-block mb-6 px-4 py-2 bg-blue-100 rounded-full w-fit">
            <span className="text-dark-blue font-semibold text-sm">✨ Welcome to the Future of Blogging</span>
          </div>

          <h2 className="text-6xl md:text-7xl font-bold text-dark-blue mb-6 leading-tight">
            <span className="bg-linear-to-r from-dark-red to-dark-blue bg-clip-text text-transparent">Read Write Connect</span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto">
            Discover meaningful stories and unique perspectives from an open community of creators.
          </p>

          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Create, share, and connect with readers who love your content.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {!isAuthenticated ? (
              <Link
                href="/auth/signup"
                className="px-8 py-4 bg-linear-to-r from-dark-red to-red-700 text-white font-bold rounded-lg hover:shadow-lg transition-all hover:scale-105 text-lg"
              >
                Join Today
              </Link>
            ) : (
              <Link
                href="/blogs/create"
                className="px-8 py-4 bg-linear-to-r from-dark-red to-red-700 text-white font-bold rounded-lg hover:shadow-lg transition-all hover:scale-105 text-lg"
              >
                Create New Blog
              </Link>
            )}
            <Link
              href="/blogs"
              className="px-8 py-4 bg-linear-to-r from-dark-blue to-blue-950 text-white font-bold rounded-lg hover:shadow-lg transition-all hover:scale-105 text-lg"
            >
              Read Blogs
            </Link>
          </div>
        </div>


        <div className='flex flex-col items-center'>
          <div className="mb-12">
            <h2 className="text-5xl font-bold text-dark-blue mb-4 text-center">
              Why Blogify
            </h2>
            <p className="text-xl text-gray-600 text-center">
              Because we are great at what we do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-20 py-12">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-dark-red text-3xl">👀</span>
              </div>
              <h3 className="text-2xl font-bold text-dark-blue mb-3">Read Freely</h3>
              <p className="text-gray-600 leading-relaxed">
                Explore thousands of blogs from our community without any restrictions. Discover diverse perspectives, expert insights, and inspiring stories from writers around the world.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-dark-blue text-3xl">✍️</span>
              </div>
              <h3 className="text-2xl font-bold text-dark-blue mb-3">Write Stories</h3>
              <p className="text-gray-600 leading-relaxed">
                Sign in and share your unique voice with thousands of readers. Express your ideas, expertise, and creativity with an intuitive and powerful writing platform.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-2">
              <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                <span className="text-dark-red text-3xl">🌍</span>
              </div>
              <h3 className="text-2xl font-bold text-dark-blue mb-3">Global Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with writers and readers from across the globe. Build your audience, engage with the community, and discover perspectives that inspire and challenge you.
              </p>
            </div>
          </div>
        </div>


        <div className='flex flex-col items-center'>
          <div className="mb-12">
            <h2 className="text-5xl font-bold text-dark-blue mb-4 text-center">
              See Us Thriving
            </h2>
            <p className="text-xl text-gray-600 text-center">
              We are connected all over the globe
            </p>
          </div>

          <div className="bg-dark-red/10 rounded-3xl p-12 py-24 mb-20 border border-gray-200 w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl md:text-5xl font-bold text-dark-red mb-2">
                  {blogs.length}
                </div>
                <p className="text-gray-600 font-semibold">Active Blogs</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-dark-blue mb-2">
                  ∞
                </div>
                <p className="text-gray-600 font-semibold">Readers</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-dark-red mb-2">
                  24/7
                </div>
                <p className="text-gray-600 font-semibold">Available</p>
              </div>
              <div>
                <div className="text-4xl md:text-5xl font-bold text-dark-blue mb-2">
                  100%
                </div>
                <p className="text-gray-600 font-semibold">Free</p>
              </div>
            </div>
          </div>
        </div>






        <div className="flex flex-col items-center mb-20">
          <div className="mb-12 w-full">
            <h2 className="text-5xl font-bold text-dark-blue mb-4 text-center">
              Featured Stories
            </h2>
            <p className="text-xl text-gray-600 text-center">
              Discover the latest and most inspiring content from our community
            </p>
          </div>
          {blogs.length > 0 ? (
            <div className='w-full'>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {blogs.slice(0, 3).map((blog: any) => (
                  <Link href={`/blogs/${blog.id}`} key={blog.id}>
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-2xl hover:scale-105 transition-all h-full flex flex-col cursor-pointer group">
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-red-100 text-dark-red rounded-full text-sm font-semibold">
                          Featured
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold text-dark-blue mb-3 line-clamp-2 group-hover:text-dark-red transition-colors">
                        {blog.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3 grow text-sm leading-relaxed">
                        {blog.excerpt}
                      </p>

                      <div className="flex justify-between items-center text-sm border-t pt-4">
                        <div>
                          <p className="font-semibold text-dark-blue">
                            {blog.authorName}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        <span className="text-dark-red font-bold text-lg">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center bg-linear-to-r from-dark-blue/5 to-dark-red/5 rounded-2xl p-12">
                <h3 className="text-3xl font-bold text-dark-blue mb-4">
                  Want to Read More?
                </h3>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                  Explore our complete collection of blogs and discover stories that match your interests.
                </p>
                <Link
                  href="/blogs"
                  className="inline-block px-8 py-4 bg-linear-to-r from-dark-blue to-blue-900 text-white font-bold rounded-lg hover:shadow-lg transition-all hover:scale-105 text-lg"
                >
                  Browse All Blogs →
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-24 bg-blue-50 rounded-2xl w-full">
              <p className="text-xl text-gray-600 mb-10">
                No blogs yet, but there are stories waiting to be written!
              </p>
              <Link
                href={isAuthenticated ? "/blogs/create" : "/auth/signup"}
                className="inline-block px-8 py-4 bg-linear-to-r from-dark-red to-red-700 text-white font-bold rounded-lg hover:shadow-lg transition-all hover:scale-105 text-lg"
              >
                Be the First to Write
              </Link>
            </div>
          )}
        </div>

        {!isAuthenticated && (
          <div className="bg-linear-to-r from-dark-red to-dark-blue/90 rounded-3xl p-12 md:p-16 text-center text-white mb-20">
            <h3 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Share Your Story?
            </h3>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Join thousands of writers and readers in our vibrant community. Start writing today and let your voice be heard.
            </p>
            <Link
              href="/auth/signup"
              className="inline-block px-8 py-4 bg-white text-dark-red font-bold rounded-lg hover:shadow-lg transition-all hover:scale-105 text-lg"
            >
              Get Started for Free
            </Link>
          </div>
        )}

      </main>

      <footer className="bg-gray-50 border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h4 className="text-lg font-bold text-dark-blue mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/blogs" className="text-gray-600 hover:text-dark-red transition-colors font-medium">
                    All Blogs
                  </Link>
                </li>
                {isAuthenticated && (
                  <li>
                    <Link href="/blogs/create" className="text-gray-600 hover:text-dark-red transition-colors font-medium">
                      Create Blog
                    </Link>
                  </li>
                )}
                {!isAuthenticated && (
                  <li>
                    <Link href="/auth/signup" className="text-gray-600 hover:text-dark-red transition-colors font-medium">
                      Get Started
                    </Link>
                  </li>
                )}
                <li>
                  <Link href="/auth/login" className="text-gray-600 hover:text-dark-red transition-colors font-medium">
                    Sign In
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-dark-blue mb-4">Connect with Developer</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="https://www.linkedin.com/in/pranav-rustagi/" className="text-gray-600 hover:text-dark-red transition-colors font-medium" target="_blank">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/Pranav-Rustagi" className="text-gray-600 hover:text-dark-red transition-colors font-medium" target="_blank">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="https://dev.to/pranav-rustagi" className="text-gray-600 hover:text-dark-red transition-colors font-medium" target="_blank">
                    Dev.to
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-dark-blue mb-4">Why Blogify?</h4>
              <ul className="space-y-3">
                <li className="text-gray-600 font-medium">Easy to use editor</li>
                <li className="text-gray-600 font-medium">Global audience</li>
                <li className="text-gray-600 font-medium">Completely free</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-8 text-center">
            <p className="text-gray-600">
              &copy; 2026 Blogify. Share your stories with the world.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
