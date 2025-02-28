
import React from 'react';
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PredictionService } from '@/services/PredictionService';

interface MarketTrend {
  month: string;
  price: number;
}

const MarketTrends = ({ cropName }: { cropName: string }) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const prices = PredictionService.analyzeHistoricalPrices(cropName);
  
  const data: MarketTrend[] = prices.map((price, index) => ({
    month: monthNames[index % 12],
    price: price
  }));

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Market Price Trends for {cropName}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => `₹${value}`} />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#10b981" name="Market Price" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default MarketTrends;
