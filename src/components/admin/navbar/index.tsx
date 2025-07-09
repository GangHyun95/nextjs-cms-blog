import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
    return (
        <header id='header' className='fixed inset-0 flex flex-col h-14 lg:h-16 bg-background'>
            <nav className='container flex-1 flex items-center overflow-hidden'>
                <div className='relative w-21 h-full flex items-center justify-center top-1'>
                    <Link href='/'>
                        <Image src='/logo/logo.png' alt='Logo' width={84} height={84} />
                    </Link>
                </div>
                <div className='flex-1 flex justify-center h-full'>
                    <Link href='/' className='h-full inline-flex items-center font-semibold'>
                        <span className='underline-from-center'>Hyun's Dev 👨‍💻</span>
                    </Link>
                </div>
                <div className='h-full flex items-center space-x-8'>
                    <Button className='rounded-full w-30 font-normal'>
                        <span>글쓰기</span>
                    </Button>
                </div>
            </nav>
        </header>
    );
}

