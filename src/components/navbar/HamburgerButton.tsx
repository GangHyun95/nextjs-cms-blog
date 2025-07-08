'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export default function HamburgerButton() {
    const [open, setOpen] = useState(false);

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant='ghost'
                        size='icon'
                        className='2xl:hidden relative rounded-full size-11'
                        onClick={() => setOpen(prev => !prev)}
                    >
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
                    </Button>
                </TooltipTrigger>
                <TooltipContent side='right' sideOffset={-4}>
                    {open ? '메뉴 닫기' : '메뉴 열기'}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
