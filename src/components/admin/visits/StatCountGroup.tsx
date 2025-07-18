type StatItem = {
    label: string;
    value: number | string;
};

type Props = {
    title: string;
    data: StatItem[];
};

export default function StatCountGroup({ title, data }: Props) {
    const total = data.reduce((sum, item) => sum + (typeof item.value === 'number' ? item.value : 0), 0);

    const percentage = total > 0 ? 100 : 0;
    let barColor = 'bg-muted-foreground';
    if (title === '검색') barColor = 'bg-primary';
    else if (title === 'SNS') barColor = 'bg-chart-2';

    return (
        <div className='flex-1 flex flex-col gap-3'>
            <div className='flex text-sm font-semibold'>
                <span className='flex-1'>{title}</span>
                <span>{total}</span>
            </div>

            <div className='w-full h-0.5 bg-muted'>
                <div className={`h-full ${barColor}`} style={{ width: `${percentage}%` }} />
            </div>

            <ul className='flex flex-col gap-3 text-xs text-muted-foreground'>
                {data.map((item) => (
                    <li key={item.label} className='flex'>
                        <span className='flex-1'>{item.label}</span>
                        <span>{item.value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
