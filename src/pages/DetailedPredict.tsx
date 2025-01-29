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
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/utils/translations";
import LanguageSelector from '@/components/LanguageSelector';
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
  const { language } = useLanguage();
  const t = getTranslation(language);
  
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
        { crop: 'Wheat', baseScore: 90, yield: '3.5-4.2 tons/acre' },
        { crop: 'Rice', baseScore: 88, yield: '4.0-4.5 tons/acre' },
        { crop: 'Sugarcane', baseScore: 85, yield: '60-80 tons/acre' },
        { crop: 'Cotton', baseScore: 82, yield: '2.5-3.0 tons/acre' },
        { crop: 'Jute', baseScore: 80, yield: '2.0-2.5 tons/acre' },
        { crop: 'Tobacco', baseScore: 75, yield: '1.8-2.2 tons/acre' }
      ],
      'sandy': [
        { crop: 'Groundnut', baseScore: 88, yield: '2.0-2.5 tons/acre' },
        { crop: 'Pearl Millet', baseScore: 85, yield: '2.5-3.0 tons/acre' },
        { crop: 'Coconut', baseScore: 82, yield: '10-12 tons/acre' },
        { crop: 'Cashew', baseScore: 80, yield: '0.8-1.2 tons/acre' },
        { crop: 'Sweet Potato', baseScore: 78, yield: '8-10 tons/acre' },
        { crop: 'Sesame', baseScore: 75, yield: '0.6-0.8 tons/acre' }
      ],
      'loamy': [
        { crop: 'Maize', baseScore: 95, yield: '4.0-4.8 tons/acre' },
        { crop: 'Sugarcane', baseScore: 92, yield: '70-90 tons/acre' },
        { crop: 'Cotton', baseScore: 90, yield: '2.8-3.2 tons/acre' },
        { crop: 'Soybean', baseScore: 88, yield: '2.5-3.0 tons/acre' },
        { crop: 'Sorghum', baseScore: 85, yield: '3.0-3.5 tons/acre' },
        { crop: 'Mustard', baseScore: 82, yield: '1.2-1.5 tons/acre' }
      ]
    };

    let predictions = [];
    const tempNum = Number(temperature);

    if (soil && soilBasedCrops[soil]) {
      predictions = soilBasedCrops[soil].map(crop => {
        let finalScore = crop.baseScore;
        let conditions = [];

        // Temperature adjustments
        if (tempNum < 10) {
          if (['Apples', 'Pears'].includes(crop.crop)) {
            finalScore += 10;
            conditions.push('Ideal cold weather for fruit development');
          } else {
            finalScore -= 20;
            conditions.push('Cold temperature reduces yield');
          }
        } else if (tempNum > 30) {
          if (['Mango', 'Papaya', 'Dragon Fruit'].includes(crop.crop)) {
            finalScore += 15;
            conditions.push('Optimal tropical temperature');
          } else {
            finalScore -= 15;
            conditions.push('High temperature affects growth');
          }
        } else {
          finalScore += 5;
          conditions.push('Optimal temperature range');
        }

        // Weather adjustments
        if (weather === 'rainy' && ['Rice', 'Taro'].includes(crop.crop)) {
          finalScore += 15;
          conditions.push('Ideal rainy conditions');
        } else if (weather === 'sunny' && ['Grapes', 'Olives', 'Dates'].includes(crop.crop)) {
          finalScore += 12;
          conditions.push('Perfect sunny conditions');
        }

        // Field condition adjustments
        if (field === 'waterlogged' && crop.crop === 'Rice') {
          finalScore += 15;
          conditions.push('Perfect for paddy cultivation');
        } else if (field === 'terraced' && ['Grapes', 'Tea'].includes(crop.crop)) {
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

      toast({
        title: "Analysis Complete",
        description: "Your detailed crop analysis is ready!",
      });
    } catch (error) {
      console.error('Error generating predictions:', error);
      toast({
        title: "Error",
        description: "Failed to generate predictions. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleCheckEconomics = (cropName: string) => {
    navigate('/crop-economics', { 
      state: { cropName }
    });
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <LanguageSelector />
      <Button 
        variant="ghost" 
        onClick={() => navigate('/')}
        className="mb-6 text-primary hover:text-primary-dark"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> {t.backToHome}
      </Button>

      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">{t.detailedTitle}</h1>
        
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <MonthYearSelector 
              onMonthChange={setMonth}
              onYearChange={setYear}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="weather">{t.weatherCondition}</Label>
                <Select onValueChange={setWeather}>
                  <SelectTrigger className="bg-white border-2 border-primary/20 shadow-sm">
                    <SelectValue placeholder={t.weatherCondition} />
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
                <Label htmlFor="temperature">{t.temperature}</Label>
                <Input 
                  type="number" 
                  id="temperature" 
                  placeholder={t.temperature}
                  min="-20" 
                  max="50"
                  className="bg-white border-2 border-primary/20 shadow-sm"
                  onChange={(e) => setTemperature(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="soil">{t.soilType}</Label>
                <Select onValueChange={setSoil}>
                  <SelectTrigger className="bg-white border-2 border-primary/20 shadow-sm">
                    <SelectValue placeholder={t.soilType} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-primary/20">
                    <SelectItem value="clay">Clay Soil (High nutrients, poor drainage)</SelectItem>
                    <SelectItem value="sandy">Sandy Soil (Good drainage, low nutrients)</SelectItem>
                    <SelectItem value="loamy">Loamy Soil (Balanced nutrients and drainage)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="field">{t.fieldCondition}</Label>
                <Select onValueChange={setField}>
                  <SelectTrigger className="bg-white border-2 border-primary/20 shadow-sm">
                    <SelectValue placeholder={t.fieldCondition} />
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
              {t.analyzeCrop}
            </Button>
          </form>

          {predictions && predictions.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-primary mb-4">{t.detailedTitle}</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Crop</TableHead>
                    <TableHead>{t.suitabilityScore}</TableHead>
                    <TableHead>{t.expectedYield}</TableHead>
                    <TableHead>{t.keyConditions}</TableHead>
                    <TableHead>Actions</TableHead>
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
                      <TableCell>
                        <Button
                          onClick={() => handleCheckEconomics(prediction.crop)}
                          variant="secondary"
                          size="sm"
                        >
                          Check Economics
                        </Button>
                      </TableCell>
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
