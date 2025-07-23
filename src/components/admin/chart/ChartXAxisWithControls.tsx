'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
    labels: string[];
    hoveredIndex: number | null;
    onHover: (index: number) => void;
    onLeave: () => void;
    handleSelectLabel: (label: string) => void;
    mode: 'date' | 'yearWeek' | 'yearMonth';
    offset: number;
    setOffset: React.Dispatch<React.SetStateAction<number>>;
};

export default function ChartXAxisWithControls({
    labels,
    hoveredIndex,
    onHover,
    onLeave,
    handleSelectLabel,
    mode = 'date',
    offset = 0,
    setOffset,
}: Props) {
    const today = new Date();
    const dateLabels = labels.map(label => new Date(label));

    const getOffsetStep = (mode: 'date' | 'yearWeek' | 'yearMonth') => {
        if (mode === 'date') return 21;
        if (mode === 'yearWeek') return 105;
        if (mode === 'yearMonth') return 365;
        return 30;
    };

    const handlePrev = () => {
        const step = getOffsetStep(mode);
        setOffset?.(prev => prev + step);
    };

    const handleNext = () => {
        const step = getOffsetStep(mode);
        setOffset?.(prev => Math.max(prev - step, 0));
    };

    const xLabels = dateLabels.map((label, i) => {
        const isToday =
            label.getFullYear() === today.getFullYear() &&
            label.getMonth() === today.getMonth() &&
            label.getDate() === today.getDate();

        const currentMonth = label.getMonth();
        const prevMonth = i > 0 ? dateLabels[i - 1].getMonth() : null;
        const showMonth = i === 0 || currentMonth !== prevMonth;

        const currentYear = label.getFullYear();
        const prevYear = i > 0 ? dateLabels[i - 1].getFullYear() : null;
        const showYear = i === 0 || currentYear !== prevYear;

        return { label, isToday, showMonth, showYear, currentMonth, currentYear, index: i };
    });

    return (
        <div className='absolute bottom-0 left-0 right-0 pb-2 px-8'>
            <div className='flex'>
                {xLabels.map(({ label, isToday, showMonth, showYear, currentMonth, currentYear, index }) => (
                    <div
                        key={index}
                        className='flex-1 flex flex-col items-center gap-1 pt-2 text-muted-foreground/70 cursor-pointer'
                        onMouseEnter={() => onHover(index)}
                        onMouseLeave={onLeave}
                        onClick={() => handleSelectLabel(labels[index])}
                    >
                        <Button
                            variant='ghost'
                            size='icon'
                            className={cn(
                                'text-tiny! w-6 h-6 rounded-full',
                                hoveredIndex === index ? 'bg-primary text-background' : '',
                                'hover:bg-primary hover:text-background',
                            )}
                        >
                            {mode === 'yearMonth' ? currentMonth + 1 : isToday ? '오늘' : label.getDate()}
                        </Button>

                        {mode === 'yearMonth' && showYear && (
                            <span className='text-tiny'>
                                {currentYear}년
                            </span>
                        )}

                        {mode !== 'yearMonth' && showMonth && (
                            <span className='text-tiny'>
                                {currentMonth + 1}월
                            </span>
                        )}
                    </div>
                ))}
            </div>

            <div className='absolute top-1/2 left-0 right-0 flex justify-between -translate-y-1/2 pointer-events-none'>
                <Button
                    variant='outline'
                    size='icon'
                    className='size-7 pointer-events-auto'
                    onClick={handlePrev}
                >
                    <ChevronLeft className='size-4' />
                </Button>
                <Button
                    variant='outline'
                    size='icon'
                    className='size-7 pointer-events-auto'
                    onClick={handleNext}
                    disabled={offset === 0}
                >
                    <ChevronRight className='size-4' />
                </Button>
            </div>
        </div>
    );
}
