import { Button } from '@/components/ui/button';

export default function PostActionButtons() {
    const isPublic = true;

    const labels = ['수정', '삭제', '통계', isPublic ? '비공개로 전환' : '공개로 전환'];

    return (
        <div className='flex gap-1 self-end lg:self-auto'>
            {labels.map((label) => (
                <Button key={label} variant='outline' size='sm' className='text-xs'>
                    {label}
                </Button>
            ))}
        </div>
    );
}
