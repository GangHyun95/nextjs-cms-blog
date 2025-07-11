'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
    labels: Date[];
    hoveredIndex: number | null;
    onHover: (index: number) => void;
    onLeave: () => void;
};

export default function ChartXAxis({ labels, hoveredIndex, onHover, onLeave }: Props) {
    const today = new Date();

    const xLabels = labels.map((label, i) => {
        const isToday =
            label.getFullYear() === today.getFullYear() &&
            label.getMonth() === today.getMonth() &&
            label.getDate() === today.getDate();

        const currentMonth = label.getMonth();
        const prevMonth = i > 0 ? labels[i - 1].getMonth() : null;
        const showMonth = i === 0 || currentMonth !== prevMonth;

        return { label, isToday, showMonth, currentMonth, index: i };
    });

    return (
        <div className='absolute bottom-0 left-0 right-0 flex justify-between text-muted-foreground px-8'>
            {xLabels.map(({ label, isToday, showMonth, currentMonth, index }) => (
                <div
                    key={index}
                    className='flex flex-col items-center gap-1 pb-4'
                    onMouseEnter={() => onHover(index)}
                    onMouseLeave={onLeave}
                >
                    <Button
                        variant='ghost'
                        size='icon'
                        className={cn(
                            'cursor-default text-tiny! w-6 h-6 rounded-full',
                            hoveredIndex === index ? 'bg-primary text-background' : '',
                            'hover:bg-primary hover:text-background',
                        )}
                    >
                        {isToday ? '오늘' : label.getDate()}
                    </Button>
                    {showMonth && (
                        <span className='text-tiny text-muted-foreground cursor-default'>
                            {currentMonth + 1}월
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}
