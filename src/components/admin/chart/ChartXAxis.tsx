'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Props = {
    labels: string[];
    hoveredIndex: number | null;
    onHover: (index: number) => void;
    onLeave: () => void;
    withArrows?: boolean;
};

export default function ChartXAxis({ labels, hoveredIndex, onHover, onLeave, withArrows = false }: Props) {
    const today = new Date();

    const dateLabels = labels.map(label => new Date(label));

    const xLabels = dateLabels.map((label, i) => {
        const isToday =
            label.getFullYear() === today.getFullYear() &&
            label.getMonth() === today.getMonth() &&
            label.getDate() === today.getDate();

        const currentMonth = label.getMonth();
        const prevMonth = i > 0 ? dateLabels[i - 1].getMonth() : null;
        const showMonth = i === 0 || currentMonth !== prevMonth;

        return { label, isToday, showMonth, currentMonth, index: i };
    });

    return (
        <div className={cn('absolute bottom-0 left-0 right-0 pb-2', withArrows && 'px-8')}>
            <div className='flex'>
                {xLabels.map(({ label, isToday, showMonth, currentMonth, index }) => (
                    <div
                        key={index}
                        className='flex-1 flex flex-col items-center gap-1 pt-2'
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
            
            {withArrows && (
                <div className='absolute top-1/2 left-0 right-0 flex justify-between -translate-y-1/2 pointer-events-none'>
                    <Button
                        variant='outline'
                        size='icon'
                        className='size-7 pointer-events-auto'
                    >
                        <ChevronLeft className='size-4' />
                    </Button>
                    <Button
                        variant='outline'
                        size='icon'
                        className='size-7 pointer-events-auto'
                    >
                        <ChevronRight className='size-4' />
                    </Button>
                </div>

            )}
        </div>
    );
}
