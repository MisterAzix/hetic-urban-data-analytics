'use client';

import { DatabaseZapIcon } from 'lucide-react';
import { LabelList, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
    <Card>
      <CardHeader>
        <CardTitle>Par groupes d&apos;âge</CardTitle>
        <CardDescription>
          Les crimes commis par catégorie d&apos;âge
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-64 [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent nameKey="crimes" hideLabel={true} />
              }
              isAnimationActive={false}
            />
            <Pie data={chartData} dataKey="crimes">
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
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-1 font-medium leading-none">
          <DatabaseZapIcon className="h-4 w-4" />
          Données récupérées sur NYC Open Data
        </div>
        <div className="leading-none text-muted-foreground">
          Sur les 1000 derniers crimes référencés
        </div>
      </CardFooter>
    </Card>
  );
}
