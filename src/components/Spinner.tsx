import { LoaderCircle } from 'lucide-react';

export function FullPageSpinner() {
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-background'>
            <LoaderCircle className='size-10 md:size-8 text-foreground animate-spin'/>
        </div>
    )
}

export function InlineSpinner() {
    return (
        <div className='flex items-center'>
            <LoaderCircle className='size-5 animate-spin text-background'/>
        </div>
    )
}