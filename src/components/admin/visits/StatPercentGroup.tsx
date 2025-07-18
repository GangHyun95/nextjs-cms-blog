type StatItem = {
    label: string;
    value: number | string;
};

type Props = {
    title: string;
    data: StatItem[];
};

export default function StatPercentGroup({ title, data }: Props) {
    return (
        <div className='flex-1 flex flex-col gap-3'>
            <div className='text-sm font-semibold'>{title}</div>
            <ul className='flex flex-col gap-3 text-xs text-muted-foreground'>
                {data.map((item) => {
                    const percent = parseFloat(
                        typeof item.value === 'string' ? item.value.replace('%', '') : '0'
                    );

                    return (
                        <li key={item.label} className='flex flex-col gap-2'>
                            <div className='flex'>
                                <span className='flex-1'>{item.label}</span>
                                <span>{percent.toFixed(0)}%</span>
                            </div>
                            <div className='w-full h-0.5 bg-muted'>
                                <div className='h-full bg-muted-foreground' style={{ width: `${percent}%` }} />
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
