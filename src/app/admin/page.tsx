import LineChart from '@/components/admin/chart/LineChart';
import StatOverview from '@/components/admin/StatOverview';

export default function AdminPage() {
    return (
        <div className='h-screen py-8'>
            <StatOverview />
            <section className='bg-white border rounded-xs mt-1 p-5' style={{ width: '100%', height: '300px' }}>
                <LineChart />
            </section>
        </div>
    );
}
