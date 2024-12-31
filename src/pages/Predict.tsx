import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from 'lucide-react';

const Predict = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<string | null>(null);
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');
  const [soil, setSoil] = useState<string>('');
  const [field, setField] = useState<string>('');

  const getCropRecommendation = () => {
    // Temperature ranges for different conditions
    const tempNum = Number(temperature);
    let primaryCrop = '';
    let secondaryCrops = [];
    let expectedYield = '';

    // Soil-based initial recommendations
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
      },
      'silt': {
        crops: ['Vegetables', 'Berries', 'Tomatoes'],
        yield: '3.2-4.0 tons/acre'
      },
      'peat': {
        crops: ['Root Vegetables', 'Leafy Greens'],
        yield: '3.0-3.8 tons/acre'
      },
      'chalk': {
        crops: ['Barley', 'Beans', 'Wheat'],
        yield: '2.5-3.2 tons/acre'
      },
      'alluvial': {
        crops: ['Rice', 'Sugarcane', 'Jute'],
        yield: '4.2-5.0 tons/acre'
      },
      'black': {
        crops: ['Cotton', 'Sugarcane', 'Wheat'],
        yield: '3.8-4.5 tons/acre'
      },
      'red': {
        crops: ['Groundnut', 'Tobacco', 'Millet'],
        yield: '2.8-3.5 tons/acre'
      },
      'laterite': {
        crops: ['Cashew', 'Tea', 'Coffee'],
        yield: '2.5-3.0 tons/acre'
      }
    };

    // Get base recommendation from soil type
    if (soil && soilBasedCrops[soil]) {
      primaryCrop = soilBasedCrops[soil].crops[0];
      secondaryCrops = soilBasedCrops[soil].crops.slice(1);
      expectedYield = soilBasedCrops[soil].yield;
    }

    // Adjust based on temperature
    if (tempNum < 10) {
      primaryCrop = 'Winter Wheat';
      secondaryCrops = ['Rye', 'Barley'];
    } else if (tempNum > 30) {
      primaryCrop = 'Sorghum';
      secondaryCrops = ['Millet', 'Cotton'];
    }

    // Adjust based on weather
    if (weather === 'rainy' || weather === 'humid') {
      if (!secondaryCrops.includes('Rice')) {
        secondaryCrops.unshift('Rice');
      }
    } else if (weather === 'sunny' || weather === 'partially_cloudy') {
      if (!secondaryCrops.includes('Sunflower')) {
        secondaryCrops.push('Sunflower');
      }
    }

    // Adjust based on field condition
    if (field === 'waterlogged') {
      primaryCrop = 'Rice';
      secondaryCrops = ['Water Chestnuts', 'Taro'];
    } else if (field === 'terraced') {
      if (!secondaryCrops.includes('Tea')) {
        secondaryCrops.push('Tea');
      }
    }

    return `Based on the provided conditions, we recommend planting ${primaryCrop} as your primary crop. Expected yield: ${expectedYield}. Secondary recommendations: ${secondaryCrops.join(' or ')}.`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!month || !year || !weather || !temperature || !soil || !field) {
      setResult("Please fill in all fields to get an accurate prediction.");
      return;
    }
    setResult(getCropRecommendation());
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
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Crop Prediction System</h1>
        
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="month">Month</Label>
                <Select onValueChange={setMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => (
                      <SelectItem key={i + 1} value={String(i + 1)}>
                        {new Date(0, i).toLocaleString('default', { month: 'long' })}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="year">Year</Label>
                <Input 
                  type="number" 
                  id="year" 
                  placeholder="Enter year" 
                  min="2024" 
                  max="2100" 
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weather">Weather Condition</Label>
                <Select onValueChange={setWeather}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select weather" />
                  </SelectTrigger>
                  <SelectContent>
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
                  onChange={(e) => setTemperature(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="soil">Soil Type</Label>
                <Select onValueChange={setSoil}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clay">Clay Soil (High nutrients, poor drainage)</SelectItem>
                    <SelectItem value="sandy">Sandy Soil (Good drainage, low nutrients)</SelectItem>
                    <SelectItem value="loamy">Loamy Soil (Balanced nutrients and drainage)</SelectItem>
                    <SelectItem value="silt">Silt Soil (Fine particles, good water retention)</SelectItem>
                    <SelectItem value="peat">Peat Soil (High organic matter)</SelectItem>
                    <SelectItem value="chalk">Chalk Soil (Alkaline, good drainage)</SelectItem>
                    <SelectItem value="alluvial">Alluvial Soil (River deposits, fertile)</SelectItem>
                    <SelectItem value="black">Black Soil (Rich in minerals)</SelectItem>
                    <SelectItem value="red">Red Soil (Iron-rich, acidic)</SelectItem>
                    <SelectItem value="laterite">Laterite Soil (Poor nutrients, good drainage)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="field">Field Condition</Label>
                <Select onValueChange={setField}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select field condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent - Well maintained (Optimal growing conditions)</SelectItem>
                    <SelectItem value="good">Good - Minor issues (Slight imperfections)</SelectItem>
                    <SelectItem value="fair">Fair - Some concerns (Needs improvement)</SelectItem>
                    <SelectItem value="poor">Poor - Needs attention (Significant issues)</SelectItem>
                    <SelectItem value="irrigated">Irrigated (Controlled water supply)</SelectItem>
                    <SelectItem value="non_irrigated">Non-irrigated (Dependent on rainfall)</SelectItem>
                    <SelectItem value="terraced">Terraced (Stepped landscape)</SelectItem>
                    <SelectItem value="sloped">Sloped (Angled terrain)</SelectItem>
                    <SelectItem value="leveled">Leveled (Flat terrain)</SelectItem>
                    <SelectItem value="waterlogged">Waterlogged (Excess water retention)</SelectItem>
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