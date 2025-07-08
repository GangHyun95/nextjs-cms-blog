import { LoaderCircle } from 'lucide-react';

export function InlineSpinner() {
    return (
        <div className='flex items-center'>
            <LoaderCircle className='size-5 animate-spin text-background'/>
        </div>
    )
}