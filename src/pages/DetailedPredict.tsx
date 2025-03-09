
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
  const [district, setDistrict] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [soil, setSoil] = useState<string>('');
  const [field, setField] = useState<string>('');
  const [nitrogen, setNitrogen] = useState<string>('');
  const [phosphorus, setPhosphorus] = useState<string>('');
  const [potassium, setPotassium] = useState<string>('');

  const getDetailedPredictions = () => {
    console.log('Generating detailed predictions with inputs:', {
      month, year, district, state, soil, field, nitrogen, phosphorus, potassium
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

    // State-based adjustments (simplified for demo)
    const stateBonuses: Record<string, Record<string, number>> = {
      'punjab': { 'Wheat': 10, 'Rice': 8 },
      'kerala': { 'Rice': 12, 'Coconut': 15 },
      'gujarat': { 'Cotton': 12, 'Groundnut': 10 },
      'karnataka': { 'Coffee': 15, 'Sugarcane': 8 },
      'maharashtra': { 'Sugarcane': 12, 'Cotton': 10 }
    };

    let predictions = [];
    
    if (soil && soilBasedCrops[soil]) {
      predictions = soilBasedCrops[soil].map(crop => {
        let finalScore = crop.baseScore;
        let conditions = [];

        // State adjustments
        if (state && stateBonuses[state.toLowerCase()] && stateBonuses[state.toLowerCase()][crop.crop]) {
          const bonus = stateBonuses[state.toLowerCase()][crop.crop];
          finalScore += bonus;
          conditions.push(`Ideal growing region in ${state} (+${bonus})`);
        }

        // Season adjustments based on month
        const monthNum = parseInt(month);
        if (monthNum >= 6 && monthNum <= 9) { // Monsoon season
          if (['Rice', 'Maize', 'Soybean'].includes(crop.crop)) {
            finalScore += 10;
            conditions.push('Perfect monsoon crop (+10)');
          }
        } else if (monthNum >= 11 || monthNum <= 2) { // Winter
          if (['Wheat', 'Mustard', 'Peas'].includes(crop.crop)) {
            finalScore += 10;
            conditions.push('Ideal winter crop (+10)');
          }
        } else { // Summer
          if (['Cotton', 'Sugarcane', 'Sunflower'].includes(crop.crop)) {
            finalScore += 8;
            conditions.push('Good summer crop (+8)');
          }
        }

        // Nutrient adjustments
        const nitrogenLevel = parseInt(nitrogen) || 0;
        const phosphorusLevel = parseInt(phosphorus) || 0; 
        const potassiumLevel = parseInt(potassium) || 0;

        // Nitrogen-loving crops
        if (nitrogenLevel > 140 && ['Maize', 'Rice', 'Wheat'].includes(crop.crop)) {
          finalScore += 8;
          conditions.push('High nitrogen benefits this crop (+8)');
        } else if (nitrogenLevel < 80 && ['Groundnut', 'Soybean', 'Chickpea'].includes(crop.crop)) {
          finalScore += 5;
          conditions.push('Nitrogen-fixing crop suitable for low nitrogen soil (+5)');
        }

        // Phosphorus-loving crops
        if (phosphorusLevel > 30 && ['Sunflower', 'Mustard', 'Cotton'].includes(crop.crop)) {
          finalScore += 6;
          conditions.push('High phosphorus benefits this crop (+6)');
        }

        // Potassium-loving crops
        if (potassiumLevel > 150 && ['Sugarcane', 'Potato', 'Tomato'].includes(crop.crop)) {
          finalScore += 7;
          conditions.push('High potassium benefits this crop (+7)');
        }

        // Field condition adjustments
        if (field === 'waterlogged' && crop.crop === 'Rice') {
          finalScore += 15;
          conditions.push('Perfect for paddy cultivation (+15)');
        } else if (field === 'terraced' && ['Grapes', 'Tea'].includes(crop.crop)) {
          finalScore += 12;
          conditions.push('Suitable for terrace farming (+12)');
        } else if (field === 'excellent') {
          finalScore += 5;
          conditions.push('Well-maintained field benefits all crops (+5)');
        } else if (field === 'poor') {
          finalScore -= 10;
          conditions.push('Poor field condition reduces yields (-10)');
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
      month, year, district, state, soil, field, nitrogen, phosphorus, potassium
    });
    
    if (!month || !year || !soil || !field) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields to get an accurate prediction.",
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
                <Label htmlFor="district">District</Label>
                <Input 
                  id="district" 
                  placeholder="Enter district"
                  className="bg-white border-2 border-primary/20 shadow-sm"
                  onChange={(e) => setDistrict(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Select onValueChange={setState}>
                  <SelectTrigger className="bg-white border-2 border-primary/20 shadow-sm">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-2 border-primary/20">
                    <SelectItem value="punjab">Punjab</SelectItem>
                    <SelectItem value="haryana">Haryana</SelectItem>
                    <SelectItem value="gujarat">Gujarat</SelectItem>
                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="kerala">Kerala</SelectItem>
                    <SelectItem value="tamilNadu">Tamil Nadu</SelectItem>
                    <SelectItem value="andhraPradesh">Andhra Pradesh</SelectItem>
                    <SelectItem value="westBengal">West Bengal</SelectItem>
                    <SelectItem value="uttarPradesh">Uttar Pradesh</SelectItem>
                  </SelectContent>
                </Select>
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

            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="nitrogen">Nitrogen (N) Level (ppm)</Label>
                <Input 
                  type="number" 
                  id="nitrogen" 
                  placeholder="e.g., 140"
                  min="0" 
                  max="500"
                  className="bg-white border-2 border-primary/20 shadow-sm"
                  onChange={(e) => setNitrogen(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phosphorus">Phosphorus (P) Level (ppm)</Label>
                <Input 
                  type="number" 
                  id="phosphorus" 
                  placeholder="e.g., 30"
                  min="0" 
                  max="300"
                  className="bg-white border-2 border-primary/20 shadow-sm"
                  onChange={(e) => setPhosphorus(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="potassium">Potassium (K) Level (ppm)</Label>
                <Input 
                  type="number" 
                  id="potassium" 
                  placeholder="e.g., 200"
                  min="0" 
                  max="800"
                  className="bg-white border-2 border-primary/20 shadow-sm"
                  onChange={(e) => setPotassium(e.target.value)}
                />
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
