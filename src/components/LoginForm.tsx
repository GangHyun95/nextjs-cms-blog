'use client';

import { useState } from 'react';
import { Button } from './ui/button';

export default function LoginForm() {
    const [form, setForm] = useState({
        id: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-4 w-full max-w-md self-start'
        >
            <input
                type='text'
                name='id'
                value={form.id}
                onChange={handleChange}
                placeholder='아이디'
                className='border border-input px-4 py-2 rounded-md text-foreground placeholder:text-muted-foreground'
                required
            />
            <input
                type='password'
                name='password'
                value={form.password}
                onChange={handleChange}
                placeholder='비밀번호'
                className='border border-input px-4 py-2 rounded-md text-foreground placeholder:text-muted-foreground'
                required
            />

            <Button
                type='submit'
                size='lg'
            >
                로그인
            </Button>
        </form>
    );
}
