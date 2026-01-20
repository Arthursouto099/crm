"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
import { Metrics } from "./chart-bar-default";
import { formatDayUTC } from "@/utils/date";

export const description = "An interactive line chart";

const chartConfig = {
  day: {
    label: "day",
  },
  departures: {
    label: "departures",
    color: "var(--chart-1)",
  },
  entries: {
    label: "entries",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function toDate(value: Date | string) {
  if (value instanceof Date) return value;

  // "YYYY-MM-DD" -> cria Date em horário LOCAL (evita shift de fuso)
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d);
  }

  // ISO completo com hora/Z -> ok usar Date normal
  return new Date(value);
}

export function ChartLineInteractive({ data }: { data: Metrics[] }) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("entries");

  const normalizedData = React.useMemo(() => {
    if (!Array.isArray(data)) return [];
    return data
      .map((m) => ({ ...m, day: toDate(m.day) }))
      .sort((a, b) => (a.day as Date).getTime() - (b.day as Date).getTime());
  }, [data]);

  const total = React.useMemo(
    () => ({
      entries: normalizedData.reduce((acc, curr) => acc + curr.entries, 0),
      departures: normalizedData.reduce(
        (acc, curr) => acc + curr.departures,
        0,
      ),
    }),
    [normalizedData],
  );

  return (
    <Card className="py-4 sm:py-0 border-none">
      <CardHeader className="flex flex-col items-stretch border-b   sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>ENTRADAS X SAÍDAS</CardTitle>
          <CardDescription>Movimentações dos últimos 30 dias</CardDescription>
        </div>

        <div className="flex">
          {(["departures", "entries"] as const).map((chart) => (
            <button
              key={chart}
              data-active={activeChart === chart}
              className="data-[active=true]:bg-muted/50 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6"
              onClick={() => setActiveChart(chart)}
            >
              <span className="text-muted-foreground text-xs">
                {chartConfig[chart].label === "entries" ? "ENTRADAS" : "SAÍDAS"}
              </span>
              <span className="text-lg leading-none font-bold sm:text-3xl">
                {total[chart].toLocaleString()}
              </span>
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={data}
            margin={{ left: 12, right: 12 }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => formatDayUTC(value)}
            />

            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  labelFormatter={(value) => formatDayUTC(value, true)}
                />
              }
            />

            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
