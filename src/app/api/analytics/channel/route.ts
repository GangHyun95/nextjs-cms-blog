import { getReferralStats } from '@/lib/ga4';

const CHANNEL_CATEGORIES = ['검색', 'SNS', '기타'];

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const days = parseInt(searchParams.get('days') || '7', 10);
        
        const stats = await getReferralStats(days);

        const categoryMap: Record<string, string[]> = {
            '검색': ['Organic Search', 'Paid Search'],
            'SNS': ['Organic Social', 'Paid Social'],
        };

        const channelMap: Record<string, number> = {};
        for (let i = 0; i < CHANNEL_CATEGORIES.length; i++) {
            channelMap[CHANNEL_CATEGORIES[i]] = 0;
        }

        let totalUsers = 0;

        for (let i = 0; i < stats.length; i++) {
            const { channel, activeUsers } = stats[i];
            totalUsers += activeUsers;

            if (categoryMap['검색'].includes(channel)) {
                channelMap['검색'] += activeUsers;
            } else if (categoryMap['SNS'].includes(channel)) {
                channelMap['SNS'] += activeUsers;
            } else {
                channelMap['기타'] += activeUsers;
            }
        }

        const channelStats = CHANNEL_CATEGORIES.map(label => ({
            label,
            value: totalUsers ? `${((channelMap[label] / totalUsers) * 100).toFixed(1)}%` : '0%',
        }));

        return Response.json({
            success: true,
            message: '유입 채널 통계 데이터를 성공적으로 불러왔습니다.',
            data: { channelStats },
        });
    } catch (error) {
        console.error('[ReferralStats ERROR]', error);
        return Response.json(
            { success: false, message: '유입 통계 데이터를 불러오지 못했습니다.' },
            { status: 500 }
        );
    }
}
