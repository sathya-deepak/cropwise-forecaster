import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from 'lucide-react';
import ProfitChart from '@/components/dashboard/ProfitChart';
import MarketTrends from '@/components/dashboard/MarketTrends';
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/utils/translations";
import { useToast } from "@/components/ui/use-toast";

interface LocationState {
  cropName: string;
  location: string;
  weatherData: any;
}

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
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = getTranslation(language);
  const [cropData, setCropData] = useState<LocationState | null>(null);

  useEffect(() => {
    const state = location.state as LocationState;
    console.log('Received state:', state);

    if (!state || !state.cropName) {
      console.log('No crop data found, redirecting...');
      toast({
        title: "Error",
        description: "No crop data found. Redirecting to prediction page.",
        variant: "destructive"
      });
      navigate('/predict');
      return;
    }

    setCropData(state);
  }, [location.state, navigate]);

  const getCropEconomics = (crop: string): CropEconomics => {
    console.log('Getting economics for crop:', crop);

    // Define crop-specific data with high-quality, specific images
    const cropData: Record<string, CropEconomics> = {
      'groundnut': {
        cropName: 'Groundnut',
        setupCost: 35000,
        maintenanceCost: 20000,
        expectedYield: 2.5,
        marketPrice: 45000,
        timeToHarvest: 4,
        imageUrl: 'https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=800&auto=format&fit=crop'
      },
      'rice': {
        cropName: 'Rice',
        setupCost: 42000,
        maintenanceCost: 22000,
        expectedYield: 6.5,
        marketPrice: 20000,
        timeToHarvest: 4,
        imageUrl: 'https://images.unsplash.com/photo-1568611067437-1c941bb6d6f0?w=800&auto=format&fit=crop'
      },
      'wheat': {
        cropName: 'Wheat',
        setupCost: 38000,
        maintenanceCost: 18000,
        expectedYield: 5.8,
        marketPrice: 22000,
        timeToHarvest: 5,
        imageUrl: 'https://images.unsplash.com/photo-1631651364812-6ca22e36287e?w=800&auto=format&fit=crop'
      },
      'cotton': {
        cropName: 'Cotton',
        setupCost: 45000,
        maintenanceCost: 25000,
        expectedYield: 4.2,
        marketPrice: 65000,
        timeToHarvest: 6,
        imageUrl: 'https://images.unsplash.com/photo-1599666433232-2b222eb02b8c?w=800&auto=format&fit=crop'
      },
      'maize': {
        cropName: 'Maize',
        setupCost: 36000,
        maintenanceCost: 19000,
        expectedYield: 7.2,
        marketPrice: 18000,
        timeToHarvest: 4,
        imageUrl: 'https://images.unsplash.com/photo-1628678973457-2f2d9ba106c0?w=800&auto=format&fit=crop'
      },
      'sugarcane': {
        cropName: 'Sugarcane',
        setupCost: 50000,
        maintenanceCost: 30000,
        expectedYield: 80.0,
        marketPrice: 3000,
        timeToHarvest: 12,
        imageUrl: 'https://images.unsplash.com/photo-1612258140767-aa535c35c272?w=800&auto=format&fit=crop'
      },
      'tomato': {
        cropName: 'Tomato',
        setupCost: 30000,
        maintenanceCost: 15000,
        expectedYield: 25.0,
        marketPrice: 15000,
        timeToHarvest: 3,
        imageUrl: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=800&auto=format&fit=crop'
      },
      'potato': {
        cropName: 'Potato',
        setupCost: 32000,
        maintenanceCost: 16000,
        expectedYield: 22.0,
        marketPrice: 12000,
        timeToHarvest: 4,
        imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&auto=format&fit=crop'
      }
    };

    // Normalize crop name to lowercase and remove any extra spaces
    const normalizedCrop = crop.toLowerCase().trim();
    
    if (!crop || !cropData[normalizedCrop]) {
      console.log('No specific data found for crop:', crop);
      // Default crop image for unknown crops
      return {
        cropName: crop,
        setupCost: 40000,
        maintenanceCost: 20000,
        expectedYield: 5.0,
        marketPrice: 25000,
        timeToHarvest: 4,
        imageUrl: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&auto=format&fit=crop'
      };
    }

    return cropData[normalizedCrop];
  };

  if (!cropData) {
    return null;
  }

  const economics = getCropEconomics(cropData.cropName);
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
        <h1 className="text-4xl font-bold text-primary mb-8">Crop Economic Analysis</h1>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <img 
              src={economics.imageUrl} 
              alt={economics.cropName}
              className="w-full h-48 object-cover rounded-lg mb-4"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&auto=format&fit=crop';
              }}
            />
            <h2 className="text-2xl font-semibold text-primary mb-4">Crop Overview</h2>
            <div className="space-y-2">
              <p><span className="font-semibold">Crop:</span> {economics.cropName}</p>
              <p><span className="font-semibold">Location:</span> {cropData.location}</p>
              <p><span className="font-semibold">Growing Period:</span> {economics.timeToHarvest} months</p>
              <p><span className="font-semibold">Expected Yield:</span> {economics.expectedYield} tons/acre</p>
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
