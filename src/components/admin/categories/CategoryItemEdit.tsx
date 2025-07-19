'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function CategoryItemEdit({ label, onCancel }: { label: string; onCancel: () => void }) {
    const [value, setValue] = useState(label);

    return (
        <>
            <input
                type='text'
                className='w-full border focus:outline-0 p-2 ml-5 text-xs'
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <div className='flex gap-1 ml-1'>
                <Button variant='outline' size='sm' className='text-muted-foreground text-xs' onClick={onCancel}>취소</Button>
                <Button variant='outline' size='sm' className='text-muted-foreground text-xs' onClick={onCancel}>확인</Button>
            </div>
        </>
    );
}