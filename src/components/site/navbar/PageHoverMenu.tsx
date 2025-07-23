import Link from 'next/link';
import { Play } from 'lucide-react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

export default function PageHoverMenu() {
    return (
        <HoverCard openDelay={0} closeDelay={100}>
            <HoverCardTrigger asChild>
                <div className='h-full items-center space-x-0.5 hidden md:flex cursor-pointer'>
                    <span>Page</span>
                    <Play className='fill-muted-foreground size-2 text-muted-foreground rotate-90 align-middle translate-y-[1px]' />
                </div>
            </HoverCardTrigger>

            <HoverCardContent
                side='bottom'
                align='center'
                className='w-52 p-0 rounded shadow-none bg-background border'
            >
                <ul className='space-y-1 text-sm'>
                    <li>
                        <Link href='/' className='block px-4 py-3 hover:bg-muted transition'>
                            홈
                        </Link>
                    </li>
                    <li>
                        <Link href='/guestbook' className='block px-4 py-3 hover:bg-muted transition'>
                            방명록
                        </Link>
                    </li>
                    <li>
                        <Link href='/posts' className='block px-4 py-3 hover:bg-muted transition'>
                            전체글
                        </Link>
                    </li>
                </ul>
            </HoverCardContent>
        </HoverCard>
    );
}
