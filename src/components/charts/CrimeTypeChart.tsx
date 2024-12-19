'use client';

import { DatabaseZapIcon } from 'lucide-react';
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

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

export default function CrimeTypeChart({
  data,
}: {
  data: { [key: string]: number };
}) {
  const chartData = [
    {
      type: 'Conduite dangereuse',
      crimes: data.RECKLESS_DRIVING,
    },
    {
      type: 'Alcool espace public',
      crimes: data.ALCOHOLIC_BEVERAGE_IN_PUBLIC,
    },
    {
      type: 'Intrusion propriété privé',
      crimes: data.TRESPASS,
    },
    {
      type: 'Code de la route',
      crimes: data.FEDERAL_MOTOR_VEH__SAFETY_REG,
    },
    {
      type: 'Alcool en conduite',
      crimes: data.CONSUMPTION_OF_ALCOHOL_IN_VEHICLE,
    },
    {
      type: 'Permis révoqué',
      crimes:
        data.OPERATION_WHILE_REGISTRATION_OR_PRIVILEGE_IS_SUSPENDED_OR_REVOKED,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Types de crimes</CardTitle>
        <CardDescription>Les 6 types de crimes les plus commis</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer config={chartConfig} className="max-h-64 w-full">
          <RadarChart data={chartData}>
            <ChartTooltip
              content={<ChartTooltipContent hideLabel={true} />}
              isAnimationActive={false}
            />
            <PolarAngleAxis dataKey="type" />
            <PolarGrid />
            <Radar
              dataKey="crimes"
              fill="var(--color-crimes)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
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
