'use client';

import Link from 'next/link';

interface Blog {
    id: string;
    title: string;
    body: string;
    author_name: string;
    created_at: string;
}

interface BlogCardProps {
    blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all h-full flex flex-col cursor-pointer">
            <h2 className="text-2xl font-bold text-dark-blue mb-3 line-clamp-2">
                {blog.title}
            </h2>
            <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                <span className="font-semibold text-dark-blue/60">
                    @{blog.author_name}
                </span>
                <span>
                    {new Date(blog.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}
                </span>
            </div>

            <p className="text-gray-600 mb-6 line-clamp-3 grow">
                {blog.body.substring(0, 150)}...
            </p>

            <Link
                href={`/blogs/${blog.id}`}
                className='w-fit px-4 py-2 bg-dark-red text-white rounded-lg hover:scale-[1.05] hover:bg-opacity-90 transition-all mt-auto'
            >
                Read blog
            </Link>
        </div>
    );
}
