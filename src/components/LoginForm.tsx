'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useLogin } from '@/hooks/useAuth';
import { useAppDispatch } from '@/store/hooks';
import { setAccessToken } from '@/store/slices/authSlice';
import { cn, validate } from '@/lib/utils';

import { InlineSpinner } from './Spinner';

export default function LoginForm() {
    const router = useRouter();
    const [form, setForm] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    const { login, isLoggingIn, error } = useLogin();
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
        
        const data = await login(form);
        dispatch(setAccessToken({ accessToken: data.accessToken }));
        router.push('/admin');
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full max-w-md self-start'>
            <input
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                placeholder='이메일'
                className={cn(
                    'border px-4 py-2 rounded-md text-foreground placeholder:text-muted-foreground',
                    errors.email || error ? 'border-red-500' : 'border-input'
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
                className={cn(
                    'border px-4 py-2 rounded-md text-foreground placeholder:text-muted-foreground',
                    errors.password || error ? 'border-red-500' : 'border-input'
                )}
                required
            />
            {errors.password && <p className='mt-1 text-sm text-red-500'>{errors.password}</p>}

            {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}

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
        </form>
    );
}
