import { StatOverview } from '@/components/admin/dashboard';
import ChartSection from '@/components/admin/visits/ChartSection';

export default function VisitStatsPage() {
    return (
        <div className='py-8'>
            <StatOverview showStatsLink={false} />

            <ChartSection />

        </div>
    );
}
