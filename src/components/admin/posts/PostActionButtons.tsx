import TooltipIconButton from '@/components/common/TooltipIconButton';
import { BarChart2, Eye, EyeOff, PencilLine, Trash2 } from 'lucide-react';

export default function PostActionButtons() {
    const isPublic = true;
    return (
        <div className='flex items-center gap-1'>
            <TooltipIconButton label='수정' className='size-7 rounded-md'>
                <PencilLine className='size-4' />
            </TooltipIconButton>
            <TooltipIconButton label='삭제' className='size-7 rounded-md'>
                <Trash2 className='size-4' />
            </TooltipIconButton>
            <TooltipIconButton label='통계' className='size-7 rounded-md'>
                <BarChart2 className='size-4' />
            </TooltipIconButton>
            <TooltipIconButton label={isPublic ? '비공개' : '공개'} className='size-7 rounded-md'>
                {isPublic ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
            </TooltipIconButton>
        </div>
    );
}

