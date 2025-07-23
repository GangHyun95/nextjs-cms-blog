import { FileText } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';
import Card from '@/components/ui/card';

export default function UserNoteItem({ type }: { type: 'comment' | 'guestbook'}) {
    return (
        <Card padding='sm' as='li' className='flex flex-col gap-4 border-0 border-b md:flex-row md:items-center'>
            <div className='flex flex-1 gap-4 items-center'>
                <div className='inline-block size-4'>
                    <input type='checkbox' className='checkbox-custom' />
                </div>
                
                <div className='flex-1 space-y-1'>
                    <div className='flex items-center gap-2 text-xs font-medium tracking-tight text-muted-foreground'>
                        <p className='text-primary'>익명</p>
                        <div className='dot'/>
                        <span>210.179.***.16</span>
                        <div className='dot'/>
                        <span>2024-10-20 14:06</span>
                    </div>
                    <p className='text-sm'>좋은 글 잘 보고 갑니다.</p>
                    {type === 'comment' && (
                        <div className='flex items-center gap-1'>
                            <FileText className='text-muted-foreground size-3.5' />
                            <p className='text-muted-foreground text-xs'>
                                RSS를 이용해 티스토리 블로그 글 가져오기
                            </p>
                        </div>
                    )}
                </div>
            </div>
            
            <div className='self-end md:self-auto'>
                <Button variant='outline' size='sm' className='text-xs'>
                    삭제
                </Button>
            </div>
        </Card>
    );
}

