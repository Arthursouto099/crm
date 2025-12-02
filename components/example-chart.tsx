"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"






const engagementData = [
    { customer: "Cliente A", emails: 12, calls: 3, meetings: 2 },
    { customer: "Cliente B", emails: 9, calls: 7, meetings: 1 },
    { customer: "Cliente C", emails: 6, calls: 4, meetings: 3 },
];

const chartConfig = {
    emails: {
        label: "Emails",
        color: "#3b82f6",    // azul
    },
    calls: {
        label: "Calls",
        color: "#10b981",    // verde
    },
    meetings: {
        label: "Meetings",
        color: "#facc15",    // amarelo
    }
} satisfies ChartConfig;

export function ComponentChartExemple() {
    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={engagementData}>
                <XAxis
                    dataKey="customer"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="emails" fill={chartConfig.emails.color} radius={4} />
                <Bar dataKey="calls" fill={chartConfig.calls.color} radius={4} />
                <Bar dataKey="meetings" fill={chartConfig.meetings.color} radius={4} />


                <CartesianGrid vertical={false} />
            </BarChart>
        </ChartContainer>
    )
}
