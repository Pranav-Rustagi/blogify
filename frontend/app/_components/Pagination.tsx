'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-4 mt-12">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 bg-dark-red text-white rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
                <ChevronLeft className="w-5 h-5" />
                Previous
            </button>

            <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                        <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 rounded-lg font-semibold transition-all ${currentPage === page
                                ? 'bg-dark-blue text-white'
                                : 'bg-gray-200 text-dark-blue hover:bg-gray-300'
                                }`}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 bg-dark-red text-white rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
                Next
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
}
