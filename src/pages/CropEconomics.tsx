import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from 'lucide-react';

interface CropEconomics {
  cropName: string;
  setupCost: number;
  maintenanceCost: number;
  expectedYield: number;
  marketPrice: number;
  timeToHarvest: number;
  imageUrl: string;
}

const CropEconomics = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cropName } = location.state || { cropName: 'Unknown Crop' };

  const getCropEconomics = (crop: string): CropEconomics => {
    const economics: Record<string, CropEconomics> = {
      'Rice': {
        cropName: 'Rice',
        setupCost: 25000,
        maintenanceCost: 15000,
        expectedYield: 4.5,
        marketPrice: 20000,
        timeToHarvest: 4,
        imageUrl: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23'
      },
      'Wheat': {
        cropName: 'Wheat',
        setupCost: 20000,
        maintenanceCost: 12000,
        expectedYield: 3.8,
        marketPrice: 22000,
        timeToHarvest: 5,
        imageUrl: 'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac'
      },
      'Cotton': {
        cropName: 'Cotton',
        setupCost: 35000,
        maintenanceCost: 18000,
        expectedYield: 2.5,
        marketPrice: 45000,
        timeToHarvest: 6,
        imageUrl: 'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2'
      },
      // Default case
      'Unknown Crop': {
        cropName: 'Unknown Crop',
        setupCost: 0,
        maintenanceCost: 0,
        expectedYield: 0,
        marketPrice: 0,
        timeToHarvest: 0,
        imageUrl: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a'
      }
    };

    return economics[crop] || economics['Unknown Crop'];
  };

  const economics = getCropEconomics(cropName);
  const totalCost = economics.setupCost + economics.maintenanceCost;
  const expectedRevenue = economics.expectedYield * economics.marketPrice;
  const expectedProfit = expectedRevenue - totalCost;

  return (
    <div className="min-h-screen bg-cream p-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/predict')}
        className="mb-6 text-primary hover:text-primary-dark"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Prediction
      </Button>

      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Crop Economics Analysis</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <img 
              src={economics.imageUrl} 
              alt={economics.cropName}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-semibold text-primary mb-4">{economics.cropName}</h2>
            <div className="space-y-2">
              <p><span className="font-semibold">Time to Harvest:</span> {economics.timeToHarvest} months</p>
              <p><span className="font-semibold">Expected Yield:</span> {economics.expectedYield} tons/acre</p>
              <p><span className="font-semibold">Market Price:</span> ₹{economics.marketPrice}/ton</p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold text-primary mb-4">Financial Analysis</h3>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-700">Costs</h4>
                <p>Setup Cost: ₹{economics.setupCost}</p>
                <p>Maintenance: ₹{economics.maintenanceCost}</p>
                <p className="font-semibold">Total Cost: ₹{totalCost}</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-700">Revenue</h4>
                <p>Expected Revenue: ₹{expectedRevenue}</p>
                <p className="font-semibold">Expected Profit: ₹{expectedProfit}</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-700">ROI Analysis</h4>
                <p>ROI: {((expectedProfit / totalCost) * 100).toFixed(2)}%</p>
                <p>Break-even Point: {(totalCost / (expectedRevenue / economics.timeToHarvest)).toFixed(1)} months</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CropEconomics;