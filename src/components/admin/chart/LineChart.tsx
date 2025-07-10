'use client';

import '@/lib/chartjs';
import { Line } from 'react-chartjs-2';
import { useMemo, useEffect, useState } from 'react';
import type { ChartOptions } from 'chart.js';
import { customTooltip } from '@/lib/chartjs/plugins/customTooltip';

export default function LineChart() {
    const [daysToShow, setDaysToShow] = useState(30);

    useEffect(() => {
        const updateDays = () => {
            const width = window.innerWidth;
            if (width < 768) {
                setDaysToShow(7);
            } else if (width < 1280) {
                setDaysToShow(14);
            } else {
                setDaysToShow(30);
            }
        };

        updateDays();
        window.addEventListener('resize', updateDays);
        return () => window.removeEventListener('resize', updateDays);
    }, []);

    const labels = useMemo(() => {
        const now = new Date();
        return Array.from({ length: daysToShow }, (_, i) => {
            const date = new Date();
            date.setDate(now.getDate() - (daysToShow - 1) + i);
            return date.toDateString() === now.toDateString() ? '오늘' : `${date.getDate()}`;
        });
    }, [daysToShow]);

    const data = useMemo(() => ({
        labels,
        datasets: [
            {
                label: '일간 조회수',
                data: labels.map(() => Math.floor(Math.random() * 50)),
                borderColor: '#f87171',
                pointBackgroundColor: '#ffffff',
                tension: 0.15,
                pointRadius: 4,
                pointBorderWidth: 2,
            },
            {
                label: '일간 방문자',
                data: labels.map(() => Math.floor(Math.random() * 50)),
                borderColor: '#bfc5cd',
                pointBackgroundColor: '#ffffff',
                tension: 0.15,
                pointRadius: 4,
                pointBorderWidth: 2,
            },
        ],
    }), [labels]);

    const options: ChartOptions<'line'> = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { mode: 'index', enabled: false, intersect: false, external: customTooltip },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    autoSkip: false,
                    maxRotation: 0,
                },
            },
            y: {
                border: { display: false, dash: [3, 3] },
                grid: { drawTicks: false },
                ticks: { display: false, stepSize: 10 },
            },
        },
    }), []);
    return <Line key={daysToShow} options={options} data={data} />;
}
