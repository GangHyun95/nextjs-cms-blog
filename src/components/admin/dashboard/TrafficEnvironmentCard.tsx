const deviceStats = [
    { label: '모바일', value: '65.3%', barColor: 'bg-primary' },
    { label: '데스크탑', value: '34.7%', barColor: 'bg-chart-2' }
];

const browserStats = [
    { label: 'Chrome', value: '78%', barColor: 'bg-primary' },
    { label: 'Safari', value: '15%', barColor: 'bg-chart-2' },
    { label: 'Edge', value: '5%', barColor: 'bg-muted-foreground' }
];

export default function TrafficEnvironmentCard() {
    return (
        <div className='p-6 border rounded-xs bg-background'>
            <h3 className='text-sm font-bold text-muted-foreground mb-4'>접속 환경</h3>

            <div className='mb-4'>
                <p className='text-xs text-muted-foreground mb-2'>디바이스</p>
                <ul className='flex flex-col space-y-2'>
                    {deviceStats.map((item, i) => (
                        <li key={i} className='flex items-center gap-3'>
                            <span className='text-sm text-muted-foreground min-w-14'>{item.label}</span>
                            <div className='flex-1 flex items-center gap-2'>
                                <div className='flex-1 h-1 bg-muted rounded overflow-hidden'>
                                    <div className={`h-full ${item.barColor}`} style={{ width: item.value }} />
                                </div>
                                <span className='text-sm text-muted-foreground min-w-12 text-end'>{item.value}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <p className='text-xs text-muted-foreground mb-2'>브라우저</p>
                <ul className='flex flex-col space-y-2'>
                    {browserStats.map((item, i) => (
                        <li key={i} className='flex items-center gap-3'>
                            <span className='text-sm text-muted-foreground min-w-14'>{item.label}</span>
                            <div className='flex-1 flex items-center gap-2'>
                                <div className='flex-1 h-1 bg-muted rounded overflow-hidden'>
                                    <div className={`h-full ${item.barColor}`} style={{ width: item.value }} />
                                </div>
                                <span className='text-sm text-muted-foreground min-w-12 text-end'>{item.value}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
