import { Button } from '@/components/ui/button';
import { GripVertical } from 'lucide-react';

type Props = {
    label: string;
    isParent: boolean;
    onEdit: () => void;
}

export default function CategoryItemView({ label, isParent, onEdit }: Props) {
    return (
        <>
            <div className='min-w-10 h-full flex justify-center items-center cursor-move'>
                <GripVertical className='size-4 text-muted-foreground' />
            </div>
            <span className='flex-1 text-sm'>{label}</span>
            <Button variant='outline' className='text-muted-foreground text-tiny w-9 h-6' onClick={onEdit}>수정</Button>
        </>
    );
}