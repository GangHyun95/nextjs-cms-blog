import LineChart from '@/components/admin/chart/LineChart';
import { PopularPostCard, RecentPostCard, ReferralChannelCard, StatOverview, TrafficEnvironmentCard } from '@/components/admin/dashboard';
export default function AdminPage() {
    return (
        <div className='min-h-screen py-8'>
            <StatOverview />

            <section className='relative w-full h-[332px] bg-background pb-12 border rounded-xs mt-1 px-8'>
                <LineChart />
            </section>
            <section className='mt-10'>
                <h2 className='text-xl mb-2'>최근 7일 통계</h2>
                <div className='flex flex-col gap-1 lg:flex-row'>
                    <PopularPostCard />
                    <div className='flex-1 flex flex-col gap-1'>
                        <TrafficEnvironmentCard />
                        <ReferralChannelCard />
                    </div>
                </div>
            </section>
            <section className='mt-10'>
                <h2 className='text-xl mb-2'>최근 글</h2>
                <div className='flex flex-col gap-2 lg:flex-row'>
                    <RecentPostCard />
                    <RecentPostCard />
                    <RecentPostCard />
                    <RecentPostCard />
                </div>
            </section>
        </div>
    );
}
