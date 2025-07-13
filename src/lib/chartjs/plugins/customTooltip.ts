import type { TooltipModel, Chart } from 'chart.js';

let tooltipEl: HTMLDivElement | null = null;

export function customTooltip({ chart, tooltip }: { chart: Chart; tooltip: TooltipModel<'line' | 'bar'> }) {
    if (!chart.canvas.parentNode) return;

    if (!tooltipEl || !chart.canvas.parentNode.contains(tooltipEl)) {
        tooltipEl = document.createElement('div');
        tooltipEl.className = 'chart-tooltip';
        chart.canvas.parentNode.appendChild(tooltipEl);
    }

    if (!tooltip || tooltip.opacity === 0) {
        tooltipEl.style.opacity = '0';
        return;
    }

    const { offsetLeft: posX, offsetTop: posY } = chart.canvas;

    const dataPoints = tooltip.dataPoints;
    const sorted = [...dataPoints].sort((a, b) => a.element.y - b.element.y);
    const topPoint = sorted[0];

    const x = topPoint.element.x;
    const y = topPoint.element.y;
    const dataIndex = topPoint.dataIndex;

    const datasets = chart.data.datasets;

    let html = '<div class="chart-tooltip__content">';

    const filtered = tooltip.body.filter((b) => {
        const [label] = b.lines[0].split(':');
        return !!label.trim();
    });
    
    filtered.forEach((b, i) => {
        const raw = b.lines[0];
        const [label, valueStr] = raw.split(':').map((s) => s.trim());

        const value = Number(valueStr);

        const prev = datasets[i].data[dataIndex - 1];
        const diff = typeof prev === 'number' ? value - prev : 0;

        const changeClass = diff >= 0
            ? 'chart-tooltip__change chart-tooltip__change--up'
            : 'chart-tooltip__change chart-tooltip__change--down';

        const changeValue = Math.abs(diff);

        html += `
            <div class='chart-tooltip__item'>
                <p class='chart-tooltip__label'>${label}</p>
                <div class='chart-tooltip__value-wrapper'>
                    <span class='chart-tooltip__value'>${value}</span>
                    <span class='chart-tooltip__diff-wrapper'>
                        <span class='${changeClass}'></span>
                        <span class='chart-tooltip__diff'>${changeValue}</span>
                    </span>
                </div>
            </div>
        `;

        if (i !== filtered.length - 1) {
            html += `<div class='chart-tooltip__divider'></div>`;
        }
    });

    html += '</div>';

    tooltipEl.innerHTML = html;

    const tooltipWidth = tooltipEl.offsetWidth;
    const tooltipHeight = tooltipEl.offsetHeight;

    let left = posX + x - 8;
    const top = posY + y - tooltipHeight - 8;

    if (left + tooltipWidth > window.innerWidth - 8) {
        left = left - tooltipWidth;
    }

    tooltipEl.style.left = `${left}px`;
    tooltipEl.style.top = `${top}px`;
    tooltipEl.style.opacity = '1';
}
