import Navbar from '@/components/admin/navbar';
import Sidebar from '@/components/admin/sidebar';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: React.ReactNode}) {
    const cookie = await cookies();
    const token = cookie.get('blog-refresh-token');

    if (!token) {
        redirect('/login');
    }
    
    return (
        <div className='min-h-screen flex flex-col'>
            <div className='flex flex-1'>
                <Sidebar />
                <main className='w-full flex flex-col'>
                    <Navbar />
                    <div className='grow w-full flex flex-col'>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

