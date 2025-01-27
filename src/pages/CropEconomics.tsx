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

  console.log('Rendering CropEconomics for crop:', cropName);

  const getCropEconomics = (crop: string): CropEconomics => {
    const economics: Record<string, CropEconomics> = {
      'Corn': {
        cropName: 'Corn',
        setupCost: 42000,
        maintenanceCost: 22000,
        expectedYield: 6.5,
        marketPrice: 20000,
        timeToHarvest: 4,
        imageUrl: '/corn-field.jpg'
      },
      'Rice': {
        cropName: 'Rice',
        setupCost: 45000,
        maintenanceCost: 25000,
        expectedYield: 5.5,
        marketPrice: 22000,
        timeToHarvest: 4,
        imageUrl: '/rice-field.jpg'
      },
      'Wheat': {
        cropName: 'Wheat',
        setupCost: 35000,
        maintenanceCost: 18000,
        expectedYield: 4.2,
        marketPrice: 25000,
        timeToHarvest: 5,
        imageUrl: '/wheat-field.jpg'
      },
      'Cotton': {
        cropName: 'Cotton',
        setupCost: 55000,
        maintenanceCost: 28000,
        expectedYield: 2.8,
        marketPrice: 65000,
        timeToHarvest: 6,
        imageUrl: '/cotton-field.jpg'
      },
      'Soybeans': {
        cropName: 'Soybeans',
        setupCost: 38000,
        maintenanceCost: 20000,
        expectedYield: 3.8,
        marketPrice: 42000,
        timeToHarvest: 5,
        imageUrl: '/soybean-field.jpg'
      },
      'Vegetables': {
        cropName: 'Vegetables',
        setupCost: 52000,
        maintenanceCost: 30000,
        expectedYield: 8.2,
        marketPrice: 35000,
        timeToHarvest: 3,
        imageUrl: '/vegetable-field.jpg'
      },
      'Carrots': {
        cropName: 'Carrots',
        setupCost: 38000,
        maintenanceCost: 20000,
        expectedYield: 4.5,
        marketPrice: 26000,
        timeToHarvest: 3,
        imageUrl: '/carrot-field.jpg'
      },
      'Potatoes': {
        cropName: 'Potatoes',
        setupCost: 32000,
        maintenanceCost: 16000,
        expectedYield: 4.8,
        marketPrice: 18000,
        timeToHarvest: 4,
        imageUrl: '/potato-field.jpg'
      },
      'Peanuts': {
        cropName: 'Peanuts',
        setupCost: 36000,
        maintenanceCost: 19000,
        expectedYield: 2.5,
        marketPrice: 45000,
        timeToHarvest: 4,
        imageUrl: '/peanut-field.jpg'
      },
      'Cabbage': {
        cropName: 'Cabbage',
        setupCost: 40000,
        maintenanceCost: 20000,
        expectedYield: 4.0,
        marketPrice: 25000,
        timeToHarvest: 3,
        imageUrl: '/cabbage-field.jpg'
      },
      // Default case
      'Unknown Crop': {
        cropName: 'Unknown Crop',
        setupCost: 40000,
        maintenanceCost: 20000,
        expectedYield: 4.0,
        marketPrice: 25000,
        timeToHarvest: 5,
        imageUrl: '/placeholder-field.jpg'
      }
    };

    console.log('Getting economics for crop:', crop);
    const result = economics[crop] || economics['Unknown Crop'];
    console.log('Economics data:', result);
    return result;
  };

  const economics = getCropEconomics(cropName);
  const totalCost = economics.setupCost + economics.maintenanceCost;
  const expectedRevenue = economics.expectedYield * economics.marketPrice;
  const expectedProfit = expectedRevenue - totalCost;

  console.log('Calculated values:', {
    totalCost,
    expectedRevenue,
    expectedProfit
  });

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
              <p><span className="font-semibold">Market Price:</span> ₹{economics.marketPrice.toLocaleString()}/ton</p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold text-primary mb-4">Financial Analysis</h3>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-700">Costs</h4>
                <p>Setup Cost: ₹{economics.setupCost.toLocaleString()}</p>
                <p>Maintenance: ₹{economics.maintenanceCost.toLocaleString()}</p>
                <p className="font-semibold">Total Cost: ₹{totalCost.toLocaleString()}</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-700">Revenue</h4>
                <p>Expected Revenue: ₹{expectedRevenue.toLocaleString()}</p>
                <p className="font-semibold">Expected Profit: ₹{expectedProfit.toLocaleString()}</p>
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