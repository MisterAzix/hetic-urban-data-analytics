'use client';

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { month: 'Janvier', crimes: 186 },
  { month: 'Février', crimes: 305 },
  { month: 'Mars', crimes: 237 },
  { month: 'Avril', crimes: 73 },
  { month: 'Mai', crimes: 209 },
  { month: 'Juin', crimes: 214 },
];

const chartConfig = {
  crimes: {
    label: 'Crimes',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function CrimeFrequencyChart() {
  return (
    <ChartContainer config={chartConfig} className="h-64 w-full px-4">
      <LineChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          content={<ChartTooltipContent hideLabel={true} />}
          isAnimationActive={false}
        />
        <Line
          dataKey="crimes"
          type="natural"
          stroke="var(--color-crimes)"
          strokeWidth={2}
        />
      </LineChart>
    </ChartContainer>
  );
}
