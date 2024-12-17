'use client';

import { Pie, PieChart, LabelList } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { group: 'minor', crimes: 275, fill: 'var(--color-minor)' },
  { group: 'young', crimes: 200, fill: 'var(--color-young)' },
  { group: 'adult', crimes: 187, fill: 'var(--color-adult)' },
  { group: 'mature', crimes: 173, fill: 'var(--color-mature)' },
  { group: 'senior', crimes: 90, fill: 'var(--color-senior)' },
];

const chartConfig = {
  crimes: {
    label: 'Crimes',
  },
  minor: {
    label: '<18',
    color: 'hsl(var(--chart-1))',
  },
  young: {
    label: '18-24',
    color: 'hsl(var(--chart-2))',
  },
  adult: {
    label: '25-44',
    color: 'hsl(var(--chart-3))',
  },
  mature: {
    label: '45-64',
    color: 'hsl(var(--chart-4))',
  },
  senior: {
    label: '65+',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export default function CrimeAgeGroupChart() {
  return (
    <ChartContainer config={chartConfig} className="h-64">
      <PieChart>
        <ChartTooltip
          content={<ChartTooltipContent nameKey="crimes" hideLabel={true} />}
        />
        <Pie data={chartData} dataKey="crimes" nameKey="group">
          <LabelList
            dataKey="group"
            className="fill-background"
            stroke="none"
            fontSize={12}
            formatter={(value: keyof typeof chartConfig) =>
              chartConfig[value]?.label
            }
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
