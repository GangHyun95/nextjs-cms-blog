import { getDailyViews, getDailyUsers } from '@/lib/ga4';
import { formatToYYYYMMDD } from '@/lib/utils';

export async function GET() {
    try {
        const since = new Date('2025-07-01');
        const today = new Date();
        const days = Math.floor((today.getTime() - since.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const todayStr = formatToYYYYMMDD(today);
        const yesterdayStr = formatToYYYYMMDD(yesterday);

        const [viewsList, usersList] = await Promise.all([getDailyViews(days, 0), getDailyUsers(days, 0)]);

        const totalViews = viewsList.reduce((sum, data) => sum + data.views, 0);
        const totalUsers = usersList.reduce((sum, data) => sum + data.users, 0);
        
        const viewsByDate: Record<string, number> = {};
        for (let i = 0; i < viewsList.length; i++) {
            const item = viewsList[i];
            viewsByDate[item.date] = item.views;
        }

        const usersByDate: Record<string, number> = {};
        for (let i = 0; i < usersList.length; i++) {
            const item = usersList[i];
            usersByDate[item.date] = item.users;
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
