import { GripVertical } from 'lucide-react';

import { Button } from '@/components/ui/button';

type Props = {
    label: string;
    onEdit: () => void;
}

export default function CategoryItemView({ label, onEdit }: Props) {
    return (
        <>
            <div className='min-w-10 h-full flex justify-center items-center cursor-move drag-handle'>
                <GripVertical className='size-4 text-muted-foreground' />
            </div>
            <span className='flex-1 text-sm'>{label}</span>
            <Button variant='outline' className='text-muted-foreground text-tiny w-9 h-6' onClick={onEdit}>수정</Button>
        </>
    );
}