'use client';

import { DatabaseZapIcon } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

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
    <Card>
      <CardHeader>
        <CardTitle>Fréquence des crimes</CardTitle>
        <CardDescription>
          La fréquence des crimes commis chaque mois
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <AreaChart
            accessibilityLayer={true}
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
              cursor={false}
              content={
                <ChartTooltipContent hideLabel={true} indicator="line" />
              }
              isAnimationActive={false}
            />
            <Area
              dataKey="crimes"
              type="natural"
              fill="var(--color-crimes)"
              fillOpacity={0.4}
              stroke="var(--color-crimes)"
            />
          </AreaChart>
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
