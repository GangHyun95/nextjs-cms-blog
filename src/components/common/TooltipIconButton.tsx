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
                <Button
                    variant='ghost'
                    size='icon'
                    className={className}
                    onClick={onClick}
                >
                    {children}
                </Button>
            </TooltipTrigger>
            <TooltipContent side={side} sideOffset={-4}>{label}</TooltipContent>
        </Tooltip>
    );
}
