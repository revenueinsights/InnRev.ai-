import type { ScriptableContext } from 'chart.js';

const createGradient = (
  context: ScriptableContext<'doughnut'>,
  colors: [number, string][]
) => {
  const ctx = context.chart.ctx;
  const gradient = ctx.createLinearGradient(0, 0, 110, 0);

  colors.forEach(([stop, color]) => gradient.addColorStop(stop, color));

  return gradient;
};

export const gradientColor = (context: ScriptableContext<'doughnut'>) => {
  const colors: [number, string][] = [
    [1, '#FF85E1'],
    [0.999, '#9590FA'],
    [0.89, '#D4A3FF'],
    [0, '#FCB4F5'],
  ];

  return context.dataIndex === 0 ? createGradient(context, colors) : '#efefef';
};

export const gradientColorForGauge = (
  context: ScriptableContext<'doughnut'>
) => {
  const colors: [number, string][] = [
    [0, '#FEC5D9'],
    // [0.5, '#FEC5D9'],
    [0.2, '#CCA0FE'],
    [1, '#8A84FE'],
  ];

  return context.dataIndex === 0 ? createGradient(context, colors) : '#efefef';
};

export const chartData = (name: string, chartValue: number, empty: boolean) => {
  const backgroundColor = empty
    ? ['#E8E8E8', '#E8E8E850']
    : name === 'Occupancy'
    ? gradientColor
    : gradientColorForGauge;

  return {
    datasets: [
      {
        label: 'ADR',
        data: [chartValue, 100 - chartValue],
        borderWidth: 0,
        needleValue: 40,
        borderRadius: name === 'Occupancy' ? 3 : 6,
        backgroundColor,
        hoverBackgroundColor: backgroundColor,
      },
    ],
  };
};

export const chartOptions = (name: string) => {
  return name === 'Occupancy'
    ? { cutout: 42 }
    : { cutout: 72, circumference: 180, rotation: 270 };
};
