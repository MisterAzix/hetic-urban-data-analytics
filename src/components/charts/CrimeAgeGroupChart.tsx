'use client';

import { Pie, PieChart, LabelList } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface AgeGroupCounts {
  LESS_THAN_18: number;
  AGE_18_TO_24: number;
  AGE_25_TO_44: number;
  AGE_45_TO_64: number;
  AGE_65_PLUS: number;
}

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

export default function CrimeAgeGroupChart({ data }: { data: AgeGroupCounts }) {
  const chartData = [
    {
      group: 'minor',
      crimes: data.LESS_THAN_18,
      fill: 'var(--color-minor)',
    },
    {
      group: 'young',
      crimes: data.AGE_18_TO_24,
      fill: 'var(--color-young)',
    },
    {
      group: 'adult',
      crimes: data.AGE_25_TO_44,
      fill: 'var(--color-adult)',
    },
    {
      group: 'mature',
      crimes: data.AGE_45_TO_64,
      fill: 'var(--color-mature)',
    },
    {
      group: 'senior',
      crimes: data.AGE_65_PLUS,
      fill: 'var(--color-senior)',
    },
  ];

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
