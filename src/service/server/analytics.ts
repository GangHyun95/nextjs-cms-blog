import { AnalyticsDaily, AnalyticsSummary, ApiResponse, ChannelStatsData, TrafficStatsData } from '@/types/service';

export async function fetchAnalyticsSummary(): Promise<ApiResponse<AnalyticsSummary>> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/analytics/summary`, {
        next: { revalidate: 600 },
    });

    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data;
}

export async function fetchAnalyticsDaily(days: number): Promise<ApiResponse<{ daily: AnalyticsDaily[] }>> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/analytics/daily?days=${days}`, {
        next: { revalidate: 600 },
    });

    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data;
}

export async function fetchTrafficStats(days: number): Promise<ApiResponse<TrafficStatsData>> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/analytics/traffic?days=${days}`, {
        next: { revalidate: 600 },
    });

    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data;
}

export async function fetchChannelStats(days: number): Promise<ApiResponse<ChannelStatsData>> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/analytics/channel?days=${days}`, {
        next: { revalidate: 600 },
    });

    const data = await res.json();

    if (!data.success) {
        throw new Error(data.message);
    }

    return data;
}