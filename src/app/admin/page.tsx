'use client';

import { useAppSelector } from '@/store/hooks';

export default function AdminPage() {
    const accessToken = useAppSelector(state => state.auth.accessToken);

    return (
        <div>
            <div className='h-screen bg-red-500'></div>
            <div className='h-screen bg-red-500'></div>
            <div className='h-screen bg-red-500'></div>
        </div>
    );
}
