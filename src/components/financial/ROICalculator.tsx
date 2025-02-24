
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator } from 'lucide-react';

const ROICalculator = () => {
  const [landSize, setLandSize] = useState<string>('');
  const [initialCost, setInitialCost] = useState<string>('');
  const [expectedYield, setExpectedYield] = useState<string>('');
  const [marketPrice, setMarketPrice] = useState<string>('');
  const [roi, setRoi] = useState<number | null>(null);

  const calculateROI = () => {
    const size = parseFloat(landSize);
    const cost = parseFloat(initialCost);
    const yield_amount = parseFloat(expectedYield);
    const price = parseFloat(marketPrice);

    if (size && cost && yield_amount && price) {
      const totalRevenue = size * yield_amount * price;
      const totalCost = cost;
      const profit = totalRevenue - totalCost;
      const roiValue = (profit / totalCost) * 100;
      setRoi(Math.round(roiValue * 100) / 100);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-primary">ROI Calculator</h2>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="landSize">Land Size (Acres)</Label>
          <Input
            id="landSize"
            type="number"
            value={landSize}
            onChange={(e) => setLandSize(e.target.value)}
            placeholder="Enter land size"
          />
        </div>

        <div>
          <Label htmlFor="initialCost">Initial Investment (₹)</Label>
          <Input
            id="initialCost"
            type="number"
            value={initialCost}
            onChange={(e) => setInitialCost(e.target.value)}
            placeholder="Enter initial cost"
          />
        </div>

        <div>
          <Label htmlFor="expectedYield">Expected Yield (tons/acre)</Label>
          <Input
            id="expectedYield"
            type="number"
            value={expectedYield}
            onChange={(e) => setExpectedYield(e.target.value)}
            placeholder="Enter expected yield"
          />
        </div>

        <div>
          <Label htmlFor="marketPrice">Market Price (₹/ton)</Label>
          <Input
            id="marketPrice"
            type="number"
            value={marketPrice}
            onChange={(e) => setMarketPrice(e.target.value)}
            placeholder="Enter market price"
          />
        </div>

        <Button onClick={calculateROI} className="w-full">
          Calculate ROI
        </Button>

        {roi !== null && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-lg">Expected ROI:</h3>
            <p className="text-2xl font-bold text-primary">{roi}%</p>
            <p className="text-sm text-gray-600 mt-2">
              This is an estimated return on investment based on your inputs.
              Actual results may vary depending on various factors.
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ROICalculator;
