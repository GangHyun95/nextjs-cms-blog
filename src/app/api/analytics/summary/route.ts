import { getUsers, getViews } from '@/lib/ga4';
import { formatDate, parseCompactDate } from '@/utils/date';

export async function GET() {
    try {
        const since = new Date('2025-07-01');
        const today = new Date();
        const days = Math.floor((today.getTime() - since.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const todayStr = formatDate(today);
        const yesterdayStr = formatDate(yesterday);

        const [viewsList, usersList] = await Promise.all([getViews(days, 0), getUsers(days, 0)]);

        const totalViews = viewsList.reduce((sum, data) => sum + data.views, 0);
        const totalUsers = usersList.reduce((sum, data) => sum + data.users, 0);
        
        const viewsByDate: Record<string, number> = {};
        for (let i = 0; i < viewsList.length; i++) {
            const item = viewsList[i];
            viewsByDate[parseCompactDate(item.date)] = item.views;
        }

        const usersByDate: Record<string, number> = {};
        for (let i = 0; i < usersList.length; i++) {
            const item = usersList[i];
            usersByDate[parseCompactDate(item.date)] = item.users;
        }

        return Response.json({
            success: true,
            message: 'GA4 요약 데이터를 성공적으로 불러왔습니다.',
            data: {
                views: {
                    today: viewsByDate[todayStr] ?? 0,
                    yesterday: viewsByDate[yesterdayStr] ?? 0,
                    total: totalViews,
                },
                users: {
                    today: usersByDate[todayStr] ?? 0,
                    yesterday: usersByDate[yesterdayStr] ?? 0,
                    total: totalUsers,
                },
            },
        });
    } catch (err) {
        console.error('[GA4 SUMMARY ERROR]', err);
        return Response.json(
            {
                success: false,
                message: 'GA4 데이터를 불러오지 못했습니다.',
            },
            { status: 500 }
        );
    }
}
