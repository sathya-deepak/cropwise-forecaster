
import React from 'react';
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ProfitData {
  month: string;
  profit: number;
  revenue: number;
  costs: number;
}

const ProfitChart = () => {
  const data: ProfitData[] = [
    { month: 'Jan', profit: 15000, revenue: 45000, costs: 30000 },
    { month: 'Feb', profit: 18000, revenue: 48000, costs: 30000 },
    { month: 'Mar', profit: 22000, revenue: 52000, costs: 30000 },
    { month: 'Apr', profit: 25000, revenue: 55000, costs: 30000 },
    { month: 'May', profit: 28000, revenue: 58000, costs: 30000 },
    { month: 'Jun', profit: 32000, revenue: 62000, costs: 30000 },
  ];

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Profit Analysis</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="profit" stroke="#10b981" name="Profit" />
            <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Revenue" />
            <Line type="monotone" dataKey="costs" stroke="#ef4444" name="Costs" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ProfitChart;
