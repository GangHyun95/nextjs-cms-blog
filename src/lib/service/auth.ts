export async function login({ email, password }: { email: string; password: string }): Promise<{ accessToken: string }> {
    const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
    }

    return res.json();
}
