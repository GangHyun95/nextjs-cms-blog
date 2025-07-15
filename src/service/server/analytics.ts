import { AnalyticsSummary, ApiResponse } from '@/types/service';

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