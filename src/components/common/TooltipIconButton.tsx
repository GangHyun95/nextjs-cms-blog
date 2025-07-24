import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type Props = {
    label: string;
    onClick?: () => void;
    children: React.ReactNode;
    side?: 'top' | 'bottom' | 'left' | 'right';
    className?: string;
};

export default function TooltipIconButton({ label, onClick, children, side='top', className }: Props) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    type='button'
                    onClick={onClick}
                    className={cn(
                        'flex items-center justify-center cursor-pointer hover:bg-accent hover:text-accent-foreground',
                        className
                    )}
                >
                    {children}
                </button>
            </TooltipTrigger>
            <TooltipContent side={side} sideOffset={-4}>{label}</TooltipContent>
        </Tooltip>
    );
}
