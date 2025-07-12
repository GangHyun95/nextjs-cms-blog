'use client';

import { PencilLine, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PostListItem from '@/components/admin/posts/PostListItem';

export default function PostsPage() {
    return (
        <div className='py-6'>
            <div className='flex flex-col gap-4 lg:items-center lg:flex-row'>
                <div className='flex-1'>
                    <h1 className='text-xl font-semibold'>게시글 관리</h1>
                    <p className='text-sm text-muted-foreground mt-1'>
                        작성된 게시글을 조회하고 편집하거나 삭제할 수 있습니다.
                    </p>
                </div>
                <div className='flex lg:max-w-3xs h-full'>
                    <input type='text' className='flex-1 bg-background border border-r-0 px-4 focus:outline-0' placeholder='검색' />
                    <Button variant='outline' size='icon'  className='h-10 rounded-xs text-muted-foreground border-l-0'>
                        <Search className='size-4' />
                    </Button>
                </div>
            </div>

            <div className='border rounded-xs mt-2'>
                <div className='border-b px-6 py-4 flex justify-between items-center bg-slate-50'>
                <div className='flex items-center gap-4'>
                    <div className='flex items-center size-4'>
                        <input id='select-all' type='checkbox' className='checkbox-custom' />
                    </div>
                    <label htmlFor='select-all'>전체 선택</label>
                </div>
                <div className='flex items-center gap-2'>
                    <Button variant='outline' className='rounded-xs text-xs' size='sm'>선택 삭제</Button>
                    <Button
                        variant='outline'
                        className='rounded-xs text-xs'
                        size='sm'
                    >
                        <span>글 쓰기</span>
                        <PencilLine />
                    </Button>
                </div>
                </div>
                
                <ul className='bg-background'>
                    <PostListItem />
                </ul>
            </div>
        </div>
    );
}
