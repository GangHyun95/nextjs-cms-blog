import { getDailyViews, getDailyUsers } from '@/lib/ga4';
import { formatToYYYYMMDD } from '@/lib/utils';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const days = parseInt(searchParams.get('days') || '30', 10);

        const [viewsList, usersList] = await Promise.all([
            getDailyViews(days),
            getDailyUsers(days),
        ]);

        const now = new Date();
        const labels = Array.from({ length: days }, (_, i) => {
            const date = new Date();
            date.setDate(now.getDate() - (days - 1) + i);
            return formatToYYYYMMDD(date);
        });
        
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

        const merged = labels.map(date => ({
            date,
            views: viewsByDate[date] ?? 0,
            users: usersByDate[date] ?? 0,
        }));

        return Response.json({
            success: true,
            message: 'GA4 요약 데이터를 성공적으로 불러왔습니다.',
            data: { daily: merged },
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
