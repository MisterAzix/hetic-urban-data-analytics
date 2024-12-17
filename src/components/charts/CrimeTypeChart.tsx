import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { type: 'Homicide', crimes: 1250 },
  { type: 'Vol', crimes: 3000 },
  { type: 'Fraude', crimes: 2000 },
  { type: 'Agression', crimes: 1500 },
  { type: 'Cybercriminalité', crimes: 1000 },
  { type: 'Trafic de drogue', crimes: 2000 },
];

const chartConfig = {
  crimes: {
    label: 'Crimes',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function CrimeTypeChart() {
  return (
    <ChartContainer config={chartConfig} className="mx-auto max-h-64">
      <RadarChart data={chartData}>
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
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
  );
}
