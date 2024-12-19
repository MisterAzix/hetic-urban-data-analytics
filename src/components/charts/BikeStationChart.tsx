'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { BikeStationData } from '../tabs/BikeTab';

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

export default function BikeStationChart({
  data,
}: {
  data: BikeStationData[];
}) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('free_bikes');

  const total = React.useMemo(
    () => ({
      free_bikes: data.reduce((acc, curr) => acc + curr.free_bikes, 0),
      empty_slots: data.reduce((acc, curr) => acc + curr.empty_slots, 0),
    }),
    [data],
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
          accessibilityLayer={true}
          data={data}
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
              return new Date(value).toLocaleDateString('fr-FR', {
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
            animationDuration={0}
          />
          <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
