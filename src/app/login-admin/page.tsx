import LoginForm from '@/components/LoginForm';
import Image from 'next/image';

export default function LoginAdminPage() {
    return (
        <main className='flex flex-col h-screen'>
            <div className='flex-1 flex'>
                <div className='hidden flex-1 flex-col justify-center lg:flex'>
                    <div className='relative h-full max-w-full'>
                        <Image
                            src='/logo/logo.png'
                            alt='Logo'
                            fill
                            className='object-contain'
                        />
                    </div>

                </div>
                
                <div className='mx-auto flex min-w-[45vw] max-w-2xl flex-col p-9 lg:justify-center'>
                    <div className='relative block h-32 max-w-full lg:hidden'>
                        <Image src='/logo/logo.png' alt='Logo' fill className='object-contain'/>
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
        </main>
    );
}
