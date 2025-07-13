'use client';

import { Button } from '@/components/ui/button';
import Card from '@/components/ui/card';
import { BarChartBig } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const views = [
    { label: '오늘 조회수', value: '3' },
    { label: '어제 조회수', value: '12' },
    { label: '누적 조회수', value: '10,789' },
];

const visitors = [
    { label: '오늘 방문자', value: '1' },
    { label: '어제 방문자', value: '10' },
    { label: '누적 방문자', value: '1,234' },
];

export default function StatOverview() {
    const pathname = usePathname();
    return (
        <Card as='section' padding='md' className='flex flex-col items-stretch gap-6 lg:flex-row lg:items-center'>
            <div className='flex gap-x-6 flex-1'>
                {views.map((item, i) => (
                    <div key={i} className='flex-1 flex flex-col gap-y-1'>
                        <div className='text-sm text-muted-foreground'>{item.label}</div>
                        <div className='text-xl font-bold'>{item.value}</div>
                    </div>
                ))}
            </div>

            <div className='hidden mx-6 w-px h-10 bg-border lg:block' />

            <div className='flex gap-x-6 flex-1'>
                {visitors.map((item, i) => (
                    <div key={i} className='flex-1 flex flex-col gap-y-1'>
                        <div className='text-sm text-muted-foreground'>{item.label}</div>
                        <div className='text-xl font-bold'>{item.value}</div>
                    </div>
                ))}
            </div>

            {pathname === '/admin' && (
                <Button asChild variant='outline' className='self-end lg:self-auto'>
                    <Link href='/admin/stats/visits'>
                        <BarChartBig className='h-4 w-4 mr-1' />
                        <span>통계</span>
                    </Link>
                </Button>
            )}
        </Card>
    );
}

