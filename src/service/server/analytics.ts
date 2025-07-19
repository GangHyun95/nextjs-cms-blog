import { AnalyticsDaily, AnalyticsSummary, ApiResponse, StatsData  } from '@/types/analytics';

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
    mode: 'date' | 'yearWeek' | 'yearMonth' = 'date',
    isServer: boolean = true
): Promise<ApiResponse<{ timeseries: AnalyticsDaily[] }>> {
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/analytics/timeseries?days=${days}&offset=${offset}&mode=${mode}`;
    const options = isServer ? { next: { revalidate: 600 } } : {};

    const res = await fetch(url, options);
    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data;
}

export async function fetchTrafficStats(days: number, offset:number = 0, isServer: boolean = true): Promise<ApiResponse<{ deviceStats: StatsData[]; browserStats: StatsData[] }>> {
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/analytics/traffic?days=${days}&offset=${offset}`;
    const options = isServer ? { next: { revalidate: 600 } } : {};
    
    const res = await fetch(url, options);
    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data;
}

export async function fetchChannelStats(days: number, offset:number = 0, isServer: boolean = true): Promise<ApiResponse<{ channelStats: StatsData[] }>> {
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/analytics/channel?days=${days}&offset=${offset}`;
    const options = isServer ? { next: { revalidate: 600 } } : {};

    
    const res = await fetch(url, options);
    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data;
}

export async function fetchSourceStats(days: number, offset = 0, isServer = true): Promise<ApiResponse<{ searchStats: StatsData[]; snsStats: StatsData[] }>> {
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/api/analytics/sources?days=${days}&offset=${offset}`;
    const options = isServer ? { next: { revalidate: 600 } } : {};

    const res = await fetch(url, options);
    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data;
}