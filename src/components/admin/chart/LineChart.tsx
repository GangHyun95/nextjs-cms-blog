'use client';

import '@/lib/chartjs';
import { Line } from 'react-chartjs-2';
import { useMemo, useEffect, useRef, useState } from 'react';
import type { ChartOptions, Chart } from 'chart.js';
import { customTooltip } from '@/lib/chartjs/plugins/customTooltip';
import { AnalyticsDaily } from '@/types/service';
import { formatToYYYY_MM_DD } from '@/lib/utils';

import ChartXAxis from './ChartXAxis';

export default function LineChart({ daily }: { daily: AnalyticsDaily[] }) {
    const chartRef = useRef<Chart<'line'> | null>(null);
    const [daysToShow, setDaysToShow] = useState<number | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

    const sliced = useMemo(() => {
        if (daysToShow === null) return [];
        return daily.slice(-daysToShow);
    }, [daily, daysToShow]);

    const labels = useMemo(() => sliced.map(item => formatToYYYY_MM_DD(item.date)), [sliced]);

    const data = useMemo(() => ({
        labels,
        datasets: [
            {
                label: '일간 조회수',
                data: sliced.map(d => d.views),
                borderColor: '#6366f1',
                pointBackgroundColor: '#ffffff',
                tension: 0.15,
                pointRadius: 4,
                pointBorderWidth: 2,
                pointHoverBackgroundColor: '#6366f1',
                pointHoverBorderColor: '#6366f1'
            },
            {
                label: '일간 방문자',
                data: sliced.map(d => d.users),
                borderColor: '#bfc5cd',
                pointBackgroundColor: '#ffffff',
                tension: 0.15,
                pointRadius: 4,
                pointBorderWidth: 2,
                pointHoverBackgroundColor: '#bfc5cd',
                pointHoverBorderColor: '#bfc5cd'
            },
        ]
    }), [labels, sliced]);

    const options: ChartOptions<'line'> = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: { display: false },
            tooltip: { mode: 'index', enabled: false, intersect: false, external: customTooltip },
        },
        scales: {
            x: {
                grid: { display: false },
                border: { display: false },
                ticks: { display: false },
            },
            y: {
                border: { display: false, dash: [3, 3], width: 0 },
                grid: { drawTicks: false },
                ticks: { display: false, stepSize: 10 },
            },
        },
        onHover: (_event, elements) => {
            setHoveredIndex(elements.length > 0 ? elements[0].index : null);
        },
    }), []);

    const handleHover = (index: number) => {
        setHoveredIndex(index);
        const chart = chartRef.current;
        if (!chart) return;

        const meta = chart.getDatasetMeta(0);
        const point = meta.data[index];
        if (!point) return;

        const { x, y } = point;
        const active = chart.data.datasets.map((_, i) => ({ datasetIndex: i, index }));
        chart.setActiveElements(active);
        chart.tooltip?.setActiveElements(active, { x, y });
        chart.update();
    };

    const handleLeave = () => {
        setHoveredIndex(null);
        const chart = chartRef.current;
        if (!chart) return;

        chart.setActiveElements([]);
        chart.tooltip?.setActiveElements([], { x: 0, y: 0 });
        chart.update();
    };

    return (
        <>
            <section className='w-full h-80 pb-[52.5px]'>
                <Line ref={chartRef} data={data} options={options} />
            </section>
            <ChartXAxis
                labels={labels}
                hoveredIndex={hoveredIndex}
                onHover={handleHover}
                onLeave={handleLeave}
            />
        </>
    );
}
