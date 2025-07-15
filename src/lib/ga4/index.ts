import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { formatToYYYY_MM_DD } from '../utils';

const client = new BetaAnalyticsDataClient({
    credentials: JSON.parse(process.env.GA4_CREDENTIALS!),
});

function getDateRange(days: number) {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days + 1);
    return { startDate: formatToYYYY_MM_DD(start), endDate: formatToYYYY_MM_DD(end) };
}

export async function getDailyViews(days: number) {
    const { startDate, endDate } = getDateRange(days);

    const [res] = await client.runReport({
        property: `properties/${process.env.GA4_PROPERTY_ID}`,
        dateRanges: [{ startDate: startDate, endDate: endDate }],
        dimensions: [{ name: 'date' }],
        metrics: [{ name: 'screenPageViews' }],
        keepEmptyRows: true,
    });

    const result = res.rows?.map((row) => ({
        date: row.dimensionValues?.[0].value ?? '',
        views: Number(row.metricValues?.[0].value ?? 0),
    }));

    return result ?? [];
}

export async function getDailyUsers(days: number) {
    const { startDate, endDate } = getDateRange(days);

    const [res] = await client.runReport({
        property: `properties/${process.env.GA4_PROPERTY_ID}`,
        dateRanges: [{ startDate: startDate, endDate: endDate }],
        dimensions: [{ name: 'date' }],
        metrics: [{ name: 'activeUsers' }],
        keepEmptyRows: true,
    });

    const result = res.rows?.map((row) => ({
        date: row.dimensionValues?.[0].value ?? '',
        users: Number(row.metricValues?.[0].value ?? 0),
    }));

    return result ?? [];
}

export async function getDeviceStats(days: number) {
    const { startDate, endDate } = getDateRange(days);

    const [res] = await client.runReport({
        property: `properties/${process.env.GA4_PROPERTY_ID}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'activeUsers' }],
    });

    const result = res.rows?.map((row) => ({
        deviceCategory: row.dimensionValues?.[0].value ?? '',
        activeUsers: Number(row.metricValues?.[0].value ?? 0),
    }));

    return result ?? [];
}

export async function getBrowserStats(days: number) {
    const { startDate, endDate } = getDateRange(days);

    const [res] = await client.runReport({
        property: `properties/${process.env.GA4_PROPERTY_ID}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'browser' }],
        metrics: [{ name: 'activeUsers' }],
    });

    const result = res.rows?.map((row) => ({
        browser: row.dimensionValues?.[0].value ?? '',
        activeUsers: Number(row.metricValues?.[0].value ?? 0),
    }));

    return result ?? [];
}

export async function getReferralStats(days: number) {
    const { startDate, endDate } = getDateRange(days);

    const [res] = await client.runReport({
        property: `properties/${process.env.GA4_PROPERTY_ID}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'activeUsers' }],
    });

    const result = res.rows?.map((row) => ({
        channel: row.dimensionValues?.[0].value ?? '',
        activeUsers: Number(row.metricValues?.[0].value ?? 0),
    }));

    return result ?? [];
}