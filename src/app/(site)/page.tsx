import Hero from '@/components/site/home/Hero';
import RecentPosts from '@/components/site/home/RecentPosts';

export default function Home() {
    return (
        <div className='grow w-full flex flex-col space-y-24'>
            <Hero />
            <RecentPosts />
        </div>
    );
}
