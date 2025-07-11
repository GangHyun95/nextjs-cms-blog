import LineChart from '@/components/admin/chart/LineChart';
import StatOverview from '@/components/admin/StatOverview';

export default function AdminPage() {
    return (
        <div className='h-screen py-8'>
            <StatOverview />
            <LineChart />
        </div>
    );
}
