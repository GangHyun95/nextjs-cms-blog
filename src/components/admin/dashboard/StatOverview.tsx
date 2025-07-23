import { BarChartBig } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import Card from '@/components/ui/card';
import { fetchAnalyticsSummary } from '@/service/server/analytics';

export default async function StatOverview({ showStatsLink = true }: { showStatsLink?: boolean }) {
    const { data: summary } = await fetchAnalyticsSummary();

    const views = [
        { label: '오늘 조회수', value: summary.views.today.toLocaleString() },
        { label: '어제 조회수', value: summary.views.yesterday.toLocaleString() },
        { label: '누적 조회수', value: summary.views.total.toLocaleString() },
    ];

    const visitors = [
        { label: '오늘 방문자', value: summary.users.today.toLocaleString() },
        { label: '어제 방문자', value: summary.users.yesterday.toLocaleString() },
        { label: '누적 방문자', value: summary.users.total.toLocaleString() },
    ];

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

            {showStatsLink && (
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
