import React from 'react';
import PostActionButtons from './PostActionButtons';

export default function PostListItem() {
    return (
        <li className='flex items-center px-6 py-4 gap-4 border-b'>
            <div className='inline-block size-4'>
                <input type='checkbox' className='checkbox-custom' />
            </div>
            <div className='flex-1'>
                <div className='mb-1'>EC2 서버 세팅 정리 (PERN + Redis)</div>
                <div className='flex items-center gap-2 text-xs'>
                    <span className='text-primary'>카테고리 없음</span>
                    <div className='dot' />
                    <p className='text-muted-foreground'>2025-07-07 03:07</p>
                </div>
            </div>
            <PostActionButtons />
        </li>
    );
}

