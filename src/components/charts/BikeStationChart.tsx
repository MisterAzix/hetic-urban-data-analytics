'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Statistiques des stations de vélos</CardTitle>
          <CardDescription>
            Vélos disponibles et places vides par jour sur les stations de vélos
          </CardDescription>
        </div>
        <div className="flex">
          {['free_bikes', 'empty_slots'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 truncate border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
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
                  className="w-[150px]"
                  nameKey="free_bikes"
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
      </CardContent>
    </Card>
  );
}
