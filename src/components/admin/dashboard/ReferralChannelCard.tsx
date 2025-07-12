import Card from '@/components/ui/card';

const referralStats = [
    { label: '검색', value: '74.7%', barColor: 'bg-primary' },
    { label: 'SNS', value: '11.3%', barColor: 'bg-chart-2' },
    { label: '기타', value: '14%', barColor: 'bg-muted-foreground' }
];

export default function ReferralChannelCard() {
    return (
        <Card padding='uniform'>
            <h3 className='text-sm font-bold text-muted-foreground mb-4'>유입 채널</h3>
            <ul className='flex flex-col space-y-2'>
                {referralStats.map((item, i) => (
                    <li key={i} className='flex items-center gap-3'>
                        <span className='text-sm text-muted-foreground min-w-7'>{item.label}</span>
                        <div className='flex-1 flex items-center gap-2'>
                            <div className='flex-1 h-1 bg-muted rounded overflow-hidden'>
                                <div className={`h-full ${item.barColor}`} style={{ width: item.value }} />
                            </div>
                            <span className='text-sm text-muted-foreground min-w-12 text-end'>{item.value}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </Card>
    );
}
