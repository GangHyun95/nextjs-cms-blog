import Link from 'next/link';

import HamburgerButton from './HamburgerButton'
import SearchButton from './SearchButton'
import PageHoverMenu from './PageHoverMenu';

export default function Navbar() {
    return (
        <header id='header' className='fixed inset-0 flex flex-col h-14 lg:h-16'>
            <nav className='container flex-1 flex items-center'>
                <div className='w-21 h-full flex items-center justify-center'>
                    <HamburgerButton />
                </div>
                <div className='flex-1 flex justify-center h-full'>
                    <Link href='/' className='h-full inline-flex items-center font-semibold'>
                        <span className='underline-from-center'>Hyun's Dev 👨‍💻</span>
                    </Link>
                </div>
                <div className='h-full flex items-center space-x-8'>
                    <PageHoverMenu />
                    <SearchButton />
                </div>
            </nav>
        </header>
    );
}

