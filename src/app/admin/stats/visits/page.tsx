import { StatOverview } from '@/components/admin/dashboard';
import Card from '@/components/ui/card';
import BarChart from '@/components/admin/chart/BarChart';
import { Button } from '@/components/ui/button';

export default function VisitStatsPage() {
    return (
        <div className='py-8'>
            <StatOverview />

            <Card as='section' padding='lg' className='relative mt-1 pt-7'>
                <div className='flex'>
                    <h3 className='text-xl font-semibold flex-1'>2025.07</h3>
                    <div className='flex gap-4'>
                        <div className='inline-flex rounded-xs overflow-hidden border'>
                            <Button variant='ghost' size='xs' className='text-xs bg-muted-foreground text-white rounded-none'>조회수</Button>
                            <Button variant='ghost' size='xs' className='text-xs text-muted-foreground rounded-none border-l'>방문자</Button>
                        </div>

                        <div className='inline-flex rounded-xs overflow-hidden border ml-2'>
                            <Button variant='ghost' size='xs' className='text-xs text-muted-foreground rounded-none border-r'>일간</Button>
                            <Button variant='ghost' size='xs' className='text-xs text-muted-foreground rounded-none border-r'>주간</Button>
                            <Button variant='ghost' size='xs' className='text-xs bg-muted-foreground text-white rounded-none'>월간</Button>
                        </div>
                    </div>
                </div>
                <BarChart />
            </Card>
        </div>
    );
}
