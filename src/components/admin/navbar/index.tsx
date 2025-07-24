'use client';

import Link from 'next/link';
import { useState } from 'react';

import HamburgerButtonPortal from '@/components/common/HamburgerButtonPortal';
import { Button } from '@/components/ui/button';

import MobileSidebar from '../sidebar/MobileSidebar';

export default function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            <header
                className='sticky z-10 top-0 flex flex-col bg-background/85 backdrop-blur-md'
                style={{ height: 'var(--navbar-height)' }}
            >
                <nav className='grow flex items-center px-4'>
                    <div className='flex items-center absolute'>
                        <HamburgerButtonPortal
                            open={sidebarOpen}
                            onClick={() => setSidebarOpen(prev => !prev)}
                        />
                    </div>
                    <div className='flex-1 flex justify-center h-full pl-11 md:pl-0'>
                        <Link href='/admin' className='h-full inline-flex items-center font-semibold'>
                            <span className='underline-from-center'>Hyun&apos;s Dev 👨‍💻</span>
                        </Link>
                    </div>
                    <div className='h-full flex items-center space-x-8'>
                        <Button asChild className='rounded-full w-30 font-normal'>
                            <Link href='/'>
                                <span>블로그 홈으로</span>
                            </Link>
                        </Button>
                    </div>
                </nav>
            </header>

            <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
        </>
    );
}

