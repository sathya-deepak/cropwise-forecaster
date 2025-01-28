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
    // Normalize crop name to handle variations
    const normalizedCrop = crop.toLowerCase().trim();
    console.log('Normalized crop name:', normalizedCrop);

    const economics: Record<string, CropEconomics> = {
      'corn': {
        cropName: 'Corn',
        setupCost: 42000,
        maintenanceCost: 22000,
        expectedYield: 6.5,
        marketPrice: 20000,
        timeToHarvest: 4,
        imageUrl: 'https://images.unsplash.com/photo-1471194402529-8e0f5a675de6'
      },
      'rice': {
        cropName: 'Rice',
        setupCost: 45000,
        maintenanceCost: 25000,
        expectedYield: 5.5,
        marketPrice: 22000,
        timeToHarvest: 4,
        imageUrl: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23'
      },
      'wheat': {
        cropName: 'Wheat',
        setupCost: 35000,
        maintenanceCost: 18000,
        expectedYield: 4.2,
        marketPrice: 25000,
        timeToHarvest: 5,
        imageUrl: 'https://images.unsplash.com/photo-1465379944081-7f47de8d74ac'
      },
      'cotton': {
        cropName: 'Cotton',
        setupCost: 55000,
        maintenanceCost: 28000,
        expectedYield: 2.8,
        marketPrice: 65000,
        timeToHarvest: 6,
        imageUrl: 'https://images.unsplash.com/photo-1452378174528-3090a4bba7b2'
      },
      'soybeans': {
        cropName: 'Soybeans',
        setupCost: 38000,
        maintenanceCost: 20000,
        expectedYield: 3.8,
        marketPrice: 42000,
        timeToHarvest: 5,
        imageUrl: 'https://images.unsplash.com/photo-1601459427108-47e20d579a35'
      },
      'vegetables': {
        cropName: 'Vegetables',
        setupCost: 52000,
        maintenanceCost: 30000,
        expectedYield: 8.2,
        marketPrice: 35000,
        timeToHarvest: 3,
        imageUrl: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c'
      },
      'carrots': {
        cropName: 'Carrots',
        setupCost: 38000,
        maintenanceCost: 20000,
        expectedYield: 4.5,
        marketPrice: 26000,
        timeToHarvest: 3,
        imageUrl: 'https://images.unsplash.com/photo-1447175008436-054170c2e979'
      },
      'potatoes': {
        cropName: 'Potatoes',
        setupCost: 32000,
        maintenanceCost: 16000,
        expectedYield: 4.8,
        marketPrice: 18000,
        timeToHarvest: 4,
        imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655'
      },
      'peanuts': {
        cropName: 'Peanuts',
        setupCost: 36000,
        maintenanceCost: 19000,
        expectedYield: 2.5,
        marketPrice: 45000,
        timeToHarvest: 4,
        imageUrl: 'https://images.unsplash.com/photo-1567529692333-de9fd6772897'
      },
      'cabbage': {
        cropName: 'Cabbage',
        setupCost: 40000,
        maintenanceCost: 20000,
        expectedYield: 4.0,
        marketPrice: 25000,
        timeToHarvest: 3,
        imageUrl: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f'
      },
      // Additional crops to reduce "Unknown Crop" results
      'tomatoes': {
        cropName: 'Tomatoes',
        setupCost: 45000,
        maintenanceCost: 23000,
        expectedYield: 5.0,
        marketPrice: 30000,
        timeToHarvest: 3,
        imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa'
      },
      'onions': {
        cropName: 'Onions',
        setupCost: 35000,
        maintenanceCost: 18000,
        expectedYield: 4.2,
        marketPrice: 28000,
        timeToHarvest: 4,
        imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb'
      },
      'sugarcane': {
        cropName: 'Sugarcane',
        setupCost: 60000,
        maintenanceCost: 32000,
        expectedYield: 70.0,
        marketPrice: 3500,
        timeToHarvest: 12,
        imageUrl: 'https://images.unsplash.com/photo-1596813362035-3edcff0c2487'
      },
      // Default case with similar crop suggestion
      'unknown crop': {
        cropName: 'Vegetables (Recommended)',
        setupCost: 52000,
        maintenanceCost: 30000,
        expectedYield: 8.2,
        marketPrice: 35000,
        timeToHarvest: 3,
        imageUrl: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c'
      }
    };

    console.log('Looking up economics for crop:', normalizedCrop);
    // Try to find exact match first
    let result = economics[normalizedCrop];
    
    // If no exact match, try to find similar crop
    if (!result) {
      console.log('No exact match found, looking for similar crops');
      const similarCrop = Object.keys(economics).find(key => 
        key.includes(normalizedCrop) || normalizedCrop.includes(key)
      );
      result = similarCrop ? economics[similarCrop] : economics['unknown crop'];
      console.log('Similar crop found:', similarCrop || 'none, using default');
    }

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