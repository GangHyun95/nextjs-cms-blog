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

export function formatToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
}

export function formatToYYYY_MM_DD(date: Date | string): string {
    if (date instanceof Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    if (typeof date === 'string' && date.length === 8) {
        const year = date.slice(0, 4);
        const month = date.slice(4, 6);
        const day = date.slice(6, 8);
        return `${year}-${month}-${day}`;
    }

    throw new Error('Invalid date format');
}
