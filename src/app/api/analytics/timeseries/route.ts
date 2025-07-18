import { getViews, getUsers } from '@/lib/ga4';
import { formatToYYYYMMDD, formatYearWeek } from '@/lib/utils';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const days = parseInt(searchParams.get('days') || '30', 10);
        const offset = parseInt(searchParams.get('offset') || '0', 10);
        const period = (searchParams.get('period') ?? 'date') as 'date' | 'yearWeek' | 'yearMonth';

        const [viewsList, usersList] = await Promise.all([
            getViews(days, offset, period),
            getUsers(days, offset, period),
        ]);
        
        let labels: string[] = [];
        const now = new Date();
        now.setDate(now.getDate() - offset);

        if (period === 'date') {
            labels = Array.from({ length: days }, (_, i) => {
                const date = new Date(now);
                date.setDate(date.getDate() - (days - 1) + i);
                return formatToYYYYMMDD(date);
            });
        } else if (period === 'yearWeek') {
            for (let i = days - 1; i >= 0; i--) {
                const date = new Date(now);
                date.setDate(date.getDate() - i * 7);

                const year = date.getFullYear();
                const jan4 = new Date(year, 0, 4);
                const dayOfWeek = jan4.getDay();
                const isoWeekStart = new Date(jan4);

                isoWeekStart.setDate(jan4.getDate() - ((dayOfWeek + 6) % 7));
                const diff = Math.floor((date.getTime() - isoWeekStart.getTime()) / (1000 * 60 * 60 * 24));
                const week = Math.ceil((diff + 1) / 7);
                labels.push(`${year}W${String(week).padStart(2, '0')}`);
            }
        } else if (period === 'yearMonth') {
            for (let i = days - 1; i >= 0; i--) {
                const date = new Date(now);
                date.setMonth(date.getMonth() - i);
                labels.push(`${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}`);
            }
        }
        
        const viewsByDate: Record<string, number> = {};
        for (let i = 0; i < viewsList.length; i++) {
            const item = viewsList[i];
            const key = period === 'yearWeek' ? formatYearWeek(item.date) : item.date;
            viewsByDate[key] = item.views;
        }

        const usersByDate: Record<string, number> = {};
        for (let i = 0; i < usersList.length; i++) {
            const item = usersList[i];
            const key = period === 'yearWeek' ? formatYearWeek(item.date) : item.date;
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
