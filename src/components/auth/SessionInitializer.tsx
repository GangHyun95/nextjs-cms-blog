'use client';

import { useRefreshSession } from '@/hooks/useAuth';
import { useAppDispatch } from '@/store/hooks';
import { setAccessToken } from '@/store/slices/authSlice';
import { useEffect } from 'react';
import { FullPageSpinner } from '../Spinner';

export default function SessionInitializer() {
    const { refresh, isRefreshing } = useRefreshSession();
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => {
            try {
                const { accessToken } = await refresh();
                dispatch(setAccessToken({ accessToken }));
            } catch (error) {
                console.error('세션 갱신 실패:', error);
            }
        })();
    }, [refresh, dispatch]);

    if (isRefreshing) {
        return <FullPageSpinner />
    }

    return null;
}
