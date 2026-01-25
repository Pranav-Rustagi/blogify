'use client';

import { Search } from 'lucide-react';

interface BlogSearchProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    disabled?: boolean;
}

export default function BlogSearch({ searchQuery, onSearchChange, disabled = false }: BlogSearchProps) {
    return (
        <div className="relative">
            <input
                type="text"
                placeholder="Search blogs by title or author..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full px-6 py-3 rounded-lg border-2 border-gray-200 bg-white focus:outline-none focus:border-dark-blue transition-all text-gray-800 placeholder-gray-400"
                disabled={disabled}
            />
            <span className="absolute right-4 top-3.5 text-gray-400">
                <Search className="w-5 h-5" />
            </span>
        </div>
    );
}
