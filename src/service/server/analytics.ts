import { AnalyticsDaily, AnalyticsSummary, ApiResponse, StatsData  } from '@/types/service';

export async function fetchAnalyticsSummary(): Promise<ApiResponse<{ views: AnalyticsSummary; users: AnalyticsSummary}>> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/analytics/summary`, {
        next: { revalidate: 600 },
    });

    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data;
}

export async function fetchAnalyticsTimeseries(
    days: number,
    offset: number = 0,
    period: 'date' | 'yearWeek' | 'yearMonth' = 'date',
    isServer: boolean = true
): Promise<ApiResponse<{ timeseries: AnalyticsDaily[] }>> {
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/analytics/timeseries?days=${days}&offset=${offset}&period=${period}`;
    const options = isServer ? { next: { revalidate: 600 } } : {};

    const res = await fetch(url, options);
    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data;
}

export async function fetchTrafficStats(days: number, offset:number = 0): Promise<ApiResponse<{ deviceStats: StatsData[]; browserStats: StatsData[] }>> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/analytics/traffic?days=${days}&offset=${offset}`, {
        next: { revalidate: 600 },
    });

    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data;
}

export async function fetchChannelStats(days: number, offset:number = 0): Promise<ApiResponse<{ channelStats: StatsData[] }>> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/analytics/channel?days=${days}&offset=${offset}`, {
        next: { revalidate: 600 },
    });

    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data;
}