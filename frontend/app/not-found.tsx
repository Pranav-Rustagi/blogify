'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    router.push('/');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-red-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">

                <div className="mb-8 animate-bounce">
                    <h1 className="text-9xl font-bold bg-linear-to-r from-dark-red to-dark-blue bg-clip-text text-transparent mb-2">
                        404
                    </h1>
                </div>

                <div className="mb-8">
                    <p className="text-3xl font-bold text-gray-800 mb-2">Page Not Found</p>
                    <p className="text-gray-600 mb-6">
                        Sorry, the page you're looking for doesn't exist or has been moved.
                    </p>

                    <div className="inline-block px-4 py-2 bg-blue-100 text-dark-blue rounded-lg font-semibold mb-6">
                        Redirecting in <span className="font-bold text-lg">{countdown}</span>s
                    </div>
                </div>

                <div className="w-full h-1 bg-gray-200 rounded-full mb-8 overflow-hidden">
                    <div
                        className="h-full bg-linear-to-r from-dark-red to-dark-blue transition-all duration-1000 ease-linear"
                        style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
