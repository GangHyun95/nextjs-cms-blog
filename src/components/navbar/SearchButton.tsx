import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function SearchButton() {
    return (
    <TooltipProvider>
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant='ghost'
                    size='icon'
                    className='size-11 rounded-full flex items-center'
                >
                    <Search className='size-6' />
                </Button>
            </TooltipTrigger>
            <TooltipContent side='right' sideOffset={-4}>
                검색
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    );
}
