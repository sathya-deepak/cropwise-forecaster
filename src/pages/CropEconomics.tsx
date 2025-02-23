
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from 'lucide-react';
import WeatherWidget from '@/components/dashboard/WeatherWidget';
import ProfitChart from '@/components/dashboard/ProfitChart';
import CropCalendar from '@/components/dashboard/CropCalendar';
import SoilAnalysis from '@/components/dashboard/SoilAnalysis';
import SustainableTips from '@/components/dashboard/SustainableTips';
import MarketTrends from '@/components/dashboard/MarketTrends';
import DiseaseGuide from '@/components/dashboard/DiseaseGuide';
import CommunityForum from '@/components/dashboard/CommunityForum';
import CropRotationPlanner from '@/components/dashboard/CropRotationPlanner';
import LanguageSelector from '@/components/LanguageSelector';

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
  
  const { cropName = 'Unknown Crop' } = location.state || {};

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
        imageUrl: 'https://tse4.mm.bing.net/th?id=OIP.EaGCgj3Xiy6MWNzb_UX34QHaEK&pid=Api&P=0&h=180'
      },
      'rice': {
        cropName: 'Rice',
        setupCost: 45000,
        maintenanceCost: 25000,
        expectedYield: 5.5,
        marketPrice: 22000,
        timeToHarvest: 4,
        imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.hKPPPNaoUMBjvEq3T5kGbgHaE8&pid=Api&P=0&h=180'
      },
      'wheat': {
        cropName: 'Wheat',
        setupCost: 35000,
        maintenanceCost: 18000,
        expectedYield: 4.2,
        marketPrice: 25000,
        timeToHarvest: 5,
        imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.jEtws9_luAKsuyrFXVRNrwHaEv&pid=Api&P=0&h=180'
      },
      'winter wheat': {
        cropName: 'Winter Wheat',
        setupCost: 35000,
        maintenanceCost: 18000,
        expectedYield: 4.2,
        marketPrice: 25000,
        timeToHarvest: 5,
        imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.jEtws9_luAKsuyrFXVRNrwHaEv&pid=Api&P=0&h=180'
      },
      'cotton': {
        cropName: 'Cotton',
        setupCost: 55000,
        maintenanceCost: 28000,
        expectedYield: 2.8,
        marketPrice: 65000,
        timeToHarvest: 6,
        imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.KDnjxIFMWIFc69LfDalT7AHaE8&pid=Api&P=0&h=180'
      },
      'groundnut': {
        cropName: 'Groundnut',
        setupCost: 36000,
        maintenanceCost: 19000,
        expectedYield: 2.5,
        marketPrice: 45000,
        timeToHarvest: 4,
        imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.ARpsHdxHQLPWMB2YaGWgFgHaE7&pid=Api&P=0&h=180'
      },
      'peanuts': {
        cropName: 'Groundnut',
        setupCost: 36000,
        maintenanceCost: 19000,
        expectedYield: 2.5,
        marketPrice: 45000,
        timeToHarvest: 4,
        imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.ARpsHdxHQLPWMB2YaGWgFgHaE7&pid=Api&P=0&h=180'
      },
      'sugarcane': {
        cropName: 'Sugarcane',
        setupCost: 60000,
        maintenanceCost: 32000,
        expectedYield: 70.0,
        marketPrice: 3500,
        timeToHarvest: 12,
        imageUrl: 'https://cdn.shopify.com/s/files/1/0824/4857/files/iStock_000063947343_Medium_405ebf84-45ae-4ba6-921d-86ce0cd62012_2048x2048.jpg?v=1541407904'
      },
      'maize': {
        cropName: 'Maize',
        setupCost: 42000,
        maintenanceCost: 22000,
        expectedYield: 6.5,
        marketPrice: 20000,
        timeToHarvest: 4,
        imageUrl: 'https://tse4.mm.bing.net/th?id=OIP.EaGCgj3Xiy6MWNzb_UX34QHaEK&pid=Api&P=0&h=180'
      },
      'soybean': {
        cropName: 'Soybean',
        setupCost: 38000,
        maintenanceCost: 20000,
        expectedYield: 3.5,
        marketPrice: 38000,
        timeToHarvest: 4,
        imageUrl: 'https://tse4.mm.bing.net/th?id=OIP.Ull9sExmcM4JW8DGHLh1CgHaFj&pid=Api&P=0&h=180'
      },
      'barley': {
        cropName: 'Barley',
        setupCost: 30000,
        maintenanceCost: 15000,
        expectedYield: 3.8,
        marketPrice: 28000,
        timeToHarvest: 4,
        imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.-UjwP1IvJ-HpSZlZ_cGlxAHaFH&pid=Api&P=0&h=180'
      },
      'vegetables': {
        cropName: 'Vegetables',
        setupCost: 52000,
        maintenanceCost: 30000,
        expectedYield: 8.2,
        marketPrice: 35000,
        timeToHarvest: 3,
        imageUrl: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&auto=format&fit=crop'
      },
      'unknown crop': {
        cropName: 'Vegetables (Recommended)',
        setupCost: 52000,
        maintenanceCost: 30000,
        expectedYield: 8.2,
        marketPrice: 35000,
        timeToHarvest: 3,
        imageUrl: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&auto=format&fit=crop'
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

  return (
    <div className="min-h-screen bg-cream p-6">
      <LanguageSelector />
      <Link 
        to="/predict"
        className="inline-block mb-6"
      >
        <Button 
          variant="ghost" 
          type="button"
          className="text-primary hover:text-primary-dark"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Prediction
        </Button>
      </Link>

      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Crop Economics Analysis</h1>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <WeatherWidget />
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
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <MarketTrends cropName={economics.cropName} />
          <DiseaseGuide cropName={economics.cropName} />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <CropCalendar cropName={economics.cropName} />
          <SoilAnalysis cropName={economics.cropName} />
        </div>

        <div className="mb-6">
          <ProfitChart />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
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
          <SustainableTips cropName={economics.cropName} />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <CommunityForum cropName={economics.cropName} />
          <CropRotationPlanner currentCrop={economics.cropName} />
        </div>
      </div>
    </div>
  );
};

export default CropEconomics;
