import Image from 'next/image';

export default function Footer() {
    return (
        <footer className='mt-24 bg-[#0f111e]'>
            <div className='container px-4 py-16'>
                <div className='grid grid-cols-1 gap-18 lg:grid-cols-4 lg:gap-4'>
                    <div className='flex flex-col col-span-2'>
                        <h3 className='text-white font-bold flex items-center gap-2 mb-4'>
                            최근 글
                            <span className='text-tiny bg-primary text-white px-1.5 py-0.5 rounded-full'>
                                NEW
                            </span>
                        </h3>
                        <ul className='space-y-4'>
                            {Array.from({ length: 4 }).map((_, i) => (
                                <li key={i} className='flex items-center gap-2'>
                                    <div className='relative w-15 h-[45px] rounded-xs overflow-hidden'>
                                        <Image
                                            src={'https://placehold.co/400x200.png'}
                                            alt={'title'}
                                            fill
                                            className='object-cover'
                                            sizes='60px'
                                        />
                                    </div>
                                    
                                    <div className='flex flex-col flex-1'>
                                        <h4 className='text-gray-400 font-semibold line-clamp-1'>Socket.IO를 이용한 채팅 및 온라인/오프라인 실시간 상태 반영</h4>
                                        <p className='text-sm text-muted-foreground'>2025.05.01</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='flex flex-col col-span-2 lg:col-span-1'>
                        <h3 className='text-white font-bold flex items-center gap-2 mb-4'>
                            최근 댓글
                            <span className='text-tiny bg-primary text-white px-1.5 py-0.5 rounded-full'>
                                NEW
                            </span>
                        </h3>
                        <ul className='space-y-4'>
                            {Array.from({ length: 4 }).map((_, i) => (
                                <li key={i} className='flex flex-col'>
                                    <span className='truncate text-gray-400'>좋은 글이네요! 많은 도움 됐어요.</span>
                                    <span className='text-sm text-primary'>익명</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className='flex flex-col col-span-2 lg:col-span-1'>
                        <h3 className='text-white font-bold flex items-center gap-2 mb-4'>
                            최근 방명록
                            <span className='text-tiny bg-primary text-white px-1.5 py-0.5 rounded-full'>
                                NEW
                            </span>
                        </h3>
                        <ul className='space-y-4'>
                            {Array.from({ length: 4 }).map((_, i) => (
                                <li key={i} className='flex flex-col'>
                                    <span className='truncate text-gray-400'>좋은 글이네요! 많은 도움 됐어요.</span>
                                    <span className='text-sm text-primary'>익명</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
