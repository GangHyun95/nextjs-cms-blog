import Card from '@/components/ui/card';
import React from 'react';

export default function PopularPostCard() {
    return (
        <Card padding='uniform' className='flex-[2] 2xl:grow-1 min-w-0'>
            <h3 className='text-sm font-bold text-muted-foreground mb-4'>인기 글</h3>
            <ul className='flex flex-col space-y-3'>
                {Array.from({ length: 10 }, (_, i) => (
                    <li key={i} className='flex items-center'>
                        <span className='flex justify-center text-sm font-bold text-primary min-w-5'>{i + 1}</span>
                        <p className='flex-1 whitespace-nowrap truncate pl-2'>EC2 서버 세팅 정리 (PERN + Redis)</p>
                    </li>
                ))}
            </ul>
        </Card>
    );
}

