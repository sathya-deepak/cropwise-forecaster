import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from 'lucide-react';
import MonthYearSelector from '@/components/prediction/MonthYearSelector';

const Predict = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<string | null>(null);
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');
  const [soil, setSoil] = useState<string>('');
  const [field, setField] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quick prediction form submitted with values:', {
      month, year, weather, temperature, soil, field
    });
    
    if (!month || !year || !weather || !temperature || !soil || !field) {
      setResult("Please fill in all fields to get an accurate prediction.");
      return;
    }
    const prediction = getCropRecommendation();
    setResult(prediction);
  };

  const getCropRecommendation = () => {
    console.log('Generating quick prediction');
    const tempNum = Number(temperature);
    let primaryCrop = '';
    let secondaryCrops = [];
    let expectedYield = '';

    const soilBasedCrops: Record<string, { crops: string[], yield: string }> = {
      'clay': { 
        crops: ['Wheat', 'Rice', 'Cabbage'],
        yield: '3.5-4.2 tons/acre'
      },
      'sandy': {
        crops: ['Carrots', 'Potatoes', 'Peanuts'],
        yield: '2.8-3.5 tons/acre'
      },
      'loamy': {
        crops: ['Corn', 'Soybeans', 'Vegetables'],
        yield: '4.0-4.8 tons/acre'
      }
    };

    if (soil && soilBasedCrops[soil]) {
      primaryCrop = soilBasedCrops[soil].crops[0];
      secondaryCrops = soilBasedCrops[soil].crops.slice(1);
      expectedYield = soilBasedCrops[soil].yield;
    }

    if (tempNum < 10) {
      primaryCrop = 'Winter Wheat';
      secondaryCrops = ['Rye', 'Barley'];
    } else if (tempNum > 30) {
      primaryCrop = 'Sorghum';
      secondaryCrops = ['Millet', 'Cotton'];
    }

    if (weather === 'rainy' || weather === 'humid') {
      if (!secondaryCrops.includes('Rice')) {
        secondaryCrops.unshift('Rice');
      }
    } else if (weather === 'sunny' || weather === 'partially_cloudy') {
      if (!secondaryCrops.includes('Sunflower')) {
        secondaryCrops.push('Sunflower');
      }
    }

    if (field === 'waterlogged') {
      primaryCrop = 'Rice';
      secondaryCrops = ['Water Chestnuts', 'Taro'];
    } else if (field === 'terraced') {
      if (!secondaryCrops.includes('Tea')) {
        secondaryCrops.push('Tea');
      }
    }

    console.log('Generated prediction:', { primaryCrop, secondaryCrops, expectedYield });

    navigate('/crop-economics', { 
      state: { cropName: primaryCrop }
    });
    
    return `Based on the provided conditions, we recommend planting ${primaryCrop} as your primary crop. Expected yield: ${expectedYield}. Secondary recommendations: ${secondaryCrops.join(' or ')}.`;
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/')}
        className="mb-6 text-primary hover:text-primary-dark"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </Button>

      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Quick Crop Prediction</h1>
        
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <MonthYearSelector 
              onMonthChange={setMonth}
              onYearChange={setYear}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="weather">Weather Condition</Label>
                <Select onValueChange={setWeather}>
                  <SelectTrigger className="bg-white border-2 border-primary/20 shadow-sm">
                    <SelectValue placeholder="Select weather" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-primary/20">
                    <SelectItem value="sunny">Sunny (High light intensity)</SelectItem>
                    <SelectItem value="rainy">Rainy (High moisture)</SelectItem>
                    <SelectItem value="cloudy">Cloudy (Limited sunlight)</SelectItem>
                    <SelectItem value="partially_cloudy">Partially Cloudy (Moderate sunlight)</SelectItem>
                    <SelectItem value="stormy">Stormy (High wind/rain)</SelectItem>
                    <SelectItem value="windy">Windy (Air circulation)</SelectItem>
                    <SelectItem value="humid">Humid (High moisture in air)</SelectItem>
                    <SelectItem value="foggy">Foggy (Limited visibility)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature (°C)</Label>
                <Input 
                  type="number" 
                  id="temperature" 
                  placeholder="Enter temperature" 
                  min="-20" 
                  max="50"
                  className="bg-white border-2 border-primary/20 shadow-sm"
                  onChange={(e) => setTemperature(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="soil">Soil Type</Label>
                <Select onValueChange={setSoil}>
                  <SelectTrigger className="bg-white border-2 border-primary/20 shadow-sm">
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-primary/20">
                    <SelectItem value="clay">Clay Soil (High nutrients, poor drainage)</SelectItem>
                    <SelectItem value="sandy">Sandy Soil (Good drainage, low nutrients)</SelectItem>
                    <SelectItem value="loamy">Loamy Soil (Balanced nutrients and drainage)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="field">Field Condition</Label>
                <Select onValueChange={setField}>
                  <SelectTrigger className="bg-white border-2 border-primary/20 shadow-sm">
                    <SelectValue placeholder="Select field condition" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-primary/20">
                    <SelectItem value="excellent">Excellent - Well maintained</SelectItem>
                    <SelectItem value="good">Good - Minor issues</SelectItem>
                    <SelectItem value="fair">Fair - Some concerns</SelectItem>
                    <SelectItem value="poor">Poor - Needs attention</SelectItem>
                    <SelectItem value="waterlogged">Waterlogged (Excess water)</SelectItem>
                    <SelectItem value="terraced">Terraced (Stepped landscape)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white">
              Get Crop Prediction
            </Button>
          </form>

          {result && (
            <div className="mt-6 p-4 bg-green-50 border border-primary rounded-lg">
              <h3 className="text-lg font-semibold text-primary mb-2">Prediction Result</h3>
              <p className="text-gray-700">{result}</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Predict;