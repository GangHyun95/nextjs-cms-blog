'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import HamburgerButtonPortal from '@/components/common/HamburgerButtonPortal';

import PageHoverMenu from './PageHoverMenu';
import SearchButton from './SearchButton';
import ResponsiveSidebar from '../sidebar/ResponsiveSidebar';
import { cn } from '@/lib/utils';

export default function Navbar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 40);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <>
            <header
                className={cn(
                    'fixed inset-0 z-10 flex flex-col',
                    'transition-colors duration-300',
                    scrolled ? 'bg-background/50 text-black' : 'text-white'
                )}
                style={{ height: 'var(--navbar-height)' }}
            >
                <nav className='grow flex items-center px-4'>
                    <div className='flex items-center absolute'>
                        <HamburgerButtonPortal
                            open={sidebarOpen}
                            onClick={() => setSidebarOpen(prev => !prev)}
                            color={scrolled ? 'foreground' : 'muted'}
                            isAdmin={false}
                        />
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

