import { ApiResponse } from '@/types/service';

export async function login({ email, password }: { email: string; password: string }): Promise<ApiResponse<{ accessToken: string }>> {
    const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data;
}


export async function refreshSession(): Promise<ApiResponse<{ accessToken: string }>> {
    const res = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include'
    });

    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data;
};