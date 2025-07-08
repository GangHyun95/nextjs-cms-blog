'use client';

import { useAppSelector } from '@/store/hooks';

export default function AdminPage() {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    return (
        <main className='p-8'>
            <h1 className='text-xl font-bold mb-4'>Admin</h1>
            <p>토큰: {accessToken ?? '없음'}</p>
        </main>
    );
}
