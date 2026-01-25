import axios from 'axios';
import { create } from 'zustand';
import { AUTH_ROUTES } from '../constants';

axios.defaults.withCredentials = true;

interface AuthUser {
    id: string;
    username: string;
    email: string;
}

interface AuthStore {
    user: AuthUser | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    initialized: boolean;

    signup: (username: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    clearError: () => void;
    setLoading: (loading: boolean) => void;
    initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,
    initialized: false,

    signup: async (username: string, email: string, password: string) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(AUTH_ROUTES.SIGNUP, {
                username,
                email,
                password
            });

            const data = response.data?.data || null;

            set({
                user: data.user,
                isAuthenticated: true,
                loading: false,
            });
        } catch (error: any) {
            console.error(error);
            set({
                error: error.message,
                loading: false,
            });
            throw error;
        }
    },

    login: async (email: string, password: string) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(AUTH_ROUTES.SIGNIN, {
                email,
                password
            });

            const data = response.data?.data || null;

            set({
                user: data.user,
                isAuthenticated: true,
                loading: false,
            });
        } catch (error: any) {
            set({
                error: error.message,
                loading: false,
            });
            throw error;
        }
    },

    logout: async () => {
        try {
            await axios.get(AUTH_ROUTES.LOGOUT);
            set({
                user: null,
                isAuthenticated: false,
                error: null,
            });
        } catch (error: any) {
            set({
                error: error.message
            });
            throw error;
        }
    },

    clearError: () => {
        set({ error: null });
    },

    setLoading: (loading: boolean) => {
        set({ loading });
    },

    initializeAuth: async () => {
        set({ loading: true });
        try {
            const response = await axios.get(AUTH_ROUTES.VERIFY_TOKEN);
            const data = response.data?.data || null;

            set({
                user: data.user,
                isAuthenticated: true,
                loading: false,
                initialized: true,
            });
        } catch (error: any) {
            set({
                user: null,
                isAuthenticated: false,
                loading: false,
                initialized: true,
            });
        }
    },
}));
