'use client';

import '@/lib/chartjs';
import { Bar } from 'react-chartjs-2';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Chart, ChartOptions } from 'chart.js';
import { customTooltip } from '@/lib/chartjs/plugins/customTooltip';
import ChartXAxis from './ChartXAxis';
import { formatToYYYY_MM_DD } from '@/lib/utils';

type Props = {
    metric: 'views' | 'users';
    displayMode: 'daily' | 'weekly' | 'monthly';
};

export default function BarChart({ metric, displayMode }: Props) {
    const chartRef = useRef<Chart<'bar'> | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const daysToShow = useMemo(() => {
        switch (displayMode) {
            case 'daily': return 21;
            case 'weekly': return 15;
            case 'monthly': return 12;
        }
    }, [displayMode]);

    const labels = useMemo(() => {
        const now = new Date();
        return Array.from({ length: daysToShow }, (_, i) => {
            const date = new Date(now);
            if (displayMode === 'daily') {
                date.setDate(now.getDate() - (daysToShow - 1 - i));
                return formatToYYYY_MM_DD(date);
            }
            if (displayMode === 'weekly') {
                date.setDate(now.getDate() - (daysToShow - 1 - i) * 7);
                return formatToYYYY_MM_DD(date);
            }
            if (displayMode === 'monthly') {
                date.setMonth(now.getMonth() - (daysToShow - 1 - i));
                return formatToYYYY_MM_DD(date);
            }
            return formatToYYYY_MM_DD(date);
        });
    }, [daysToShow, displayMode]);

    const rawData = useMemo(() => {
        return labels.map(() => Math.floor(Math.random() * 50));
    }, [labels, metric]);

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
                label: `${displayMode === 'daily' ? '일간' : displayMode === 'weekly' ? '주간' : '월간'} ${metric === 'views' ? '조회수' : '방문자'}`,
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
        ],
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
                border: { display: false, dash: [3, 3] },
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
