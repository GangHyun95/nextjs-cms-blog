'use client';

import { useEffect, useState } from 'react';

import { StatSpinner } from '@/components/Spinner';
import { useAnalyticsStats } from '@/hooks/useAnalytics';

import StatCountGroup from './StatCountGroup';
import StatPercentGroup from './StatPercentGroup';


type StatItem = {
    label: string;
    value: number | string;
};

type Props = {
    selection: { offset: number; days: number } | null;
};

export default function StatGroup({ selection }: Props) {
    const [data, setData] = useState<{
        searchStats: StatItem[];
        snsStats: StatItem[];
        browserStats: StatItem[];
        deviceStats: StatItem[];
    } | null>(null);
    const { fetchStats, isLoading } = useAnalyticsStats();

    useEffect(() => {
        if (!selection) return;

        const load = async () => {
            const { searchStats, snsStats, browserStats, deviceStats } = await fetchStats(
                selection.days,
                selection.offset
            );
            setData({ searchStats, snsStats, browserStats, deviceStats });
        };

        load();
    }, [selection, fetchStats]);

    if (isLoading || !data) return <StatSpinner />

    return (
        <div className='flex flex-col mt-10 pl-2.5 gap-10 xl:flex-row'>
            <StatCountGroup title='검색' data={data.searchStats} />
            <StatCountGroup title='SNS' data={data.snsStats} />
            <StatPercentGroup title='브라우저' data={data.browserStats} />
            <StatPercentGroup title='디바이스' data={data.deviceStats} />
        </div>
    );
}
