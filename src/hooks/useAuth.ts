import { login } from '@/lib/service/auth';
import { useState } from 'react';

export function useLogin() {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (payload: { email: string, password: string }) => {
        setIsLoggingIn(true);
        setError(null);

        try {
            const data = await login(payload);
            return data;
        } catch (error) {
            setError((error as Error).message);
            throw error;
        } finally {
            setIsLoggingIn(false);
        }
    };

    return { login: handleLogin, isLoggingIn, error };
}
