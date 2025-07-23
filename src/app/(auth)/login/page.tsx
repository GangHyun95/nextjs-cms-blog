import Image from 'next/image';

import LoginForm from '@/components/auth/LoginForm';

export default async function LoginAdminPage() {
    return (
        <div className='flex flex-col h-screen'>
            <div className='flex-1 flex'>
                <div className='hidden flex-1 flex-col justify-center lg:flex'>
                    <div className='relative h-full max-w-full'>
                        <Image
                            src='/logo/logo.png'
                            alt='Logo'
                            fill
                            priority
                            className='object-contain'
                            sizes='(min-width: 1024px) 57vw'
                        />
                    </div>

                </div>

                <div className='mx-auto flex min-w-[45vw] max-w-2xl flex-col p-9 lg:justify-center'>
                    <div className='flex justify-center lg:hidden'>
                        <Image src='/logo/logo.png' alt='Logo' width={128} height={128} className='object-contain'/>
                    </div>

                    <h1 className='mb-10 text-4xl font-bold sm:text-6xl lg:mb-12'>
                        관리자 로그인
                    </h1>
                    <h2 className='mb-5 text-2xl text-muted-foreground font-bold sm:text-3xl lg:mb-8'>
                        일반 사용자는 로그인 없이 이용 가능합니다.
                    </h2>
                    <section className='flex flex-col'>
                        <LoginForm />
                    </section>
                </div>
            </div>
        </div>
    );
}
