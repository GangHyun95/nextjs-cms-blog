import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode}) {
    const cookie = await cookies();
    const token = cookie.get('blog-refresh-token');

    if (!token) {
        redirect('/login');
    }
    return <>{children}</>
}

