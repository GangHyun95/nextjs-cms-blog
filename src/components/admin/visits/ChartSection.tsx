'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import BarChart from '../chart/BarChart';
import StatGroup from './StatGroup';
import Card from '@/components/ui/card';
import { useAnalyticsTimeseries } from '@/hooks/useAnalyticsTimeseries';
import type { AnalyticsDaily } from '@/types/service';
import { ChartSpinner } from '@/components/Spinner';

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
    const [mode, setMode] = useState<'date' | 'yearWeek' | 'yearMonth'>('date');
    const [offset, setOffset] = useState(0);
    const [timeseries, setTimeseries] = useState<AnalyticsDaily[]>([]);
    const { fetchTimeseries, isLoading } = useAnalyticsTimeseries();

    useEffect(() => {
        const count = mode === 'date' ? 21 : mode === 'yearWeek' ? 15 : 12;

        const loadData = async () => {
            const data = await fetchTimeseries(count, offset, mode);
            setTimeseries(data);
        };

        loadData();
    }, [mode, offset, fetchTimeseries]);
    
    const metricButtons: { key: 'views' | 'users'; label: string }[] = [
        { key: 'views', label: '조회수' },
        { key: 'users', label: '방문자' },
    ];

    const modeButtons: { key: 'date' | 'yearWeek' | 'yearMonth'; label: string }[] = [
        { key: 'date', label: '일간' },
        { key: 'yearWeek', label: '주간' },
        { key: 'yearMonth', label: '월간' },
    ];

    return (
        <Card as='section' padding='md' className='relative mt-1'>
            <div className='flex items-center'>
                <h3 className='text-xl font-semibold flex-1'>2025.07</h3>

                <div className='flex gap-4'>
                    <div className='inline-flex rounded-xs overflow-hidden [&>*]:not-last:border-r-0'>
                        {metricButtons.map(({ key, label }) => (
                            <Button
                                key={key}
                                variant='outline'
                                size='xs'
                                className={`text-xs rounded-none ${metric === key ? 'bg-muted-foreground text-white' : ''}`}
                                onClick={() => setMetric(key)}
                            >
                                {label}
                            </Button>
                        ))}
                    </div>

                    <div className='inline-flex rounded-xs overflow-hidden ml-2 [&>*]:not-last:border-r-0'>
                        {modeButtons.map(({ key, label }) => (
                            <Button
                                key={key}
                                variant='outline'
                                size='xs'
                                className={`text-xs rounded-none ${mode === key ? 'bg-muted-foreground text-white' : ''}`}
                                onClick={() => setMode(key)}
                            >
                                {label}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className='relative border-b'>
                {isLoading ? (
                    <ChartSpinner />
                ) : (
                    <BarChart
                        metric={metric}
                        displayMode={mode}
                        data={timeseries}
                        offset={offset}
                        setOffset={setOffset}
                    />
                )}
            </div>

            <div className='flex flex-col mt-10 pl-2.5 gap-10 xl:flex-row'>
                {statGroups.map((group) => (
                    <StatGroup key={group.title} group={group} totalViews={0} />
                ))}
            </div>
        </Card>
    );
}
