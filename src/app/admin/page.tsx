import LineChart from '@/components/admin/chart/LineChart';
import { PopularPostCard, RecentPostCard, ReferralChannelCard, StatOverview, TrafficEnvironmentCard } from '@/components/admin/dashboard';
import Card from '@/components/ui/card';
import { fetchAnalyticsDaily } from '@/service/server/analytics';

export default async function AdminPage() {
    const { data: { daily }} = await fetchAnalyticsDaily(30);
    return (
        <div className='min-h-screen py-8'>
            <StatOverview showStatsLink={true} />

            <Card as='section' padding='md' className='mt-1 pb-1'>
                <div className='relative'>
                    <LineChart daily={daily} />
                </div>
            </Card>
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
