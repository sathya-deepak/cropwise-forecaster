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
        imageUrl: '/lovable-uploads/e30bdd3b-18f2-4e54-a71b-84481515c8d0.png'
      },
      'rice': {
        cropName: 'Rice',
        setupCost: 45000,
        maintenanceCost: 25000,
        expectedYield: 5.5,
        marketPrice: 22000,
        timeToHarvest: 4,
        imageUrl: '/lovable-uploads/2a34d800-9767-4290-aa48-5b8bc3db4f0d.png'
      },
      'wheat': {
        cropName: 'Wheat',
        setupCost: 35000,
        maintenanceCost: 18000,
        expectedYield: 4.2,
        marketPrice: 25000,
        timeToHarvest: 5,
        imageUrl: '/lovable-uploads/e81826e4-6d9b-400d-9eae-1d19496a7c76.png'
      },
      'cotton': {
        cropName: 'Cotton',
        setupCost: 55000,
        maintenanceCost: 28000,
        expectedYield: 2.8,
        marketPrice: 65000,
        timeToHarvest: 6,
        imageUrl: '/lovable-uploads/964b9808-96a7-42d1-8d5c-74dd5ad52493.png'
      },
      'groundnut': {
        cropName: 'Groundnut',
        setupCost: 36000,
        maintenanceCost: 19000,
        expectedYield: 2.5,
        marketPrice: 45000,
        timeToHarvest: 4,
        imageUrl: '/lovable-uploads/747624ef-1f0b-413f-a5b3-73d36fb48a54.png'
      },
      'peanuts': {
        cropName: 'Groundnut',
        setupCost: 36000,
        maintenanceCost: 19000,
        expectedYield: 2.5,
        marketPrice: 45000,
        timeToHarvest: 4,
        imageUrl: '/lovable-uploads/747624ef-1f0b-413f-a5b3-73d36fb48a54.png'
      },
      'sugarcane': {
        cropName: 'Sugarcane',
        setupCost: 60000,
        maintenanceCost: 32000,
        expectedYield: 70.0,
        marketPrice: 3500,
        timeToHarvest: 12,
        imageUrl: '/lovable-uploads/649a61a7-c80c-40b5-9533-bc80cee3a849.png'
      },
      'maize': {
        cropName: 'Maize',
        setupCost: 42000,
        maintenanceCost: 22000,
        expectedYield: 6.5,
        marketPrice: 20000,
        timeToHarvest: 4,
        imageUrl: '/lovable-uploads/be063965-1907-4695-b603-b0c288cb3724.png'
      },
      'winter wheat': {
        cropName: 'Winter Wheat',
        setupCost: 35000,
        maintenanceCost: 18000,
        expectedYield: 4.2,
        marketPrice: 25000,
        timeToHarvest: 5,
        imageUrl: '/lovable-uploads/e81826e4-6d9b-400d-9eae-1d19496a7c76.png'
      },
      'soybean': {
        cropName: 'Soybean',
        setupCost: 38000,
        maintenanceCost: 20000,
        expectedYield: 3.5,
        marketPrice: 38000,
        timeToHarvest: 4,
        imageUrl: '/lovable-uploads/f5332841-622c-4aed-99ee-365aa4c667d2.png'
      },
      'mustard': {
        cropName: 'Mustard',
        setupCost: 32000,
        maintenanceCost: 16000,
        expectedYield: 2.0,
        marketPrice: 42000,
        timeToHarvest: 4,
        imageUrl: '/lovable-uploads/mustard-crop.png'
      },
      'barley': {
        cropName: 'Barley',
        setupCost: 30000,
        maintenanceCost: 15000,
        expectedYield: 3.8,
        marketPrice: 28000,
        timeToHarvest: 4,
        imageUrl: '/lovable-uploads/bc7b7d0f-eafa-47fc-872a-fc1d8800a092.png'
      },
      'vegetables': {
        cropName: 'Vegetables',
        setupCost: 52000,
        maintenanceCost: 30000,
        expectedYield: 8.2,
        marketPrice: 35000,
        timeToHarvest: 3,
        imageUrl: '/lovable-uploads/vegetables-crop.png'
      },
      'unknown crop': {
        cropName: 'Vegetables (Recommended)',
        setupCost: 52000,
        maintenanceCost: 30000,
        expectedYield: 8.2,
        marketPrice: 35000,
        timeToHarvest: 3,
        imageUrl: '/lovable-uploads/vegetables-crop.png'
      }
    };

    console.log('Looking up economics for crop:', normalizedCrop);
    let result = economics[normalizedCrop];
    
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
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80';
              }}
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
