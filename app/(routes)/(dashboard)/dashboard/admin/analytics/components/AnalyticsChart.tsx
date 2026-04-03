"use client"

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"

interface AnalyticsChartProps {
  data: {
    date: string
    amount: number
  }[]
}

export function AnalyticsChart({ data }: AnalyticsChartProps) {
  // Group data by date to sum amounts for the same day
  const chartData = data.reduce((acc: any[], current) => {
    const existing = acc.find((item) => item.date === current.date)
    if (existing) {
      existing.amount += current.amount
    } else {
      acc.push({ ...current })
    }
    return acc
  }, [])

  return (
    <div className="w-full h-full min-h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" opacity={0.05} />
            <XAxis
                dataKey="date"
                stroke="#888888"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                dy={10}
            />
            <YAxis
                stroke="#888888"
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}€`}
            />
            <Tooltip
                contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    color: 'hsl(var(--foreground))',
                    border: '1px solid hsl(var(--border))'
                }}
                itemStyle={{ color: 'hsl(var(--primary))', fontWeight: 'bold' }}
                cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Area
                type="monotone"
                dataKey="amount"
                stroke="hsl(var(--primary))"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorAmount)"
                animationDuration={1500}
                activeDot={{ r: 6, strokeWidth: 0, fill: 'hsl(var(--primary))' }}
            />
        </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}
