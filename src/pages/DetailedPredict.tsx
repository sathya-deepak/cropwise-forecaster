import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const DetailedPredict = () => {
  const navigate = useNavigate();
  const [predictions, setPredictions] = useState<Array<{
    crop: string;
    suitability: number;
    yield: string;
    conditions: string;
  }> | null>(null);
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');
  const [soil, setSoil] = useState<string>('');
  const [field, setField] = useState<string>('');

  const getDetailedPredictions = () => {
    const tempNum = Number(temperature);
    let predictions = [];

    // Base predictions based on soil type
    const soilBasedCrops: Record<string, Array<{ crop: string; baseScore: number; yield: string }>> = {
      'clay': [
        { crop: 'Wheat', baseScore: 85, yield: '3.5-4.2 tons/acre' },
        { crop: 'Rice', baseScore: 80, yield: '3.2-3.8 tons/acre' },
        { crop: 'Cabbage', baseScore: 75, yield: '2.8-3.4 tons/acre' },
        { crop: 'Cotton', baseScore: 70, yield: '2.5-3.0 tons/acre' }
      ],
      'sandy': [
        { crop: 'Carrots', baseScore: 90, yield: '2.8-3.5 tons/acre' },
        { crop: 'Potatoes', baseScore: 85, yield: '2.5-3.2 tons/acre' },
        { crop: 'Peanuts', baseScore: 80, yield: '2.2-2.8 tons/acre' },
        { crop: 'Sweet Potatoes', baseScore: 75, yield: '2.0-2.5 tons/acre' }
      ],
      'loamy': [
        { crop: 'Corn', baseScore: 95, yield: '4.0-4.8 tons/acre' },
        { crop: 'Soybeans', baseScore: 90, yield: '3.8-4.5 tons/acre' },
        { crop: 'Vegetables', baseScore: 85, yield: '3.5-4.2 tons/acre' },
        { crop: 'Fruits', baseScore: 80, yield: '3.2-3.8 tons/acre' }
      ],
      // ... Add more soil types with their base scores
    };

    if (soil && soilBasedCrops[soil]) {
      predictions = soilBasedCrops[soil].map(crop => {
        let finalScore = crop.baseScore;
        let conditions = [];

        // Adjust score based on temperature
        if (tempNum < 10) {
          finalScore -= 20;
          conditions.push('Cold temperature reduces yield');
        } else if (tempNum > 30) {
          finalScore -= 15;
          conditions.push('High temperature affects growth');
        } else {
          finalScore += 5;
          conditions.push('Optimal temperature range');
        }

        // Adjust score based on weather
        if (weather === 'rainy' && crop.crop === 'Rice') {
          finalScore += 10;
          conditions.push('Ideal rainy conditions');
        } else if (weather === 'sunny' && ['Wheat', 'Cotton'].includes(crop.crop)) {
          finalScore += 8;
          conditions.push('Good sunlight exposure');
        }

        // Adjust score based on field condition
        if (field === 'waterlogged' && crop.crop === 'Rice') {
          finalScore += 15;
          conditions.push('Perfect for paddy cultivation');
        } else if (field === 'terraced' && ['Vegetables', 'Tea'].includes(crop.crop)) {
          finalScore += 12;
          conditions.push('Suitable for terrace farming');
        }

        // Ensure score stays within 0-100 range
        finalScore = Math.max(0, Math.min(100, finalScore));

        return {
          crop: crop.crop,
          suitability: finalScore,
          yield: crop.yield,
          conditions: conditions.join(', ')
        };
      });

      // Sort by suitability score
      predictions.sort((a, b) => b.suitability - a.suitability);
    }

    return predictions;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!month || !year || !weather || !temperature || !soil || !field) {
      setPredictions(null);
      return;
    }
    const results = getDetailedPredictions();
    setPredictions(results);
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
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">Detailed Crop Analysis</h1>
        
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
              Analyze Crop Suitability
            </Button>
          </form>

          {predictions && predictions.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-primary mb-4">Crop Suitability Analysis</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Crop</TableHead>
                    <TableHead>Suitability Score</TableHead>
                    <TableHead>Expected Yield</TableHead>
                    <TableHead>Key Conditions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {predictions.map((prediction, index) => (
                    <TableRow key={index} className={index === 0 ? "bg-green-50" : ""}>
                      <TableCell className="font-medium">{prediction.crop}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-primary h-2.5 rounded-full"
                              style={{ width: `${prediction.suitability}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{prediction.suitability}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{prediction.yield}</TableCell>
                      <TableCell className="text-sm text-gray-600">{prediction.conditions}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default DetailedPredict;
