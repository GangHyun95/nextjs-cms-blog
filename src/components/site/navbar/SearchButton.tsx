import { Search } from 'lucide-react';

import TooltipIconButton from '@/components/common/TooltipIconButton';

export default function SearchButton() {
    return (
        <TooltipIconButton label='검색' side='right' className='size-11 rounded-full flex items-center'>
            <Search className='size-6' />
        </TooltipIconButton>
    );
}
