'use client';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-white">
            {children}
        </div>
    );
}
