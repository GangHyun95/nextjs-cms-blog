import { StatOverview } from '@/components/admin/dashboard';
import Card from '@/components/ui/card';
import BarChart from '@/components/admin/chart/BarChart';
import { Button } from '@/components/ui/button';
import StatGroup from '@/components/admin/visits/StatGroup';

export default function VisitStatsPage() {
    const temp = 31;

    const statGroups = [
        {
            title: '검색',
            data: [
                { label: '네이버', value: 5 },
                { label: '다음', value: 3 },
                { label: '구글', value: 12 },
                { label: '기타', value: 0 },
            ],
        },
        {
            title: 'SNS',
            data: [
                { label: '카카오톡', value: 6 },
                { label: '페이스북', value: 0 },
                { label: '인스타그램', value: 5 },
                { label: '기타 SNS', value: 0 },
            ],
        },
        {
            title: '브라우저',
            data: [
                { label: 'Chrome', value: 78 },
                { label: 'Safari', value: 15 },
                { label: 'Firefox', value: 0 },
                { label: 'Edge', value: 7 },
            ],
        },
        {
            title: '디바이스',
            data: [
                { label: 'PC', value: 0 },
                { label: '모바일', value: 0 },
            ],
        },
    ];

    return (
        <div className='py-8'>
            <StatOverview showStatsLink={false} />

            <Card as='section' padding='md' className='relative mt-1'>
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

                <div className='relative border-b'>
                    <BarChart />
                </div>

                <div className='flex flex-col mt-10 pl-2.5 gap-10 xl:flex-row'>
                    {statGroups.map((group) => (
                        <StatGroup key={group.title} group={group} totalViews={temp} />
                    ))}
                </div>
            </Card>
        </div>
    );
}
