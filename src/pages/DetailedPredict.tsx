import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from 'lucide-react';
import MonthYearSelector from '@/components/prediction/MonthYearSelector';
import { useToast } from "@/components/ui/use-toast";
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
  const { toast } = useToast();
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
    console.log('Generating detailed predictions with inputs:', {
      month, year, weather, temperature, soil, field
    });

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
        { crop: 'Peanuts', baseScore: 80, yield: '2.2-2.8 tons/acre' }
      ],
      'loamy': [
        { crop: 'Corn', baseScore: 95, yield: '4.0-4.8 tons/acre' },
        { crop: 'Soybeans', baseScore: 90, yield: '3.8-4.5 tons/acre' },
        { crop: 'Vegetables', baseScore: 85, yield: '3.5-4.2 tons/acre' }
      ]
    };

    let predictions = [];
    const tempNum = Number(temperature);

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
        } else if (field === 'terraced' && ['Vegetables'].includes(crop.crop)) {
          finalScore += 12;
          conditions.push('Suitable for terrace farming');
        }

        finalScore = Math.max(0, Math.min(100, finalScore));

        return {
          crop: crop.crop,
          suitability: finalScore,
          yield: crop.yield,
          conditions: conditions.join(', ')
        };
      });

      predictions.sort((a, b) => b.suitability - a.suitability);
    }

    console.log('Generated predictions:', predictions);
    return predictions;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with values:', {
      month, year, weather, temperature, soil, field
    });
    
    if (!month || !year || !weather || !temperature || !soil || !field) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all fields to get an accurate prediction.",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const results = getDetailedPredictions();
      console.log('Setting prediction results:', results);
      setPredictions(results);

      // Show success toast
      toast({
        title: "Analysis Complete",
        description: "Your detailed crop analysis is ready!",
      });

      // Wait a moment before navigating
      if (results && results.length > 0) {
        setTimeout(() => {
          navigate('/crop-economics', { 
            state: { cropName: results[0].crop }
          });
        }, 3000);
      }
    } catch (error) {
      console.error('Error generating predictions:', error);
      toast({
        title: "Error",
        description: "Failed to generate predictions. Please try again.",
        variant: "destructive"
      });
    }
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
