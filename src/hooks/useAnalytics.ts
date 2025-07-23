import { useState, useCallback } from 'react';

import { fetchAnalyticsTimeseries, fetchChannelStats, fetchSourceStats, fetchTrafficStats } from '@/service/server/analytics';

export function useAnalyticsTimeseries() {
    const [isLoading, setIsLoading] = useState(false);

    const fetchTimeseries = useCallback(async (days: number, offset = 0, mode: 'date' | 'yearWeek' | 'yearMonth' = 'date') => {
        setIsLoading(true);
        try {
            const { data } = await fetchAnalyticsTimeseries(days, offset, mode, false);
            return data.timeseries;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { fetchTimeseries, isLoading };
}


export function useAnalyticsStats() {
    const [isLoading, setIsLoading] = useState(false);

    const fetchStats = useCallback(async (days: number, offset: number = 0) => {
        setIsLoading(true);
        try {
            const [source, traffic] = await Promise.all([
                fetchSourceStats(days, offset, false),
                fetchTrafficStats(days, offset, false),
            ]);

            return {
                searchStats: source.data.searchStats,
                snsStats: source.data.snsStats,
                deviceStats: traffic.data.deviceStats,
                browserStats: traffic.data.browserStats,
            };
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { fetchStats, isLoading };
}