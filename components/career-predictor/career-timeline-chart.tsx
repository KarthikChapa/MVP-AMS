"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts"

const data = [
  { age: 22, performance: 65, potential: 85 },
  { age: 24, performance: 75, potential: 88 },
  { age: 26, performance: 85, potential: 90 },
  { age: 28, performance: 92, potential: 92 },
  { age: 29, performance: 90, potential: 91, current: true },
  { age: 30, performance: 87, potential: 89 },
  { age: 31, performance: 82, potential: 86 },
  { age: 32, performance: 75, potential: 82, retirement: true },
  { age: 33, performance: 68, potential: 78 },
  { age: 34, performance: 60, potential: 72 },
  { age: 35, performance: 52, potential: 65 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const dataPoint = data.find((d) => d.age === label)
    return (
      <div className="bg-white p-3 border rounded shadow-sm">
        <p className="font-medium">{`Age: ${label}`}</p>
        <p className="text-blue-600">{`Performance: ${payload[0].value}`}</p>
        <p className="text-gray-500">{`Potential: ${payload[1].value}`}</p>
        {dataPoint?.current && <p className="text-green-600 font-medium">Current Age</p>}
        {dataPoint?.retirement && <p className="text-orange-600 font-medium">Optimal Retirement Age</p>}
      </div>
    )
  }

  return null
}

export function CareerTimelineChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="age" label={{ value: "Age", position: "insideBottomRight", offset: -5 }} />
        <YAxis label={{ value: "Performance Index", angle: -90, position: "insideLeft" }} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <ReferenceLine x={29} stroke="#22c55e" strokeDasharray="3 3" label={{ value: "Current", position: "top" }} />
        <ReferenceLine x={32} stroke="#f97316" strokeDasharray="3 3" label={{ value: "Retirement", position: "top" }} />
        <Line type="monotone" dataKey="performance" stroke="#3b82f6" strokeWidth={2} name="Performance" />
        <Line type="monotone" dataKey="potential" stroke="#9ca3af" strokeDasharray="5 5" name="Potential" />
      </LineChart>
    </ResponsiveContainer>
  )
}

