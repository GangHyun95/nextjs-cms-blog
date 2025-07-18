'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import BarChart from '../chart/BarChart';
import StatGroup from './StatGroup';
import Card from '@/components/ui/card';
import type { StatsData } from '@/types/service';
import { getDisplayLabel } from '@/lib/utils';

type StatGroup = {
    title: string;
    data: StatsData[];
};

export default function ChartSection() {
    const [metric, setMetric] = useState<'views' | 'users'>('views');
    const [mode, setMode] = useState<'date' | 'yearWeek' | 'yearMonth'>('date');
    const [selection, setSelection] = useState<{ offset: number; days: number } | null>(null);

    const metricButtons: { key: 'views' | 'users'; label: string }[] = [
        { key: 'views', label: '조회수' },
        { key: 'users', label: '방문자' },
    ];

    const modeButtons: { key: 'date' | 'yearWeek' | 'yearMonth'; label: string }[] = [
        { key: 'date', label: '일간' },
        { key: 'yearWeek', label: '주간' },
        { key: 'yearMonth', label: '월간' },
    ];

    useEffect(() => {
        const offset = 0;
        const days = mode === 'date' ? 1 : mode === 'yearWeek' ? 7 : 30;
        setSelection({ offset, days });
    }, [mode]);
    
    const handleSelectLabel = (label: string) => {
        const today = new Date();
        const clicked = new Date(label);

        today.setHours(0, 0, 0, 0);
        clicked.setHours(0, 0, 0, 0);

        const days = mode === 'date' ? 1 : mode === 'yearWeek' ? 7 : 30;
        const offset = Math.round((today.getTime() - clicked.getTime()) / (1000 * 60 * 60 * 24)) - (days - 1);
        setSelection({ offset, days });
    };

    return (
        <Card as='section' padding='md' className='relative mt-1'>
            <div className='flex items-center'>
                <h3 className='text-xl font-semibold flex-1'>{getDisplayLabel(selection, mode)}</h3>

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
            
            <div className='relative border-b mt-5'>
                <BarChart
                    metric={metric}
                    mode={mode}
                    handleSelectLabel={handleSelectLabel}
                />
            </div>

            <div className='mt-10'>
                <div className='text-lg'>{getDisplayLabel(selection, mode)} 방문자 통계</div>
                <StatGroup selection={selection} />
            </div>
        </Card>
    );
}
