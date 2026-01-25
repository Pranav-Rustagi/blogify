import { useAuthStore } from "@/src/store/auth";
import Link from "next/link";
import { TextInput } from "./form-components";
import { useState } from "react";

const Footer = () => {
    const { isAuthenticated } = useAuthStore();
    const [newsletterEmail, setNewsletterEmail] = useState('');

    const handleNewsLetterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewsletterEmail(e.target.value);
    };

    return (
        <footer className="bg-gray-50 border-t border-gray-200 mt-20">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid md:grid-cols-3 gap-12 mb-12">
                    <div>
                        <h4 className="text-lg font-bold text-dark-blue mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/blogs" className="text-gray-600 hover:text-dark-red transition-colors font-medium">
                                    Browse Blogs
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
                                        Join the community
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-dark-blue mb-4">Connect With Us</h4>
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
                        <h4 className="text-lg font-bold text-dark-blue mb-4">Join Our Newsletter</h4>
                        <TextInput
                            type="email"
                            id="email"
                            name="email"
                            value={newsletterEmail}
                            onChange={handleNewsLetterChange}
                            placeholder="Enter your email"
                        />
                        <button className="px-8 py-2 bg-dark-red text-white rounded-lg transition-colors font-semibold mt-4" disabled>
                            Join
                        </button>
                    </div>
                </div>

                <div className="border-t border-gray-300 pt-8 text-center">
                    <p className="text-gray-600">
                        &copy; 2026 Blogify. Share your stories with the world.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;