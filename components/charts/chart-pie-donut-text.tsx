"use client";

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { PieChart, Pie, Label } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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

import { Project } from "@/api/types/project.types";

interface ChartDonutProps {
  data: Project[];
}

// ---------------------------------------------
// 1) Converte Project[] -> dados agrupados por categoria
// ---------------------------------------------
function useProjectsByCategory(projects: Project[]) {
  return React.useMemo(() => {
    const map = new Map<string, number>();

    projects.forEach((p) => {
      const cat = p.category || "Sem categoria";
      map.set(cat, (map.get(cat) || 0) + 1);
    });

    // Converte para array compatível com PieChart
    return Array.from(map.entries()).map(([category, total], index) => ({
      category,
      total,
      fill: `var(--chart-${(index % 5) + 1})`, // cor automática
    }));
  }, [projects]);
}

// ---------------------------------------------
// 2) Componente
// ---------------------------------------------
export function ChartPieDonutText({ data }: ChartDonutProps) {
  // Agrupado por categoria
  const chartData = useProjectsByCategory(data);

  // Total geral de projetos
  const totalProjects = chartData.reduce((acc, item) => acc + item.total, 0);

  // Criação dinâmica do config do gráfico
  const chartConfig: ChartConfig = React.useMemo(() => {
    const cfg: ChartConfig = {};

    chartData.forEach((item, i) => {
      cfg[item.category] = {
        label: item.category.toUpperCase(),
        color: item.fill,
      };
    });

    return cfg;
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Projetos por Categoria</CardTitle>
        <CardDescription>Distribuição total de projetos</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Pie
              data={chartData}
              dataKey="total"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }: any) => {
                  if (!viewBox) return null;

                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalProjects.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy + 24}
                        className="fill-muted-foreground"
                      >
                        Projects
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Total acumulado: {totalProjects} projetos{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Distribuição baseada em categorias dos projetos
        </div>
      </CardFooter>
    </Card>
  );
}
