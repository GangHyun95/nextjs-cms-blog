'use client';

import { cn } from '@/lib/utils';
import TooltipIconButton from '../common/TooltipIconButton';

type Props = {
    open?: boolean;
    onClick?: () => void;
}

export default function HamburgerButton({ open, onClick }: Props) {
    return (
        <TooltipIconButton
            label={open ? '메뉴 닫기' : '메뉴 열기'}
            className='2xl:hidden relative rounded-full size-11'
            side='right'
            onClick={onClick}
        >
            <>
                <span
                    className={cn(
                        'absolute h-0.5 w-5 bg-foreground transition-all duration-300 origin-center',
                        open ? 'rotate-45 translate-y-0' : '-translate-y-[7px]'
                    )}
                />
                <span
                    className={cn(
                        'absolute h-0.5 w-5 bg-foreground transition-opacity duration-300',
                        open ? 'opacity-0' : 'opacity-100'
                    )}
                />
                <span
                    className={cn(
                        'absolute h-0.5 w-5 bg-foreground transition-all duration-300 origin-center',
                        open ? '-rotate-45 translate-y-0' : 'translate-y-[7px]'
                    )}
                />
            </>
        </TooltipIconButton>
    );
}
