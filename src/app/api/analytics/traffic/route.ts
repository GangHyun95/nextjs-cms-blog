import { getDeviceStats, getBrowserStats } from '@/lib/ga4';

const DEVICE_CATEGORIES = ['mobile', 'desktop'];
const BROWSERS = ['Chrome', 'Safari', 'Edge'];

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const days = parseInt(searchParams.get('days') || '7', 10);

        const [deviceStatsRaw, browserStatsRaw] = await Promise.all([
            getDeviceStats(days),
            getBrowserStats(days),
        ]);

        const totalDeviceUsers = deviceStatsRaw.reduce((sum, data) => sum + data.activeUsers, 0);
        const totalBrowserUsers = browserStatsRaw.reduce((sum, data) => sum + data.activeUsers, 0);

        const deviceMap: Record<string, number> = {};
        for (let i = 0; i < DEVICE_CATEGORIES.length; i++) {
            deviceMap[DEVICE_CATEGORIES[i]] = 0;
        }

        for (let i = 0; i < deviceStatsRaw.length; i++) {
            const { deviceCategory, activeUsers } = deviceStatsRaw[i];
            if (DEVICE_CATEGORIES.includes(deviceCategory)) {
                deviceMap[deviceCategory] += activeUsers;
            }
        }

        const browserMap: Record<string, number> = {};
        for (let i = 0; i < BROWSERS.length; i++) {
            browserMap[BROWSERS[i]] = 0;
        }

        for (let i = 0; i < browserStatsRaw.length; i++) {
            const { browser, activeUsers } = browserStatsRaw[i];
            if (BROWSERS.includes(browser)) {
                browserMap[browser] += activeUsers;
            }
        }

        const deviceStats = DEVICE_CATEGORIES.map(label => ({
            label,
            value: totalDeviceUsers ? `${((deviceMap[label] / totalDeviceUsers) * 100).toFixed(1)}%` : '0%',
        }));

        const browserStats = BROWSERS.map(label => ({
            label,
            value: totalBrowserUsers ? `${((browserMap[label] / totalBrowserUsers) * 100).toFixed(1)}%` : '0%',
        }));

        return Response.json({
            success: true,
            message: '접속 환경 통계 데이터를 성공적으로 불러왔습니다.',
            data: { deviceStats, browserStats },
        });
    } catch (error) {
        console.error('[TrafficEnvironmentStats ERROR]', error);
        return Response.json(
            {
                success: false,
                message: '접속 환경 통계 데이터를 불러오지 못했습니다.',
            },
            { status: 500 }
        );
    }
}
