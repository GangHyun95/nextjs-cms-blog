export function formatDate(date: Date): string {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

export function parseYearMonth(str: string): string {
    return `${str.slice(0, 4)}-${str.slice(4, 6)}-01`;
}

export function parseYearWeek(weekStr: string): string {
    const year = parseInt(weekStr.slice(0, 4), 10);
    const week = parseInt(weekStr.slice(4), 10);

    const jan4 = new Date(year, 0, 4);
    const dayOfWeek = jan4.getDay() || 7;
    const monday = new Date(jan4);
    monday.setDate(jan4.getDate() - (dayOfWeek - 1) + (week - 1) * 7);

    const yyyy = monday.getFullYear();
    const mm = String(monday.getMonth() + 1).padStart(2, '0');
    const dd = String(monday.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`;
}

export function parseCompactDate(str: string): string {
    const year = str.slice(0, 4);
    const month = str.slice(4, 6);
    const day = str.slice(6, 8);
    return `${year}-${month}-${day}`;
}

export function getDisplayLabel(selection: { offset: number; days: number } | null,mode: 'date' | 'yearWeek' | 'yearMonth'): string {
    if (!selection) return '';

    const base = new Date();
    base.setDate(base.getDate() - selection.offset);
    base.setHours(0, 0, 0, 0);

    const format = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    if (mode === 'date') {
        const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
        const weekday = dayNames[base.getDay()];
        return `${format(base)} ${weekday}`;
    }

    if (mode === 'yearWeek') {
        const start = new Date(base);
        const day = start.getDay() || 7;
        start.setDate(start.getDate() - (day - 1));
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        return `${format(start)} ~ ${format(end)}`;
    }

    if (mode === 'yearMonth') {
        const year = base.getFullYear();
        const month = String(base.getMonth() + 1).padStart(2, '0');
        return `${year}.${month}`;
    }

    return '';
}
