import Link from 'next/link';

import HamburgerButton from './HamburgerButton'
import SearchButton from './SearchButton'
import PageHoverMenu from './PageHoverMenu';

export default function Navbar() {
    return (
        <header id='header' className='fixed inset-0 flex flex-col h-14 lg:h-16'>
            <nav className='container flex-1 flex items-center'>
                <HamburgerButton />
                <div className='flex-1 flex justify-center h-full'>
                    <Link href='/' className='h-full inline-flex items-center'>Hyun's Dev 👨‍💻</Link>
                </div>
                <div className='h-full flex items-center space-x-8'>
                    <PageHoverMenu />
                    <SearchButton />
                </div>
            </nav>
        </header>
    );
}

