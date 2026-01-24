import axios from 'axios';
import { create } from 'zustand';
import { AUTH_ROUTES } from '../constants';

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

    signup: (username: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    clearError: () => void;
    setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    loading: false,
    error: null,
    isAuthenticated: false,

    signup: async (username: string, email: string, password: string) => {
        set({ loading: true, error: null });
        try {
            const response = await axios.post(AUTH_ROUTES.SIGNUP, {
                username,
                email,
                password
            });

            const data = response.data;

            set({
                user: data.user,
                isAuthenticated: true,
                loading: false,
            });
        } catch (error: any) {
            console.log(error);
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

            const data = response.data;

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

    logout: () => {
        set({
            user: null,
            isAuthenticated: false,
            error: null,
        });
    },

    clearError: () => {
        set({ error: null });
    },

    setLoading: (loading: boolean) => {
        set({ loading });
    },
}));
