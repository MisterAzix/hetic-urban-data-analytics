'use client';

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  crimes: {
    label: 'Crimes',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function CrimeFrequencyChart({
  data,
}: {
  data: { [key: string]: number };
}) {
  const chartData = [
    { month: 'Janvier', crimes: data.january },
    { month: 'Février', crimes: data.february },
    { month: 'Mars', crimes: data.march },
    { month: 'Avril', crimes: data.april },
    { month: 'Mai', crimes: data.may },
    { month: 'Juin', crimes: data.june },
    { month: 'Juillet', crimes: data.july },
    { month: 'Août', crimes: data.august },
    { month: 'Septembre', crimes: data.september },
  ];

  return (
    <ChartContainer
      config={chartConfig}
      className="h-64 w-full overflow-auto px-4"
    >
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
