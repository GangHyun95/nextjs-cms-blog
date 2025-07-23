import Navbar from '@/components/site/navbar';
import Sidebar from '@/components/site/sidebar';

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className='min-h-screen flex flex-col'>
            <div className='flex flex-1'>
                <Sidebar />
                <main className='w-full flex flex-col bg-muted'>
                    <Navbar />
                    <div className='grow w-full flex flex-col w-content m-auto'>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

