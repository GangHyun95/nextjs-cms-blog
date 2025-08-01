import { LoaderCircle } from 'lucide-react';

export function FullPageSpinner() {
    return (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-background'>
            <LoaderCircle className='size-10 md:size-8 text-primary animate-spin'/>
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

export function AdminLoadingSpinner() {
    return (
        <div className='h-full flex flex-col items-center justify-center gap-2 text-primary'>
            <LoaderCircle className='size-8 animate-spin' />
            <p className='text-xs'>데이터를 불러오는 중...</p>
        </div>
    );
}

export function ChartSpinner() {
    return (
        <div className='h-80 flex justify-center items-center'>
            <LoaderCircle className='size-8 animate-spin text-primary' />
        </div>
    )
}

export function StatSpinner() {
    return (
        <div className='h-44 flex justify-center items-center mt-10'>
            <LoaderCircle className='size-8 animate-spin text-primary' />
        </div>
    )
}