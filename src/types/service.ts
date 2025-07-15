export type ApiResponse<T> = {
    success: boolean;
    data: T,
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