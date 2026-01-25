'use client';

import Footer from "../_components/Footer";
import Navbar from "../_components/Navbar";

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-red-50">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}