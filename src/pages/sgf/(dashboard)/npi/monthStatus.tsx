import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  Concluído: {
    label: "Concluído",
    color: "#5CB338",
  },
  Atrasado: {
    label: "Atrasado",
    color: "#FF3F33",
  },
  "Em Processo": {
    label: "Em Processo",
    color: "#F6DC43",
  },
} satisfies ChartConfig;

export function ChartBarLabel({ npi }) {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Status do mês</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={npi}
            margin={{
              top: 25,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="Concluído" fill="#5CB338" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar dataKey="Atrasado" fill="#FF3F33" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar dataKey="Em Processo" fill="#F6DC43" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
        {/* <CardFooter className="flex flex-col items-start gap-1">
          <h4 className="text-xs">Status</h4>
          <div className="flex flex-wrap gap-3">
            {Object.entries(chartConfig).map(([key, { label, color }]) => (
              <div key={key} className="flex items-center gap-2 text-xs">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: color }}
                />
                {label}
              </div>
            ))}
          </div>
        </CardFooter> */}
      </CardContent>
    </Card>
  );
}
