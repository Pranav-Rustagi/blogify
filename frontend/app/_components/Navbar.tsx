"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useCallback } from "react";
import { useAuthStore } from "@/src/store/auth";

export default function Navbar() {
    const pathname = usePathname();
    const { isAuthenticated, logout } = useAuthStore();
    const router = useRouter();

    const isHome = pathname === "/";
    const isBlogDetail = pathname.startsWith("/blogs/") && !pathname.includes("create") && !pathname.includes("edit");
    const isEditor = pathname.includes("/blogs/create") || pathname.includes("/edit");

    const handleLogout = useCallback(() => {
        logout();
        router.push('/');
    }, [router, logout]);

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/">
                    <h1 className="text-3xl font-bold bg-linear-to-r from-dark-red to-dark-blue bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
                        Blogify
                    </h1>
                </Link>

                <div className="flex gap-4 items-center">
                    {isHome && (
                        <Link
                            href="/blogs"
                            className="px-4 py-2 bg-blue-100 text-dark-blue rounded-lg font-semibold"
                        >
                            Read Blogs
                        </Link>
                    )}

                    {(isEditor || isBlogDetail) && (
                        <Link
                            href="/blogs"
                            className="px-4 py-2 bg-blue-100 text-dark-blue rounded-lg font-semibold"
                        >
                            Read Blogs
                        </Link>
                    )}

                    {isAuthenticated ? (
                        <>
                            {!isEditor && (
                                <Link
                                    href="/blogs/create"
                                    className="px-4 py-2 bg-dark-blue text-white rounded-lg font-semibold"
                                >
                                    Write Blog
                                </Link>
                            )}

                            <button
                                onClick={handleLogout}
                                className="flex gap-2 items-center px-4 py-2 text-dark-blue font-semibold"
                            >
                                Logout <LogOut className="w-5 h-5" />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/auth/login"
                                className="px-4 py-2 bg-blue-100 text-dark-blue rounded-lg font-semibold"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/auth/signup"
                                className="px-4 py-2 bg-dark-blue text-white rounded-lg font-semibold"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
