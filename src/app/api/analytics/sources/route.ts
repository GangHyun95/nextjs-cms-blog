import { getSourceStats, getSocialStats } from '@/lib/ga4';

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const days = parseInt(searchParams.get('days') || '7', 10);
        const offset = parseInt(searchParams.get('offset') || '0', 10);

        const [sourceStats, socialStats] = await Promise.all([
            getSourceStats(days, offset),
            getSocialStats(days, offset),
        ]);

        const searchStats = [
            { label: '네이버', value: 0 },
            { label: '다음', value: 0 },
            { label: '구글', value: 0 },
            { label: '기타', value: 0 },
        ];

        for (let i = 0; i < sourceStats.length; i++) {
            const { source, activeUsers } = sourceStats[i];
            if (source === 'naver') searchStats[0].value += activeUsers;
            else if (source === 'daum') searchStats[1].value += activeUsers;
            else if (source === 'google') searchStats[2].value += activeUsers;
            else searchStats[3].value += activeUsers;
        }

        const snsStats = [
            { label: '카카오톡', value: 0 },
            { label: '페이스북', value: 0 },
            { label: '인스타그램', value: 0 },
            { label: '기타 SNS', value: 0 },
        ];

        for (let i = 0; i < socialStats.length; i++) {
            const { platform, activeUsers } = socialStats[i];
            if (platform === 'KakaoTalk') snsStats[0].value += activeUsers;
            else if (platform === 'Facebook') snsStats[1].value += activeUsers;
            else if (platform === 'Instagram') snsStats[2].value += activeUsers;
            else snsStats[3].value += activeUsers;
        }

        return Response.json({
            success: true,
            message: '검색 및 SNS 통계를 성공적으로 불러왔습니다.',
            data: { searchStats, snsStats },
        });
    } catch (error) {
        console.error('[SourcesStats ERROR]', error);
        return Response.json(
            {
                success: false,
                message: '검색 및 SNS 통계를 불러오지 못했습니다.',
            },
            { status: 500 }
        );
    }
}
