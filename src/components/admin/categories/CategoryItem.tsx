'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';

import CategoryItemEdit from './CategoryItemEdit';
import CategoryItemView from './CategoryItemView';

type Props = {
    label: string;
    isParent?: boolean;
    children?: React.ReactNode;
};

export default function CategoryItem({ label, isParent = false, children }: Props) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className='flex flex-col'>
            <div className='flex h-13 items-center border-b'>
                {isParent && (
                    <div className='min-w-9 h-full flex justify-center items-center cursor-pointer bg-muted'>
                        <ChevronDown className='size-4 text-muted-foreground' />
                    </div>
                )}
                <div
                    className={cn(
                        'flex items-center bg-background pr-4 flex-1 h-full',
                        isParent ? 'font-medium text-foreground' : 'ml-9 text-muted-foreground'
                    )}
                >
                    <div className='flex items-center h-full w-full'>
                        {isEditing ? (
                            <CategoryItemEdit label={label} onCancel={() => setIsEditing(false)} />
                        ) : (
                            <CategoryItemView label={label} onEdit={() => setIsEditing(true)} />
                        )}
                    </div>
                </div>
            </div>
            {isParent && children}
        </div>
    )
}