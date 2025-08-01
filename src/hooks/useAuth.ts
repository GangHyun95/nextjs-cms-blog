import { useCallback, useState } from 'react';

import { login, refreshSession } from '@/service/client/auth';

export function useLogin() {
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleLogin = async (payload: { email: string, password: string }) => {
        setIsLoggingIn(true);
        try {
            const { data } = await login(payload);
            return { accessToken: data.accessToken };
        } catch (error) {
            const message = (error as Error).message;
            throw new Error(message);
        } finally {
            setIsLoggingIn(false);
        }
    };

    return { login: handleLogin, isLoggingIn };
}

export function useRefreshSession() {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const refresh = useCallback(async () => {
        setIsRefreshing(true);
        try {
            const { data } = await refreshSession();
            return { accessToken: data.accessToken };
        } catch (err) {
            console.error('세션 갱신 실패:', err);
            throw err;
        } finally {
            setIsRefreshing(false);
        }
    }, []);

    return { refresh, isRefreshing };
}
