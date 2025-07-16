import { fetchAnalyticsTimeseries } from '@/service/server/analytics';
import { useState, useCallback } from 'react';

export function useAnalyticsTimeseries() {
    const [isLoading, setIsLoading] = useState(false);

    const fetchTimeseries = useCallback(async (days: number, offset = 0, period: 'date' | 'yearWeek' | 'yearMonth' = 'date') => {
        setIsLoading(true);
        try {
            const { data } = await fetchAnalyticsTimeseries(days, offset, period, false);
            return data.timeseries;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { fetchTimeseries, isLoading };
}
