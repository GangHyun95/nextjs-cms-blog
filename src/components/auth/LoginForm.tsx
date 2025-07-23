'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { useLogin } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/store/hooks';
import { setAccessToken } from '@/store/slices/authSlice';
import { validate } from '@/utils/auth';

import { InlineSpinner } from '../Spinner';



export default function LoginForm() {
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string; }>({});

    const { login, isLoggingIn } = useLogin();
    const dispatch = useAppDispatch();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const err = validate(form);
        if (err.email || err.password) return setErrors(err);

        setErrors({});
        
        try {
            const { accessToken } = await login(form);
            dispatch(setAccessToken({ accessToken }));
            router.push('/admin');
        } catch (error) {
            setErrors({ form: (error as Error).message});
            
        }
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full max-w-md self-start'>
            <input
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                placeholder='이메일'
                autoComplete='username'
                className={cn(
                    'border px-4 py-2 rounded-md text-foreground placeholder:text-muted-foreground',
                    errors.email || errors.form ? 'border-red-500' : 'border-input'
                )}
                required
            />
            {errors.email && <p className='mt-1 text-sm text-red-500'>{errors.email}</p>}

            <input
                type='password'
                name='password'
                value={form.password}
                onChange={handleChange}
                placeholder='비밀번호'
                autoComplete='current-password'
                className={cn(
                    'border px-4 py-2 rounded-md text-foreground placeholder:text-muted-foreground',
                    errors.password || errors.form ? 'border-red-500' : 'border-input'
                )}
                required
            />
            {errors.password && <p className='mt-1 text-sm text-red-500'>{errors.password}</p>}

            {errors.form && <p className='mt-1 text-sm text-red-500'>{errors.form}</p>}

            <Button type='submit' size='lg' disabled={isLoggingIn}>
                {isLoggingIn ? (
                    <>
                        <InlineSpinner />
                        <span>로그인 중...</span>
                    </>
                ) : (
                    <span>로그인</span>
                )}
            </Button>
            <Button type='button' variant='outline' size='lg' onClick={() => router.push('/')}>
                블로그 홈으로 가기
            </Button>
        </form>
    );
}
