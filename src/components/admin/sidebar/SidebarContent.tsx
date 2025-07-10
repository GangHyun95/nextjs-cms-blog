import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import SidebarNav from './SidebarNav';

export default function SidebarContent() {
    return (
        <div className='relative flex w-guide'>
            <div className='fixed top-0 h-screen w-guide flex flex-col'>
                {/* 고정 영역 */}
                <div className='flex justify-center h-16 overflow-hidden'>
                    <Link href='/admin'>
                        <Image src='/logo/logo.png' alt='logo' width={84} height={84} />
                    </Link>
                </div>

                {/* 스크롤 영역 */}
                <div className='flex-1 overflow-y-auto px-4'>
                    <div className='relative w-full pb-[100%]'>
                        <Image
                            src='/temp_profile.jpg'
                            alt='profile'
                            className='object-cover'
                            fill
                            sizes='240px'
                            priority
                        />
                    </div>
                    <Button size='lg' className='w-full rounded-xs'>
                        글 쓰기
                    </Button>

                    <SidebarNav />
                </div>
            </div>
        </div>
    );
}

