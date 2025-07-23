'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useMemo } from 'react';
import { Ellipsis, Folder, Layers } from 'lucide-react';

type NavItem = {
    label: string;
    count: number;
};

type NavSection = {
    title: string;
    items: NavItem[];
};

const navSections: NavSection[] = [
    {
        title: '프론트엔드',
        items: [
            { label: 'React', count: 35 },
            { label: 'Next.js', count: 12 },
        ],
    },
    {
        title: '백엔드',
        items: [
            { label: 'Node.js', count: 22 },
            { label: 'Express.js', count: 8 },
        ],
    },
    {
        title: '데이터베이스',
        items: [
            { label: 'PostgreSQL', count: 19 },
            { label: 'MongoDB', count: 27 },
            { label: 'Supabase', count: 11 },
        ],
    },
];

export default function SidebarNav() {
    const pathname = usePathname();

    const navData = useMemo(() =>
        navSections.map(section => ({
            ...section,
            items: section.items.map(item => {
                const href = `/category/${encodeURIComponent(section.title)}/${encodeURIComponent(item.label)}`;
                return {
                    ...item,
                    href,
                    isActive: pathname === href,
                };
            }),
        })),
    [pathname]);

    return (
        <div className='mt-6 space-y-4'>
            {navData.map((section) => (
                <div key={section.title}>
                    <h2 className='flex items-center text-xs text-muted-foreground font-semibold mb-2'>
                        <Layers className='size-3.5 mr-2'/>
                        <span>{section.title}</span>
                    </h2>
                    <ul className='space-y-1'>
                        {section.items.map(({ label, href, isActive, count }) => (
                            <li key={label}>
                                <Link
                                    href={href}
                                    className={cn(
                                        'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted',
                                        isActive ? 'text-primary' : 'text-muted-foreground'
                                    )}
                                >
                                    <span className='space-x-1'>
                                        <span>{label}</span>
                                        <span className='text-[12px]'>({count})</span>
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
