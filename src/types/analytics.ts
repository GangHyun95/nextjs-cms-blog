export type ApiResponse<T> = {
    success: boolean;
    data: T;
    message: string;
};

export type AnalyticsSummary = {
    today: number;
    yesterday: number;
    total: number;
};

export type AnalyticsDaily = {
    date: string;
    views: number;
    users: number;
};

export type StatsData = {
    label: string;
    value: string;
};
