import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { PerformanceData } from "@/interface/dashboard/npi";

const chartConfig = {
  total: {
    label: "Total",
    color: "#5CB338",
  },
  concluido: {
    label: "Concluído",
    color: "#0065F8",
  },
};

interface NpiPerformanceAnalysisProps {
  performance: PerformanceData[];
}

export function NpiPerformanceAnalysis({
  performance,
}: Readonly<NpiPerformanceAnalysisProps>) {
  return (
    <Card>
      <CardHeader className="flex items-center">
        <CardTitle>Análise de desempenho de NPI</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={performance}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="total" fill="var(--color-total)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar dataKey="concluido" fill="var(--color-concluido)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
