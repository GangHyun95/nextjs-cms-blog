'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import HamburgerButton from './HamburgerButton';
import { cn } from '@/lib/utils';

type Props = {
    open: boolean;
    onClick: () => void;
    color?: 'foreground' | 'muted';
    isAdmin?: boolean;
};

export default function HamburgerButtonPortal({ open, onClick, color, isAdmin=true }: Props) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    const hiddenClass = isAdmin ? 'md:hidden' : '2xl:hidden';
    return createPortal(
        <div
            className={cn('fixed left-4 z-50', hiddenClass)}
            style={{ top: 'calc(var(--navbar-height) / 2 - 1.375rem)' }}
        >
            <HamburgerButton
                open={open}
                onClick={onClick}
                color={color}
            />
        </div>,
        document.body
    );
}

