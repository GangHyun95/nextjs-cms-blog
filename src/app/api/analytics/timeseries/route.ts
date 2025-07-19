import { getViews, getUsers } from '@/lib/ga4';
import { formatDate, parseCompactDate, parseYearMonth, parseYearWeek } from '@/utils/date';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const days = parseInt(searchParams.get('days') || '30', 10);
        const offset = parseInt(searchParams.get('offset') || '0', 10);
        const mode = (searchParams.get('mode') ?? 'date') as 'date' | 'yearWeek' | 'yearMonth';

        const [viewsList, usersList] = await Promise.all([
            getViews(days, offset, mode),
            getUsers(days, offset, mode),
        ]);
        
        let labels: string[] = [];
        const now = new Date();
        now.setDate(now.getDate() - offset);

        if (mode === 'date') {
            labels = Array.from({ length: days }, (_, i) => {
                const date = new Date(now);
                date.setDate(date.getDate() - (days - 1) + i);
                return formatDate(date);
            });
        } else if (mode === 'yearWeek') {
            for (let i = days - 1; i >= 0; i--) {
                const date = new Date(now);
                date.setDate(date.getDate() - i * 7);
                const day = date.getDay() || 7;
                date.setDate(date.getDate() - (day - 1));

                labels.push(formatDate(date));
            }
        } else if (mode === 'yearMonth') {
            for (let i = days - 1; i >= 0; i--) {
                const date = new Date(now);
                date.setMonth(date.getMonth() - i);
                date.setDate(1);
                labels.push(formatDate(date));
            }
        }

        const viewsByDate: Record<string, number> = {};
        for (let i = 0; i < viewsList.length; i++) {
            const item = viewsList[i];
            const key = (
                mode === 'yearWeek' ? parseYearWeek :
                mode === 'yearMonth' ? parseYearMonth :
                parseCompactDate
            )(item.date);
            viewsByDate[key] = item.views;
        }

        const usersByDate: Record<string, number> = {};
        for (let i = 0; i < usersList.length; i++) {
            const item = usersList[i];
            const key = (
                mode === 'yearWeek' ? parseYearWeek :
                mode === 'yearMonth' ? parseYearMonth :
                parseCompactDate
            )(item.date);
            usersByDate[key] = item.users;
        }

        const merged = labels.map(date => ({
            date,
            views: viewsByDate[date] ?? 0,
            users: usersByDate[date] ?? 0,
        }));

        return Response.json({
            success: true,
            message: 'GA4 요약 데이터를 성공적으로 불러왔습니다.',
            data: { timeseries: merged },
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
