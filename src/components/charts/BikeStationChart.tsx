'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { date: '2024-04-01', free_bikes: 222, empty_slots: 150 },
  { date: '2024-04-02', free_bikes: 97, empty_slots: 180 },
  { date: '2024-04-03', free_bikes: 167, empty_slots: 120 },
  { date: '2024-04-04', free_bikes: 242, empty_slots: 260 },
  { date: '2024-04-05', free_bikes: 373, empty_slots: 290 },
  { date: '2024-04-06', free_bikes: 301, empty_slots: 340 },
  { date: '2024-04-07', free_bikes: 245, empty_slots: 180 },
  { date: '2024-04-08', free_bikes: 409, empty_slots: 320 },
  { date: '2024-04-09', free_bikes: 59, empty_slots: 110 },
  { date: '2024-04-10', free_bikes: 261, empty_slots: 190 },
  { date: '2024-04-11', free_bikes: 327, empty_slots: 350 },
  { date: '2024-04-12', free_bikes: 292, empty_slots: 210 },
  { date: '2024-04-13', free_bikes: 342, empty_slots: 380 },
  { date: '2024-04-14', free_bikes: 137, empty_slots: 220 },
  { date: '2024-04-15', free_bikes: 120, empty_slots: 170 },
  { date: '2024-04-16', free_bikes: 138, empty_slots: 190 },
  { date: '2024-04-17', free_bikes: 446, empty_slots: 360 },
  { date: '2024-04-18', free_bikes: 364, empty_slots: 410 },
  { date: '2024-04-19', free_bikes: 243, empty_slots: 180 },
  { date: '2024-04-20', free_bikes: 89, empty_slots: 150 },
  { date: '2024-04-21', free_bikes: 137, empty_slots: 200 },
  { date: '2024-04-22', free_bikes: 224, empty_slots: 170 },
  { date: '2024-04-23', free_bikes: 138, empty_slots: 230 },
  { date: '2024-04-24', free_bikes: 387, empty_slots: 290 },
  { date: '2024-04-25', free_bikes: 215, empty_slots: 250 },
  { date: '2024-04-26', free_bikes: 75, empty_slots: 130 },
  { date: '2024-04-27', free_bikes: 383, empty_slots: 420 },
  { date: '2024-04-28', free_bikes: 122, empty_slots: 180 },
  { date: '2024-04-29', free_bikes: 315, empty_slots: 240 },
  { date: '2024-04-30', free_bikes: 454, empty_slots: 380 },
  { date: '2024-05-01', free_bikes: 165, empty_slots: 220 },
  { date: '2024-05-02', free_bikes: 293, empty_slots: 310 },
  { date: '2024-05-03', free_bikes: 247, empty_slots: 190 },
  { date: '2024-05-04', free_bikes: 385, empty_slots: 420 },
  { date: '2024-05-05', free_bikes: 481, empty_slots: 390 },
  { date: '2024-05-06', free_bikes: 498, empty_slots: 520 },
  { date: '2024-05-07', free_bikes: 388, empty_slots: 300 },
  { date: '2024-05-08', free_bikes: 149, empty_slots: 210 },
  { date: '2024-05-09', free_bikes: 227, empty_slots: 180 },
  { date: '2024-05-10', free_bikes: 293, empty_slots: 330 },
  { date: '2024-05-11', free_bikes: 335, empty_slots: 270 },
  { date: '2024-05-12', free_bikes: 197, empty_slots: 240 },
  { date: '2024-05-13', free_bikes: 197, empty_slots: 160 },
  { date: '2024-05-14', free_bikes: 448, empty_slots: 490 },
  { date: '2024-05-15', free_bikes: 473, empty_slots: 380 },
  { date: '2024-05-16', free_bikes: 338, empty_slots: 400 },
  { date: '2024-05-17', free_bikes: 499, empty_slots: 420 },
  { date: '2024-05-18', free_bikes: 315, empty_slots: 350 },
  { date: '2024-05-19', free_bikes: 235, empty_slots: 180 },
  { date: '2024-05-20', free_bikes: 177, empty_slots: 230 },
  { date: '2024-05-21', free_bikes: 82, empty_slots: 140 },
  { date: '2024-05-22', free_bikes: 81, empty_slots: 120 },
  { date: '2024-05-23', free_bikes: 252, empty_slots: 290 },
  { date: '2024-05-24', free_bikes: 294, empty_slots: 220 },
  { date: '2024-05-25', free_bikes: 201, empty_slots: 250 },
  { date: '2024-05-26', free_bikes: 213, empty_slots: 170 },
  { date: '2024-05-27', free_bikes: 420, empty_slots: 460 },
  { date: '2024-05-28', free_bikes: 233, empty_slots: 190 },
  { date: '2024-05-29', free_bikes: 78, empty_slots: 130 },
  { date: '2024-05-30', free_bikes: 340, empty_slots: 280 },
  { date: '2024-05-31', free_bikes: 178, empty_slots: 230 },
  { date: '2024-06-01', free_bikes: 178, empty_slots: 200 },
  { date: '2024-06-02', free_bikes: 470, empty_slots: 410 },
  { date: '2024-06-03', free_bikes: 103, empty_slots: 160 },
  { date: '2024-06-04', free_bikes: 439, empty_slots: 380 },
  { date: '2024-06-05', free_bikes: 88, empty_slots: 140 },
  { date: '2024-06-06', free_bikes: 294, empty_slots: 250 },
  { date: '2024-06-07', free_bikes: 323, empty_slots: 370 },
  { date: '2024-06-08', free_bikes: 385, empty_slots: 320 },
  { date: '2024-06-09', free_bikes: 438, empty_slots: 480 },
  { date: '2024-06-10', free_bikes: 155, empty_slots: 200 },
  { date: '2024-06-11', free_bikes: 92, empty_slots: 150 },
  { date: '2024-06-12', free_bikes: 492, empty_slots: 420 },
  { date: '2024-06-13', free_bikes: 81, empty_slots: 130 },
  { date: '2024-06-14', free_bikes: 426, empty_slots: 380 },
  { date: '2024-06-15', free_bikes: 307, empty_slots: 350 },
  { date: '2024-06-16', free_bikes: 371, empty_slots: 310 },
  { date: '2024-06-17', free_bikes: 475, empty_slots: 520 },
  { date: '2024-06-18', free_bikes: 107, empty_slots: 170 },
  { date: '2024-06-19', free_bikes: 341, empty_slots: 290 },
  { date: '2024-06-20', free_bikes: 408, empty_slots: 450 },
  { date: '2024-06-21', free_bikes: 169, empty_slots: 210 },
  { date: '2024-06-22', free_bikes: 317, empty_slots: 270 },
  { date: '2024-06-23', free_bikes: 480, empty_slots: 530 },
  { date: '2024-06-24', free_bikes: 132, empty_slots: 180 },
  { date: '2024-06-25', free_bikes: 141, empty_slots: 190 },
  { date: '2024-06-26', free_bikes: 434, empty_slots: 380 },
  { date: '2024-06-27', free_bikes: 448, empty_slots: 490 },
  { date: '2024-06-28', free_bikes: 149, empty_slots: 200 },
  { date: '2024-06-29', free_bikes: 103, empty_slots: 160 },
  { date: '2024-06-30', free_bikes: 446, empty_slots: 400 },
];

const chartConfig = {
  free_bikes: {
    label: 'Vélos disponibles',
    color: 'hsl(var(--chart-1))',
  },
  empty_slots: {
    label: 'Places vides',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export default function Component() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('free_bikes');

  const total = React.useMemo(
    () => ({
      free_bikes: chartData.reduce((acc, curr) => acc + curr.free_bikes, 0),
      empty_slots: chartData.reduce((acc, curr) => acc + curr.empty_slots, 0),
    }),
    [],
  );

  return (
    <div>
      <div className="flex items-center justify-between border-b">
        <h2 className="pl-4 text-2xl font-semibold">
          Statistiques sur les stations
        </h2>
        <div className="flex">
          {['free_bikes', 'empty_slots'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-col justify-center gap-1 border-l px-8 py-4 even:border-l data-[active=true]:bg-white/50"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-3xl font-bold leading-none">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <ChartContainer config={chartConfig} className="h-64 w-full p-4">
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="date"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            minTickGap={32}
            tickFormatter={(value) => {
              const date = new Date(value);
              return date.toLocaleDateString('fr-FR', {
                month: 'short',
                day: 'numeric',
              });
            }}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                className="w-44"
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString('fr-FR', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  });
                }}
              />
            }
          />
          <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
