type StatItem = {
    label: string;
    value: number | string;
};

type StatGroup = {
    title: string;
    data: StatItem[];
};

type Props = {
    group: StatGroup;
    totalViews: number;
};

export default function StatGroup({ group, totalViews }: Props) {
    const isItemBarGroup = group.title === '브라우저' || group.title === '디바이스';

    const total = group.data.reduce((sum, item) => {
        const value = typeof item.value === 'number' ? item.value : 0;
        return sum + value;
    }, 0);

    const percentage = totalViews > 0 ? (total / totalViews) * 100 : 0;

    let barColor = 'bg-muted-foreground';
    if (group.title === '검색') barColor = 'bg-primary';
    else if (group.title === 'SNS') barColor = 'bg-chart-2';

    return (
        <div className='flex-1 flex flex-col gap-3'>
            <div className='flex text-sm font-semibold'>
                <span className='flex-1'>{group.title}</span>
                {!isItemBarGroup && <span>{total}</span>}
            </div>

            <div className='w-full h-0.5 bg-muted'>
                {!isItemBarGroup && (<div className={`h-full ${barColor}`} style={{ width: `${percentage}%` }} />)}
            </div>

            <ul className='flex flex-col gap-3 text-xs text-muted-foreground'>
                {group.data.map((item) => {
                    const value = typeof item.value === 'number' ? item.value : 0;

                    if (isItemBarGroup) {
                        const groupTotal = total === 0 ? 1 : total;
                        const itemPercent = (value / groupTotal) * 100;

                        return (
                            <li key={item.label} className='flex flex-col gap-2'>
                                <div className='flex'>
                                    <span className='flex-1'>{item.label}</span>
                                    <span>{itemPercent.toFixed(0)}%</span>
                                </div>
                                <div className='w-full h-0.5 bg-muted'>
                                    <div className='h-full bg-muted-foreground' style={{ width: `${itemPercent}%` }} />
                                </div>
                            </li>
                        );
                    }

                    return (
                        <li key={item.label} className='flex'>
                            <span className='flex-1'>{item.label}</span>
                            <span>{value}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}