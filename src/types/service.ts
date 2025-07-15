export type ApiResponse<T> = {
    success: boolean;
    data: T;
    message: string;
};

export type AnalyticsSummary = {
    views: {
        today: number;
        yesterday: number;
        total: number;
    };
    users: {
        today: number;
        yesterday: number;
        total: number;
    };
};

export type AnalyticsDaily = {
    date: string;
    views: number;
    users: number;
};

export type TrafficStatsData = {
    deviceStats: { label: string; value: string }[];
    browserStats: { label: string; value: string }[];
};