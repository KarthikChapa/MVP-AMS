"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "Year 1",
    current: 80,
    bowlingCoach: 30,
    analyst: 25,
    commentator: 35,
  },
  {
    name: "Year 2",
    current: 75,
    bowlingCoach: 45,
    analyst: 40,
    commentator: 50,
  },
  {
    name: "Year 3",
    current: 65,
    bowlingCoach: 60,
    analyst: 55,
    commentator: 65,
  },
  {
    name: "Year 4",
    current: 50,
    bowlingCoach: 75,
    analyst: 70,
    commentator: 75,
  },
  {
    name: "Year 5",
    current: 30,
    bowlingCoach: 85,
    analyst: 80,
    commentator: 80,
  },
  {
    name: "Year 6",
    current: 15,
    bowlingCoach: 90,
    analyst: 85,
    commentator: 85,
  },
  {
    name: "Year 7",
    current: 10,
    bowlingCoach: 95,
    analyst: 90,
    commentator: 90,
  },
  {
    name: "Year 8",
    current: 5,
    bowlingCoach: 100,
    analyst: 95,
    commentator: 95,
  },
  {
    name: "Year 9",
    current: 0,
    bowlingCoach: 105,
    analyst: 100,
    commentator: 100,
  },
  {
    name: "Year 10",
    current: 0,
    bowlingCoach: 110,
    analyst: 105,
    commentator: 105,
  },
]

export function FinancialProjection() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={{ value: "Income (₹ Lakhs)", angle: -90, position: "insideLeft" }} />
        <Tooltip formatter={(value) => [`₹${value} Lakhs`, ""]} />
        <Legend />
        <Bar dataKey="current" name="Current Career" fill="#ef4444" />
        <Bar dataKey="bowlingCoach" name="Bowling Coach" fill="#3b82f6" />
        <Bar dataKey="analyst" name="Sports Analyst" fill="#10b981" />
        <Bar dataKey="commentator" name="Commentator" fill="#8b5cf6" />
      </BarChart>
    </ResponsiveContainer>
  )
}

