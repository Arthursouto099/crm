"use client";

import { Bar, BarChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export type Metrics = {
  day: Date; // "2026-01-16" (recomendado)
  departures: number;
  entries: number;
};

const chartConfig = {
  departures: {
    label: "Saídas",
    color: "var(--chart-1)",
  },
  entries: {
    label: "Entradas",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;


export function ChartTooltipDefault({ data }: { data: Metrics[] }) {
  return (
    <Card className="p-2 border-none">
      <CardHeader>
        <CardTitle></CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={Array.isArray(data) ? data : []}>
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              }
            />

            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />

            <Bar
              dataKey="departures"
              stackId="a"
              fill="var(--color-departures)"
              radius={[0, 0, 6, 6]}
            />
            <Bar
              dataKey="entries"
              stackId="a"
              fill="var(--color-entries)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
