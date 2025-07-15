import Card from '@/components/ui/card';
import { fetchChannelStats } from '@/service/server/analytics';

const BAR_COLORS: Record<string, string> = {
    '검색': 'bg-primary',
    'SNS': 'bg-chart-2',
    '기타': 'bg-muted-foreground',
};

export default async function ReferralChannelCard() {
    const { data } = await fetchChannelStats(7);
    const channelStats = data.channelStats;

    return (
        <Card padding='uniform'>
            <h3 className='text-sm font-bold text-muted-foreground mb-4'>유입 채널</h3>
            <ul className='flex flex-col space-y-2'>
                {channelStats.map((item, i) => (
                    <li key={i} className='flex items-center gap-3'>
                        <span className='text-sm text-muted-foreground min-w-7'>{item.label}</span>
                        <div className='flex-1 flex items-center gap-2'>
                            <div className='flex-1 h-1 bg-muted rounded overflow-hidden'>
                                <div
                                    className={`h-full ${BAR_COLORS[item.label] ?? 'bg-muted-foreground'}`}
                                    style={{ width: item.value }}
                                />
                            </div>
                            <span className='text-sm text-muted-foreground min-w-13 text-center'>{item.value}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </Card>
    );
}
