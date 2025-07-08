import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function validate(payload: { email: string; password: string }): { email?: string; password?: string } {
    const { email, password } = payload;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return { email: '유효한 이메일 형식이 아닙니다.' };
    }

    if (password.length < 6) {
        return { password: '비밀번호는 최소 6자 이상이어야 합니다.' };
    }

    if (/\s/.test(password)) {
        return { password: '비밀번호에는 공백을 포함할 수 없습니다.' };
    }

    return {};
}
