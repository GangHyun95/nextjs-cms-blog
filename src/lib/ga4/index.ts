import { BetaAnalyticsDataClient } from '@google-analytics/data';

import { formatDate } from '@/utils/date';

const client = new BetaAnalyticsDataClient({
    credentials: JSON.parse(process.env.GA4_CREDENTIALS!),
});

function getDateRange(days: number, offset = 0) {
    const end = new Date();
    end.setDate(end.getDate() - offset);

    const start = new Date(end);
    start.setDate(end.getDate() - days + 1);
    return { startDate: formatDate(start), endDate: formatDate(end) };
}

export async function getViews(days: number, offset: number, dimension: 'date'|'yearWeek'|'yearMonth' = 'date') {
    const { startDate, endDate } = getDateRange(days, offset);

    const [res] = await client.runReport({
        property: `properties/${process.env.GA4_PROPERTY_ID}`,
        dateRanges: [{ startDate: startDate, endDate: endDate }],
        dimensions: [{ name: dimension }],
        metrics: [{ name: 'screenPageViews' }],
        keepEmptyRows: true,
    });

    const result = res.rows?.map((row) => ({
        date: row.dimensionValues?.[0].value ?? '',
        views: Number(row.metricValues?.[0].value ?? 0),
    }));

    return result ?? [];
}

export async function getUsers(days: number, offset: number, dimension: 'date'|'yearWeek'|'yearMonth' = 'date') {
    const { startDate, endDate } = getDateRange(days, offset);

    const [res] = await client.runReport({
        property: `properties/${process.env.GA4_PROPERTY_ID}`,
        dateRanges: [{ startDate: startDate, endDate: endDate }],
        dimensions: [{ name: dimension }],
        metrics: [{ name: 'activeUsers' }],
        keepEmptyRows: true,
    });

    const result = res.rows?.map((row) => ({
        date: row.dimensionValues?.[0].value ?? '',
        users: Number(row.metricValues?.[0].value ?? 0),
    }));

    return result ?? [];
}

export async function getDeviceStats(days: number, offset: number) {
    const { startDate, endDate } = getDateRange(days, offset);

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

export async function getBrowserStats(days: number, offset: number) {
    const { startDate, endDate } = getDateRange(days, offset);

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

export async function getReferralStats(days: number, offset: number) {
    const { startDate, endDate } = getDateRange(days, offset);

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

export async function getSocialStats(days: number, offset: number) {
    const { startDate, endDate } = getDateRange(days, offset);

    const [res] = await client.runReport({
        property: `properties/${process.env.GA4_PROPERTY_ID}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'sourcePlatform' }],
        metrics: [{ name: 'activeUsers' }],
    });

    const result = res.rows?.map((row) => ({
        platform: row.dimensionValues?.[0].value ?? '',
        activeUsers: Number(row.metricValues?.[0].value ?? 0),
    }));

    return result ?? [];
}

export async function getSourceStats(days: number, offset: number) {
    const { startDate, endDate } = getDateRange(days, offset);

    const [res] = await client.runReport({
        property: `properties/${process.env.GA4_PROPERTY_ID}`,
        dateRanges: [{ startDate, endDate }],
        dimensions: [{ name: 'sessionSource' }],
        metrics: [{ name: 'activeUsers' }],
    });

    return res.rows?.map((row) => ({
        source: row.dimensionValues?.[0].value ?? '',
        activeUsers: Number(row.metricValues?.[0].value ?? 0),
    })) ?? [];
}
