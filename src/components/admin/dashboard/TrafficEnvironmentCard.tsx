import Card from '@/components/ui/card';
import { fetchTrafficStats } from '@/service/server/analytics';

const deviceColors: { [key: string]: string } = {
    mobile: 'bg-primary',
    desktop: 'bg-chart-2',
    tablet: 'bg-chart-3',
};

const browserColors: { [key: string]: string } = {
    Chrome: 'bg-primary',
    Safari: 'bg-chart-2',
    Edge: 'bg-chart-3',
    기타: 'bg-muted-foreground',
};

export default async function TrafficEnvironmentCard() {
    const { data: { deviceStats, browserStats }} = await fetchTrafficStats(7);
    return (
        <Card padding='uniform'>
            <h3 className='text-sm font-bold text-muted-foreground mb-4'>접속 환경</h3>

            <div className='mb-4'>
                <p className='text-sm text-muted-foreground font-bold mb-2'>디바이스</p>
                <ul className='flex flex-col space-y-2'>
                    {deviceStats.map((item, i) => (
                        <li key={i} className='flex items-center gap-3'>
                            <span className='text-xs text-muted-foreground min-w-14'>
                                {item.label === 'mobile' ? '모바일' : item.label === 'desktop' ? '데스크탑' : item.label === 'tablet' ? '태블릿' : item.label}
                            </span>
                            <div className='flex-1 flex items-center gap-2'>
                                <div className='flex-1 h-1 bg-muted rounded overflow-hidden'>
                                    <div
                                        className={`${deviceColors[item.label] ?? 'bg-muted'} h-full`}
                                        style={{ width: item.value }}
                                    />
                                </div>
                                <span className='text-xs text-muted-foreground min-w-13 text-center'>{item.value}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <p className='text-sm text-muted-foreground font-bold mb-2'>브라우저</p>
                <ul className='flex flex-col space-y-2'>
                    {browserStats.map((item, i) => (
                        <li key={i} className='flex items-center gap-3'>
                            <span className='text-xs text-muted-foreground min-w-14'>{item.label}</span>
                            <div className='flex-1 flex items-center gap-2'>
                                <div className='flex-1 h-1 bg-muted rounded overflow-hidden'>
                                    <div
                                        className={`${browserColors[item.label] ?? 'bg-muted'} h-full`}
                                        style={{ width: item.value }}
                                    />
                                </div>
                                <span className='text-xs text-muted-foreground min-w-13 text-center'>{item.value}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Card>
    );
}
