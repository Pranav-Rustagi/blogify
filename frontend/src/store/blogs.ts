import { create } from 'zustand';
import { BLOG_ROUTES } from '../constants';
import axios from 'axios';

axios.defaults.withCredentials = true;

interface Blog {
    id: string;
    title: string;
    body: string;
    author_id: string;
    author_name: string;
    created_at: string;
}

interface BlogStore {
    blogs: Blog[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    totalPages: number;
    searchQuery: string;

    fetchBlogs: (page: number, searchQuery?: string, limit?: number) => Promise<void>;
    setSearchQuery: (query: string) => void;
    setCurrentPage: (page: number) => void;
    clearError: () => void;
}

const DEFAULT_LIMIT = 12;

export const useBlogStore = create<BlogStore>((set) => ({
    blogs: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
    searchQuery: '',

    fetchBlogs: async (page: number = 1, searchQuery: string = '', limit: number = DEFAULT_LIMIT) => {
        set({ loading: true, error: null });
        try {
            const params = new URLSearchParams();
            params.append('page', page.toString());
            params.append('limit', limit.toString());
            if (searchQuery.trim()) {
                params.append('search', searchQuery.trim());
            }

            const response = await axios.get(`${BLOG_ROUTES.FETCH}?${params.toString()}`);

            set({
                blogs: response.data.data.blogs,
                totalPages: response.data.data.pagination.totalPages,
                currentPage: response.data.data.pagination.currentPage,
                loading: false,
            });
        } catch (err: any) {
            console.error('Error fetching blogs:', err);
            set({
                error: 'Failed to load blogs. Please try again later.',
                blogs: [],
                totalPages: 0,
                loading: false,
            });
        }
    },

    setSearchQuery: (query: string) => {
        set({ searchQuery: query });
    },

    setCurrentPage: (page: number) => {
        set({ currentPage: page });
    },

    clearError: () => {
        set({ error: null });
    },
}));
