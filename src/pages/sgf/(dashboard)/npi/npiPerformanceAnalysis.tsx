"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
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
    color: "#FF3F33",
  },
} satisfies ChartConfig;

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
          <BarChart data={performance}>
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
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="total" fill="var(--color-total)" radius={4} />
            <Bar dataKey="concluido" fill="var(--color-concluido)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
