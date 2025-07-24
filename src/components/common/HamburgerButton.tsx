import TooltipIconButton from '@/components/common/TooltipIconButton';
import { cn } from '@/lib/utils';

type Props = {
    open?: boolean;
    onClick?: () => void;
    color?: 'foreground' | 'muted';
}

export default function HamburgerButton({ open, onClick, color='foreground' }: Props) {
    const colorClass = open || color === 'foreground' ? 'text-foreground' : 'text-muted';
    return (
        <TooltipIconButton
            label={open ? '메뉴 닫기' : '메뉴 열기'}
            className={cn('relative rounded-full size-11 transition-colors duration-300', colorClass)}
            side='right'
            onClick={onClick}
        >
            <>
                <span
                    className={cn(
                        'absolute h-0.5 w-5 transition-transform duration-300 origin-center bg-current',
                        open ? 'rotate-45 translate-y-0' : '-translate-y-[7px]'
                    )}
                />
                <span
                    className={cn(
                        'absolute h-0.5 w-5 transition-opacity duration-300 bg-current',
                        open ? 'opacity-0' : 'opacity-100'
                    )}
                />
                <span
                    className={cn(
                        'absolute h-0.5 w-5 transition-transform duration-300 origin-center bg-current',
                        open ? '-rotate-45 translate-y-0' : 'translate-y-[7px]'
                    )}
                />
            </>
        </TooltipIconButton>
    );
}
