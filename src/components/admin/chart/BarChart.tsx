'use client';

import '@/lib/chartjs';
import { Bar } from 'react-chartjs-2';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { Chart, ChartOptions } from 'chart.js';
import { customTooltip } from '@/lib/chartjs/plugins/customTooltip';
import ChartXAxis from './ChartXAxis';
import { formatToYYYY_MM_DD } from '@/lib/utils';
import { AnalyticsDaily } from '@/types/service';

type Props = {
    metric: 'views' | 'users';
    displayMode: 'date' | 'yearWeek' | 'yearMonth';
    data: AnalyticsDaily[];
    offset: number;
    setOffset: React.Dispatch<React.SetStateAction<number>>;
};

const MAX_BY_MODE: Record<'date' | 'yearWeek' | 'yearMonth', number> = {
    date: 21,
    yearWeek: 15,
    yearMonth: 12,
};

export default function BarChart({ metric, displayMode, data, offset, setOffset }: Props) {
    const chartRef = useRef<Chart<'bar'> | null>(null);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [count, setCount] = useState(MAX_BY_MODE[displayMode]);

    useEffect(() => {
        const updateCount = () => {
            const width = window.innerWidth;
            if (width < 768) setCount(Math.min(7, MAX_BY_MODE[displayMode]));
            else if (width < 1280) setCount(Math.min(14, MAX_BY_MODE[displayMode]));
            else setCount(MAX_BY_MODE[displayMode]);
        };
        updateCount();
        window.addEventListener('resize', updateCount);
        return () => window.removeEventListener('resize', updateCount);
    }, [displayMode]);

    const sliced = useMemo(() => data.slice(-count), [data, count]);
    const labels = useMemo(() => sliced.map(item => formatToYYYY_MM_DD(item.date)), [sliced]);
    const rawData = useMemo(() => sliced.map((data) => data[metric]), [sliced, metric]);
    
    const differenceData = useMemo(() => {
        return rawData.map((current, i) => (i === 0 ? null : Math.abs(current - rawData[i - 1])));
    }, [rawData]);

    const chartData = useMemo(() => ({
        labels,
        datasets: [
            {
                label: `${displayMode === 'date' ? '일간' : displayMode === 'yearWeek' ? '주간' : '월간'} ${metric === 'views' ? '조회수' : '방문자'}`,
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
    }), [labels, rawData, differenceData, displayMode, metric]);

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
                ticks: { display: false, maxTicksLimit: 5 },
            },
        },
        onHover: (_event, elements) => {
            const nextIndex = elements.length > 0 ? elements[0].index : null;
            setHoveredIndex(prev => (prev === nextIndex ? prev : nextIndex));
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
                <Bar ref={chartRef} data={chartData} options={options} />
            </section>
            <ChartXAxis
                labels={labels}
                hoveredIndex={hoveredIndex}
                onHover={handleHover}
                onLeave={handleLeave}
                withArrows={true}
                displayMode={displayMode}
                offset={offset}
                setOffset={setOffset}
            />
        </>
    );
}
