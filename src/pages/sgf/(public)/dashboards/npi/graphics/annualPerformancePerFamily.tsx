import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type {
  DistinctFamiliesData,
  YearCount,
} from "@/interface/dashboard/npi";

interface ChartLineLabelProps {
  monthlyCount: YearCount;
  distinctFamilies: DistinctFamiliesData;
}

const defaultColors = [
  "#0065F8",
  "#4300FF",
  "#00FFDE",
  "#FCECDD",
  "#FF7601",
  "#EAEFEF",
  "#A0C878",
  "#161179",
];

export function ChartLineLabel({
  monthlyCount,
  distinctFamilies,
}: Readonly<ChartLineLabelProps>) {
  interface ChartConfigItem {
    label: string;
    color: string;
  }

  type ChartConfigMap = Record<string, ChartConfigItem>;

  const chartConfig: ChartConfigMap = distinctFamilies.reduce<ChartConfigMap>(
    (
      acc: ChartConfigMap,
      item: DistinctFamiliesData[number],
      index: number,
    ) => {
      const key: string = item.family.toUpperCase();
      acc[key] = {
        label: item.family,
        color: defaultColors[index % defaultColors.length],
      };
      return acc;
    },
    {} as ChartConfigMap,
  );

  return (
    <Card>
      <CardHeader className="flex items-center">
        <CardTitle>Desempenho por Família</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={monthlyCount}
            margin={{
              top: 25,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={true}
              axisLine={true}
              tickMargin={15}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="line" />}
            />
            {Object.entries(chartConfig).map(([key, { color }]) => (
              <Line
                key={key}
                dataKey={key}
                type="bump"
                stroke={color}
                strokeWidth={2}
                dot={{ fill: color }}
                activeDot={{ r: 6 }}
              >
                <LabelList
                  dataKey={key}
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
