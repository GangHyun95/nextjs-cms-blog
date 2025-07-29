import Hero from '@/components/site/home/Hero';
import PopularPosts from '@/components/site/home/PopularPosts';
import RecentPosts from '@/components/site/home/RecentPosts';

export default function Home() {
    return (
        <div className='grow w-full flex flex-col space-y-24'>
            <Hero />
            <RecentPosts />
            <PopularPosts />
        </div>
    );
}
