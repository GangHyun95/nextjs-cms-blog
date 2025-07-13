'use client';

import '@/lib/chartjs';
import { Line } from 'react-chartjs-2';
import { useMemo, useEffect, useRef, useState } from 'react';
import type { ChartOptions, Chart } from 'chart.js';
import { customTooltip } from '@/lib/chartjs/plugins/customTooltip';
import ChartXAxis from './ChartXAxis';

export default function LineChart() {
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

    const labels = useMemo(() => {
        if (daysToShow === null) return [];
        const now = new Date();
        return Array.from({ length: daysToShow }, (_, i) => {
            const date = new Date();
            date.setDate(now.getDate() - (daysToShow - 1) + i);
            return date;
        });
    }, [daysToShow]);

    const data = useMemo(() => ({
        labels,
        datasets: [
            {
                label: '일간 조회수',
                data: labels.map(() => Math.floor(Math.random() * 50)),
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
                data: labels.map(() => Math.floor(Math.random() * 50)),
                borderColor: '#bfc5cd',
                pointBackgroundColor: '#ffffff',
                tension: 0.15,
                pointRadius: 4,
                pointBorderWidth: 2,
                pointHoverBackgroundColor: '#bfc5cd',
                pointHoverBorderColor: '#bfc5cd'
            },
        ],
    }), [labels]);

    const options: ChartOptions<'line'> = useMemo(() => ({
        responsive: true,
        maintainAspectRatio: false,
        // layout: { padding: { bottom: 44.5 } },
        interaction: { mode: 'index', intersect: false },
        plugins: {
            legend: { display: false },
            tooltip: { mode: 'index', enabled: false, intersect: false, external: customTooltip },
        },
        scales: {
            x: {
                grid: { display: false },
                border: { display: false },
                ticks: {
                    display: false,
                    // autoSkip: false,
                    // maxRotation: 0,
                },
            },
            y: {
                border: { display: false, dash: [3, 3], width: 0 },
                grid: { 
                    drawTicks: false, 
                    // color: (context) => {
                    //     const { index, scale } = context;
                    //     const isTop = index === scale.ticks.length - 1;
                    //     const isBottom = index === 0
                    //     return isTop || isBottom ? 'transparent' : '#d1d5db';
                    // },
                },
                ticks: { display: false, stepSize: 10 },
            },
        },
        onHover: (_event, elements, _chart) => {
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
