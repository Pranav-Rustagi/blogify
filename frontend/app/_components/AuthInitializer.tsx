'use client';

import { useAuthStore } from '@/src/store/auth';
import { useEffect } from 'react';

export function AuthInitializer() {
    const { initialized, initializeAuth } = useAuthStore();

    useEffect(() => {
        if (!initialized) {
            initializeAuth();
        }
    }, [initialized, initializeAuth]);

    return null;
}
