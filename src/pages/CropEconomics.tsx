
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from 'lucide-react';
import ProfitChart from '@/components/dashboard/ProfitChart';
import MarketTrends from '@/components/dashboard/MarketTrends';
import WeatherRiskAssessment from '@/components/analysis/WeatherRiskAssessment';
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

    const cropData: Record<string, CropEconomics> = {
      'groundnut': {
        cropName: 'Groundnut',
        setupCost: 35000,
        maintenanceCost: 20000,
        expectedYield: 2.5,
        marketPrice: 45000,
        timeToHarvest: 4,
        imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.ARpsHdxHQLPWMB2YaGWgFgHaE7&pid=Api&P=0&h=180'
      },
      'rice': {
        cropName: 'Rice',
        setupCost: 42000,
        maintenanceCost: 22000,
        expectedYield: 6.5,
        marketPrice: 20000,
        timeToHarvest: 4,
        imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.hKPPPNaoUMBjvEq3T5kGbgHaE8&pid=Api&P=0&h=180'
      },
      'wheat': {
        cropName: 'Wheat',
        setupCost: 38000,
        maintenanceCost: 18000,
        expectedYield: 5.8,
        marketPrice: 22000,
        timeToHarvest: 5,
        imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.jEtws9_luAKsuyrFXVRNrwHaEv&pid=Api&P=0&h=180'
      },
      'cotton': {
        cropName: 'Cotton',
        setupCost: 45000,
        maintenanceCost: 25000,
        expectedYield: 4.2,
        marketPrice: 65000,
        timeToHarvest: 6,
        imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.KDnjxIFMWIFc69LfDalT7AHaE8&pid=Api&P=0&h=180'
      },
      'maize': {
        cropName: 'Maize',
        setupCost: 36000,
        maintenanceCost: 19000,
        expectedYield: 7.2,
        marketPrice: 18000,
        timeToHarvest: 4,
        imageUrl: 'https://tse4.mm.bing.net/th?id=OIP.EaGCgj3Xiy6MWNzb_UX34QHaEK&pid=Api&P=0&h=180'
      },
      'sugarcane': {
        cropName: 'Sugarcane',
        setupCost: 50000,
        maintenanceCost: 30000,
        expectedYield: 80.0,
        marketPrice: 3000,
        timeToHarvest: 12,
        imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.5Ym4VnKfwQk47YonZUf-VQHaE7&pid=Api&P=0&h=180'
      },
      'tomato': {
        cropName: 'Tomato',
        setupCost: 30000,
        maintenanceCost: 15000,
        expectedYield: 25.0,
        marketPrice: 15000,
        timeToHarvest: 3,
        imageUrl: 'https://tse2.mm.bing.net/th?id=OIP.THi3GSHBzt-UMTLGUbFTbwHaE7&pid=Api&P=0&h=180'
      },
      'potato': {
        cropName: 'Potato',
        setupCost: 32000,
        maintenanceCost: 16000,
        expectedYield: 22.0,
        marketPrice: 12000,
        timeToHarvest: 4,
        imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.SFPOY4V0HvFZPbZA58Sf1AHaHU&pid=Api&P=0&h=180'
      },
      // New crops with their images
      'mustard': {
        cropName: 'Mustard',
        setupCost: 28000,
        maintenanceCost: 14000,
        expectedYield: 1.8,
        marketPrice: 42000,
        timeToHarvest: 4,
        imageUrl: 'https://tse4.mm.bing.net/th?id=OIP.6HC3fVXAo0VgIiWfvpnungHaFj&pid=Api&P=0&h=180'
      },
      'soybean': {
        cropName: 'Soybean',
        setupCost: 30000,
        maintenanceCost: 15000,
        expectedYield: 2.2,
        marketPrice: 38000,
        timeToHarvest: 4,
        imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.x1aIS19eK3Es6nt52uQdjAHaFj&pid=Api&P=0&h=180'
      },
      'pearl millet': {
        cropName: 'Pearl Millet',
        setupCost: 25000,
        maintenanceCost: 12000,
        expectedYield: 2.0,
        marketPrice: 18000,
        timeToHarvest: 3,
        imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.j4L611NG8QKlpIAjIIxaZwHaD6&pid=Api&P=0&h=180'
      },
      'chickpea': {
        cropName: 'Chickpea',
        setupCost: 32000,
        maintenanceCost: 18000,
        expectedYield: 1.6,
        marketPrice: 52000,
        timeToHarvest: 4,
        imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.li-AllzXlKACze26_RVaqgHaE7&pid=Api&P=0&h=180'
      },
      'turmeric': {
        cropName: 'Turmeric',
        setupCost: 45000,
        maintenanceCost: 25000,
        expectedYield: 2.5,
        marketPrice: 75000,
        timeToHarvest: 9,
        imageUrl: 'https://tse2.mm.bing.net/th?id=OIP.gFmERxiJEoUERvOvF6vxAwHaHQ&pid=Api&P=0&h=180'
      },
      'onion': {
        cropName: 'Onion',
        setupCost: 28000,
        maintenanceCost: 15000,
        expectedYield: 20.0,
        marketPrice: 15000,
        timeToHarvest: 4,
        imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.NeXniAJXWcfOLFBgv2NAUQHaFC&pid=Api&P=0&h=180'
      },
      'peanut': {
        cropName: 'Peanut',
        setupCost: 30000,
        maintenanceCost: 18000,
        expectedYield: 2.2,
        marketPrice: 48000,
        timeToHarvest: 4,
        imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.TzCjJgUvvNbE4aLQII684wHaFj&pid=Api&P=0&h=180'
      },
      'barley': {
        cropName: 'Barley',
        setupCost: 26000,
        maintenanceCost: 14000,
        expectedYield: 4.5,
        marketPrice: 28000,
        timeToHarvest: 4,
        imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.3HIFwX9Cw-TxS0ZKpFqEDgHaE8&pid=Api&P=0&h=180'
      },
      'green gram': {
        cropName: 'Green Gram',
        setupCost: 28000,
        maintenanceCost: 16000,
        expectedYield: 1.2,
        marketPrice: 65000,
        timeToHarvest: 3,
        imageUrl: 'https://tse2.mm.bing.net/th?id=OIP.J3n-6gfFNijFPDZM0ZdL4gHaFr&pid=Api&P=0&h=180'
      },
      'black gram': {
        cropName: 'Black Gram',
        setupCost: 27000,
        maintenanceCost: 15000,
        expectedYield: 1.1,
        marketPrice: 62000,
        timeToHarvest: 3,
        imageUrl: 'https://tse2.mm.bing.net/th?id=OIP.FlrRFkr6R8h3h61-iu-1CgHaFr&pid=Api&P=0&h=180'
      },
      'sesame': {
        cropName: 'Sesame',
        setupCost: 25000,
        maintenanceCost: 12000,
        expectedYield: 0.8,
        marketPrice: 85000,
        timeToHarvest: 3,
        imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.hdHUbbodgNyLJgwCmtfXgAHaEn&pid=Api&P=0&h=180'
      },
      'sunflower': {
        cropName: 'Sunflower',
        setupCost: 28000,
        maintenanceCost: 15000,
        expectedYield: 1.5,
        marketPrice: 45000,
        timeToHarvest: 4,
        imageUrl: 'https://tse4.mm.bing.net/th?id=OIP.wJyCVafSAZ6UbuKnqH_djgHaFb&pid=Api&P=0&h=180'
      }
    };

    const normalizedCrop = crop.toLowerCase().trim();
    
    if (!crop || !cropData[normalizedCrop]) {
      console.log('No specific data found for crop:', crop);
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

  const mockWeatherData = {
    temperature: 28,
    rainfall: 75,
    humidity: 65
  };

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

        <div className="mb-6">
          <WeatherRiskAssessment
            cropName={economics.cropName}
            temperature={mockWeatherData.temperature}
            rainfall={mockWeatherData.rainfall}
            humidity={mockWeatherData.humidity}
          />
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
