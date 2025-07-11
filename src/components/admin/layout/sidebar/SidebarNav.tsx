'use client';

import Link from 'next/link';
import { BarChartBig, BookOpenText, FileText, Folders, LayoutDashboard, MessageCircle, Route } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type NavItem = {
    label: string;
    href: string;
    icon: LucideIcon;
};

type NavSection = {
    title: string;
    items: NavItem[];
};

const navSections: NavSection[] = [
    {
        title: '블로그 관리 홈',
        items: [
            { label: '대시보드', href: '/admin', icon: LayoutDashboard },
        ],
    },
    {
        title: '콘텐츠',
        items: [
            { label: '글관리', href: '/admin/manage/posts', icon: FileText },
            { label: '카테고리관리', href: '/admin/manage/categories', icon: Folders },
            { label: '댓글 관리', href: '/admin/manage/comments', icon: MessageCircle },
            { label: '방명록 관리', href: '/admin/manage/guestbook', icon: BookOpenText },
        ],
    },
    {
        title: '통계',
        items: [
            { label: '방문 통계', href: '/admin/stats/visits', icon: BarChartBig },
            { label: '유입 경로', href: '/admin/stats/referrers', icon: Route },
        ],
    },
];

export default function SidebarNav() {
    const pathname = usePathname();
    return (
        <div className='mt-6 space-y-4'>
            {navSections.map((section) => (
                <div key={section.title}>
                    <h2 className='text-xs text-muted-foreground font-semibold mb-2'>
                        {section.title}
                    </h2>
                    <ul className='space-y-1'>
                        {section.items.map(({ label, href, icon: Icon }) => {
                            const isActive = pathname === href;

                            return (
                                <li key={label}>
                                    <Link
                                        href={href}
                                        className={cn(
                                            'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted',
                                            isActive ? 'text-primary' : 'text-muted-foreground'
                                        )}
                                    >
                                        <Icon className='w-5 h-5' />
                                        <span>{label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </div>
    );
}
