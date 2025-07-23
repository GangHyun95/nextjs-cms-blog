'use client';

import Link from 'next/link';
import { useState } from 'react';

import HamburgerButton from '@/components/common/HamburgerButton';

import PageHoverMenu from './PageHoverMenu';
import SearchButton from './SearchButton';
import ResponsiveSidebar from '../sidebar/ResponsiveSidebar';

export default function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            <header className='sticky z-10 top-0 flex flex-col h-14 lg:h-16 bg-background/85 backdrop-blur-md'>
                <nav className='grow flex items-center px-4'>
                    <div className='flex items-center absolute 2xl:hidden'>
                        <HamburgerButton open={sidebarOpen} onClick={() => setSidebarOpen(prev => !prev)} />
                    </div>
                    <div className='flex-1 flex justify-center h-full pl-11 2xl:pl-0'>
                        <Link href='/' className='h-full inline-flex items-center font-semibold'>
                            <span className='underline-from-center'>Hyun&apos;s Dev 👨‍💻</span>
                        </Link>
                    </div>
                    <div className='h-full flex items-center space-x-8'>
                        <PageHoverMenu/>
                        <SearchButton />
                    </div>
                </nav>
            </header>

            <ResponsiveSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
        </>
    );
}

