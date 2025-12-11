"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Project } from "@/api/types/project.types"
import React from "react"

export const description = "A bar chart"

interface ChartBarProps {
  data: Project[]
}

function useProjectsByStatus(projects: Project[]) {
  return React.useMemo(() => {
    const map = new Map<string, number>()

    projects.forEach((p) => {
      const status = p.status
      map.set(status, (map.get(status) || 0) + 1)
    })

    return Array.from(map.entries()).map(([status, total], index) => ({
      status,
      total,
      fill: `var(--chart-${(index % 5) + 1})`,
    }))
  }, [projects])
}

export function ChartBarDefault({ data }: ChartBarProps) {
  const chartData = useProjectsByStatus(data)

  const chartConfig: ChartConfig = React.useMemo(() => {
    const cfg: ChartConfig = {}

    chartData.forEach((item) => {
      cfg[item.status] = {
        label: item.status,
        color: item.fill,
      }
    })

    return cfg
  }, [chartData])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Projetos por Status</CardTitle>
        <CardDescription>Distribuição dos projetos</CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />

            {/* Corrigido: o eixo deve mostrar o status */}
            <XAxis
              dataKey="status"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            {/* Corrigido: agora usa "total" */}
            <Bar dataKey="total" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total projects by status
        </div>
      </CardFooter>
    </Card>
  )
}
