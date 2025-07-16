'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import BarChart from '../chart/BarChart';
import StatGroup from './StatGroup';
import Card from '@/components/ui/card';
import { fetchAnalyticsTimeseries } from '@/service/server/analytics';

const temp = 31;

const statGroups = [
    {
        title: '검색',
        data: [
            { label: '네이버', value: 5 },
            { label: '다음', value: 3 },
            { label: '구글', value: 12 },
            { label: '기타', value: 0 },
        ],
    },
    {
        title: 'SNS',
        data: [
            { label: '카카오톡', value: 6 },
            { label: '페이스북', value: 0 },
            { label: '인스타그램', value: 5 },
            { label: '기타 SNS', value: 0 },
        ],
    },
    {
        title: '브라우저',
        data: [
            { label: 'Chrome', value: 78 },
            { label: 'Safari', value: 15 },
            { label: 'Firefox', value: 0 },
            { label: 'Edge', value: 7 },
        ],
    },
    {
        title: '디바이스',
        data: [
            { label: 'PC', value: 0 },
            { label: '모바일', value: 0 },
        ],
    },
];

export default function ChartSection() {
    const [metric, setMetric] = useState<'views' | 'users'>('views');
    const [mode, setMode] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const test = await fetchAnalyticsTimeseries(21, 0, 'date', false);
                const test2 = await fetchAnalyticsTimeseries(15, 0, 'yearWeek', false);
                const test3 = await fetchAnalyticsTimeseries(12, 0, 'yearMonth', false);
                console.log(test);
                console.log(test2);
                console.log(test3)
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <Card as='section' padding='md' className='relative mt-1'>
            <div className='flex'>
                <h3 className='text-xl font-semibold flex-1'>2025.07</h3>
                <div className='flex gap-4'>
                    <div className='inline-flex rounded-xs overflow-hidden [&>*]:not-last:border-r-0'>
                        <Button
                            variant='outline'
                            size='xs'
                            className={`text-xs rounded-none ${metric === 'views' ? 'bg-muted-foreground text-white' : ''}`}
                            onClick={() => setMetric('views')}
                        >
                            조회수
                        </Button>
                        <Button
                            variant='outline'
                            size='xs'
                            className={`text-xs rounded-none ${metric === 'users' ? 'bg-muted-foreground text-white' : ''}`}
                            onClick={() => setMetric('users')}
                        >
                            방문자
                        </Button>
                    </div>

                    <div className='inline-flex rounded-xs overflow-hidden ml-2 [&>*]:not-last:border-r-0'>
                        <Button
                            variant='outline'
                            size='xs'
                            className={`text-xs rounded-none ${mode === 'daily' ? 'bg-muted-foreground text-white' : ''}`}
                            onClick={() => setMode('daily')}
                        >
                            일간
                        </Button>
                        <Button
                            variant='outline'
                            size='xs'
                            className={`text-xs rounded-none ${mode === 'weekly' ? 'bg-muted-foreground text-white' : ''}`}
                            onClick={() => setMode('weekly')}
                        >
                            주간
                        </Button>
                        <Button
                            variant='outline'
                            size='xs'
                            className={`text-xs rounded-none ${mode === 'monthly' ? 'bg-muted-foreground text-white' : ''}`}
                            onClick={() => setMode('monthly')}
                        >
                            월간
                        </Button>
                    </div>
                </div>
            </div>

            <div className='relative border-b'>
                <BarChart metric={metric} displayMode={mode} />
            </div>

            <div className='flex flex-col mt-10 pl-2.5 gap-10 xl:flex-row'>
                {statGroups.map((group) => (
                    <StatGroup key={group.title} group={group} totalViews={temp} />
                ))}
            </div>
        </Card>
    );
}
