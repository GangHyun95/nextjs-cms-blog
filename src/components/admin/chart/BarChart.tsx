'use client';

import '@/lib/chartjs';
import { Bar } from 'react-chartjs-2';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Chart, ChartOptions } from 'chart.js';
import { customTooltip } from '@/lib/chartjs/plugins/customTooltip';
import ChartXAxis from './ChartXAxis';

export default function BarChart() {
    const chartRef = useRef<Chart<'bar'> | null>(null);
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
                setDaysToShow(21);
            }
        };

        updateDays();
        window.addEventListener('resize', updateDays);
        return () => window.removeEventListener('resize', updateDays);
    }, []);

    const labels = useMemo(() => {
        if (!daysToShow) return [];
        const now = new Date();
        return Array.from({ length: daysToShow }, (_, i) => {
            const date = new Date();
            date.setDate(now.getDate() - (daysToShow - 1) + i);
            return date;
        });
    }, [daysToShow]);

    const rawData = useMemo(() => {
        return labels.map(() => Math.floor(Math.random() * 50));
    }, [labels]);

    const differenceData = useMemo(() => {
        return rawData.map((today, i) => {
            if (i === 0) return null;
            const yesterday = rawData[i - 1];
            return Math.abs(today - yesterday);
        });
    }, [rawData]);

    const data = {
        labels,
        datasets: [
            {
                label: '일간 조회수',
                data: rawData,
                backgroundColor: '#6366f1',
                stack: 'total',
                borderRadius: 0,
                barPercentage: 0.3,
            },
            {
                label: ' ',
                data: differenceData,
                backgroundColor: '#bfc5cd',
                stack: 'total',
                borderRadius: 0,
                barPercentage: 0.3,
            },
        ]
    };

    const options = useMemo<ChartOptions<'bar'>>(() => ({
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
                stacked: true,
            },
            y: {
                border: { display: false, dash: [3, 3]},
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
            <section className='w-full h-80 pb-[52.5px] px-8'>
                <Bar ref={chartRef} data={data} options={options} />
            </section>
            <ChartXAxis
                labels={labels}
                hoveredIndex={hoveredIndex}
                onHover={handleHover}
                onLeave={handleLeave}
                withArrows={true}
            />
        </>
    );
}

