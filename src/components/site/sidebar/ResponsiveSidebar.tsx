'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import SidebarContent from './SidebarContent';
import { usePathname } from 'next/navigation';

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function ResponsiveSidebar({ open, onClose }: Props) {
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [open, onClose]);

    useEffect(() => {
        if (open) onClose();
    },[pathname])

    if (!mounted) return null;

    return createPortal(
        <div
            className={cn(
                'fixed inset-0 2xl:hidden',
                open ? 'pointer-events-auto' : 'pointer-events-none'
            )}
        >
            <div
                className={cn(
                    'absolute inset-0 bg-black/50 transition-opacity duration-300',
                    open ? 'opacity-100' : 'opacity-0'
                )}
                onClick={onClose}
            />

            <aside
                className={cn(
                    'absolute inset-y-0 left-0 bg-white shadow-md transform transition-transform duration-300 ease-in-out',
                    open ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <SidebarContent />
            </aside>
        </div>,
        document.body
    );
}
