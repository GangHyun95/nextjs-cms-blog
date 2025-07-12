import TooltipIconButton from '@/components/common/TooltipIconButton';
import { BarChart2, Eye, EyeOff, PencilLine, Trash2 } from 'lucide-react';

export default function PostActionButtons() {
    const isPublic = true;
    return (
        <div className='flex flex-col items-center gap-1'>
            <div className='space-x-1'>
                <TooltipIconButton label='수정' className='size-7 border'>
                    <PencilLine className='size-4' />
                </TooltipIconButton>
                <TooltipIconButton label='삭제' className='size-7 border'>
                    <Trash2 className='size-4' />
                </TooltipIconButton>
            </div>
            <div className='space-x-1'>
                <TooltipIconButton label='통계' className='size-7 border' side='bottom'>
                    <BarChart2 className='size-4' />
                </TooltipIconButton>
                <TooltipIconButton label={isPublic ? '비공개' : '공개'} className='size-7 border' side='bottom'>
                    {isPublic ? <EyeOff className='size-4' /> : <Eye className='size-4' />}
                </TooltipIconButton>
            </div>
        </div>
    );
}

