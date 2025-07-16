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

export function formatYearWeek(str: string): string {
    const year = str.slice(0, 4);
    const week = str.slice(4).padStart(2, '0');
    return `${year}W${week}`;
}

export function formatToYYYY_MM_DD(date: Date | string): string {
    if (date instanceof Date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    if (typeof date === 'string') {
        if (date.length === 8) {
            return `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`;
        }

        if (date.length === 6) {
            return `${date.slice(0, 4)}-${date.slice(4, 6)}-01`;
        }

        if (date.length === 7 && date.includes('W')) {
            const year = parseInt(date.slice(0, 4), 10);
            const week = parseInt(date.slice(5), 10);

            const jan4 = new Date(year, 0, 4);
            const dayOfWeek = jan4.getDay();
            const isoWeekStart = new Date(jan4);
            isoWeekStart.setDate(jan4.getDate() - ((dayOfWeek + 6) % 7));

            isoWeekStart.setDate(isoWeekStart.getDate() + (week - 1) * 7);

            const yyyy = isoWeekStart.getFullYear();
            const mm = String(isoWeekStart.getMonth() + 1).padStart(2, '0');
            const dd = String(isoWeekStart.getDate()).padStart(2, '0');

            return `${yyyy}-${mm}-${dd}`;
        }
    }

    throw new Error('Invalid date format');
}
