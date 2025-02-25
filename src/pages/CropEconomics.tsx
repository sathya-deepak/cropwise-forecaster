
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from 'lucide-react';
import ProfitChart from '@/components/dashboard/ProfitChart';
import MarketTrends from '@/components/dashboard/MarketTrends';
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/utils/translations";

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
  const { cropName, location: cropLocation, weatherData } = location.state || {};
  
  const { language } = useLanguage();
  const t = getTranslation(language);

  useEffect(() => {
    if (!cropName) {
      console.log('No crop name found in state, redirecting to prediction page');
      navigate('/predict');
    }
  }, [cropName, navigate]);

  const getCropEconomics = (crop: string): CropEconomics => {
    if (!crop) {
      return {
        cropName: 'Unknown Crop',
        setupCost: 0,
        maintenanceCost: 0,
        expectedYield: 0,
        marketPrice: 0,
        timeToHarvest: 0,
        imageUrl: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&auto=format&fit=crop'
      };
    }

    // Default values for demonstration
    return {
      cropName: crop,
      setupCost: 42000,
      maintenanceCost: 22000,
      expectedYield: 6.5,
      marketPrice: 20000,
      timeToHarvest: 4,
      imageUrl: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&auto=format&fit=crop'
    };
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
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> {t.backToPrediction}
      </Button>

      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8">Business Analysis Dashboard</h1>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
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
            <h2 className="text-2xl font-semibold text-primary mb-4">Venture Overview</h2>
            <div className="space-y-2">
              <p><span className="font-semibold">Product:</span> {economics.cropName}</p>
              <p><span className="font-semibold">Time to Market:</span> {economics.timeToHarvest} months</p>
              <p><span className="font-semibold">Production Capacity:</span> {economics.expectedYield} tons/acre</p>
              <p><span className="font-semibold">Market Price:</span> ₹{economics.marketPrice.toLocaleString()}/ton</p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-semibold text-primary mb-4">Financial Overview</h3>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="font-semibold text-red-700">Investment Required</h4>
                <p>Initial Setup: ₹{economics.setupCost.toLocaleString()}</p>
                <p>Operating Costs: ₹{economics.maintenanceCost.toLocaleString()}</p>
                <p className="font-semibold">Total Investment: ₹{totalCost.toLocaleString()}</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-700">Projected Returns</h4>
                <p>Expected Revenue: ₹{expectedRevenue.toLocaleString()}</p>
                <p className="font-semibold">Projected Profit: ₹{expectedProfit.toLocaleString()}</p>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-700">Key Metrics</h4>
                <p>ROI: {((expectedProfit / totalCost) * 100).toFixed(2)}%</p>
                <p>Break-even Timeline: {(totalCost / (expectedRevenue / economics.timeToHarvest)).toFixed(1)} months</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <ProfitChart />
          <MarketTrends cropName={economics.cropName} />
        </div>
      </div>
    </div>
  );
};

export default CropEconomics;
