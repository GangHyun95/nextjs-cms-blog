'use client';

import AdminPageHeader from '@/components/admin/common/AdminPageHeader';
import RoleSelectDropdown from '@/components/admin/settings/RoleSelectDropdown';
import { Button } from '@/components/ui/button';
import Card from '@/components/ui/card';

export default function AdminAccountPage() {
    return (
        <div className='py-6'>
            <AdminPageHeader
                title='관리자 계정 관리'
                description='등록된 관리자 계정을 조회하고 권한을 변경하거나 삭제할 수 있습니다.'
            />

            <section className='flex flex-col space-y-4'>
                <Card className='p-0 divide-y'>
                    <div className='flex text-sm text-center font-semibold bg-slate-50'>
                        <div className='flex items-center flex-1'>
                            <div className='flex-1 py-3'>이름</div>
                            <div className='flex-2 py-3'>이메일</div>
                        </div>
                        <div className='hidden sm:flex flex-[0.5]'>
                            <div className='flex-1 py-3'>권한</div>
                            <div className='flex-[0.5] pr-4 py-3'>관리</div>
                        </div>
                    </div>

                    <div className='flex flex-col text-sm text-center sm:flex-row'>
                        <div className='flex items-center flex-1'>
                            <div className='flex-1 py-3'>admin</div>
                            <div className='flex-2 py-3'>admin@example.com</div>
                        </div>
                        <div className='flex items-center flex-[0.5] self-end gap-1 sm:gap-0'>
                            <div className='flex-1 py-3 flex justify-center'>
                                <RoleSelectDropdown defaultValue='전체 관리자' />
                            </div>
                            <div className='flex-[0.5] pr-4 py-3'>
                                <Button variant='outline' size='sm' className='text-xs '>삭제</Button>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col text-sm text-center sm:flex-row'>
                        <div className='flex items-center flex-1'>
                            <div className='flex-1 py-3'>readonly</div>
                            <div className='flex-2 py-3'>readonly@example.com</div>
                        </div>
                        <div className='flex items-center flex-[0.5] self-end gap-1 sm:gap-0'>
                            <div className='flex-1 py-3 flex justify-center'>
                                <RoleSelectDropdown defaultValue='열람 전용' />
                            </div>
                            <div className='flex-[0.5] pr-4 py-3'>
                                <Button variant='outline' size='sm' className='text-xs '>삭제</Button>
                            </div>
                        </div>
                    </div>
                </Card>

                <Button className='self-end' size='lg'>변경사항 저장</Button>
            </section>
        </div>
    );
}