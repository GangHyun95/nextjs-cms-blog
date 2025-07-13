'use client';

import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import CategoryItemView from './CategoryItemView';
import CategoryItemEditing from './CategoryItemEditing';

export default function CategoryItem({ label, isParent = false }: { label: string; isParent?: boolean }) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div
            className={cn(
                'flex items-center h-13 border-b last:border-0 bg-background pr-4',
                isParent ? 'font-medium text-foreground' : 'ml-9 text-muted-foreground'
            )}
        >
            {isParent && (
                <div className='min-w-9 h-full flex justify-center items-center cursor-pointer bg-muted'>
                    <ChevronDown className='size-4 text-muted-foreground' />
                </div>
            )}
            {isEditing ? (
                <CategoryItemEditing label={label} onCancel={() => setIsEditing(false)} />
            ) : (
                <CategoryItemView label={label} onEdit={() => setIsEditing(true)} />
            )}
        </div>
    );
}