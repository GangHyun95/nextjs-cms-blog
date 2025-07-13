import AdminPageHeader from '@/components/admin/common/AdminPageHeader';
import CategoryItem from '@/components/admin/categories/CategoryItem';
import { Button } from '@/components/ui/button';
import Card from '@/components/ui/card';

const dummy = [
    {
        id: 1,
        label: '프론트엔드',
        children: [
            { id: 2, label: 'React' },
            { id: 3, label: 'Next.js' }
        ]
    },
    {
        id: 4,
        label: '백엔드',
        children: [
            { id: 5, label: 'Node.js' },
            { id: 6, label: 'Express.js' }
        ]
    },
    {
        id: 7,
        label: '데이터베이스',
        children: [
            { id: 8, label: 'PostgreSQL' },
            { id: 9, label: 'MongoDB' },
            { id: 10, label: 'Supabase' }
        ]
    },
];

export default function CategoriesPage() {
    return (
        <div className='py-6'>
            <AdminPageHeader
                title='카테고리 관리'
                description='드래그 앤 드롭으로 카테고리 순서를 변경할 수 있습니다.'
                right={
                    <div className='flex gap-1'>
                        <Button variant='outline' size='sm'>전체 펼치기</Button>
                        <Button variant='outline' size='sm'>전체 접기</Button>
                    </div>
                }
            />
            <Card padding='sm' className='flex flex-col space-y-4 bg-slate-200'>
                {dummy.map((group) => (
                    <section key={group.id} className='border'>
                        <CategoryItem label={group.label} isParent />
                        {group.children.map(child => (
                            <CategoryItem key={child.id} label={child.label} />
                        ))}
                    </section>
                ))}
                <Button className='self-end' size='lg'>변경사항 저장</Button>
            </Card>
        </div>
    );
}
