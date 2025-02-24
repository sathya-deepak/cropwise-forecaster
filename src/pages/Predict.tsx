
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
import { PredictionService } from '@/services/PredictionService';

const Predict = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = getTranslation(language);
  
  const [result, setResult] = useState<string | null>(null);
  const [predictedCrop, setPredictedCrop] = useState<string | null>(null);
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');
  const [humidity, setHumidity] = useState<string>('');
  const [rainfall, setRainfall] = useState<string>('');
  const [soilType, setSoilType] = useState<string>('');
  const [soilPh, setSoilPh] = useState<string>('');
  const [nitrogen, setNitrogen] = useState<string>('');
  const [phosphorus, setPhosphorus] = useState<string>('');
  const [potassium, setPotassium] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with values:', {
      month, year, location, temperature, humidity, rainfall, soilType, soilPh
    });
    
    if (!month || !year || !location || !temperature || !soilType || !soilPh) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields to get an accurate prediction.",
        variant: "destructive"
      });
      return;
    }

    try {
      const predictionInput = {
        weather: {
          temperature: Number(temperature),
          rainfall: Number(rainfall),
          humidity: Number(humidity),
          month: Number(month),
          location: location
        },
        soil: {
          type: soilType as any,
          ph: Number(soilPh),
          nitrogen: Number(nitrogen),
          phosphorus: Number(phosphorus),
          potassium: Number(potassium)
        },
        region: location
      };

      const prediction = await PredictionService.predictCrops(predictionInput);
      const resultText = `Based on the provided conditions, we recommend: ${prediction.recommendedCrops.join(', ')}. 
        Confidence: ${Math.round(prediction.confidence * 100)}%. 
        Risk Level: ${prediction.riskLevel}. 
        ${prediction.soilSuitability.recommendations?.join('. ')}`;

      setResult(resultText);
      setPredictedCrop(prediction.recommendedCrops[0]);

      toast({
        title: "Prediction Generated",
        description: "Your crop prediction is ready!",
      });
    } catch (error) {
      console.error('Error generating prediction:', error);
      toast({
        title: "Error",
        description: "Failed to generate prediction. Please try again.",
        variant: "destructive"
      });
    }
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
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">{t.quickPrediction}</h1>
        
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <MonthYearSelector 
              onMonthChange={setMonth}
              onYearChange={setYear}
            />

            <div className="grid md:grid-cols-2 gap-6">
              {/* Location Input */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location"
                  placeholder="Enter your location"
                  className="bg-white border-2 border-primary/20 shadow-sm"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* Weather Inputs */}
              <div className="space-y-2">
                <Label htmlFor="temperature">Temperature (°C)</Label>
                <Input 
                  type="number" 
                  id="temperature" 
                  placeholder="Enter temperature"
                  className="bg-white border-2 border-primary/20 shadow-sm"
                  onChange={(e) => setTemperature(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="humidity">Humidity (%)</Label>
                <Input 
                  type="number" 
                  id="humidity" 
                  placeholder="Enter humidity"
                  className="bg-white border-2 border-primary/20 shadow-sm"
                  onChange={(e) => setHumidity(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rainfall">Rainfall (mm)</Label>
                <Input 
                  type="number" 
                  id="rainfall" 
                  placeholder="Enter rainfall"
                  className="bg-white border-2 border-primary/20 shadow-sm"
                  onChange={(e) => setRainfall(e.target.value)}
                />
              </div>

              {/* Soil Inputs */}
              <div className="space-y-2">
                <Label htmlFor="soilType">Soil Type</Label>
                <Select onValueChange={setSoilType}>
                  <SelectTrigger className="bg-white border-2 border-primary/20 shadow-sm">
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alluvial">Alluvial Soil</SelectItem>
                    <SelectItem value="black">Black Soil</SelectItem>
                    <SelectItem value="red">Red Soil</SelectItem>
                    <SelectItem value="laterite">Laterite Soil</SelectItem>
                    <SelectItem value="sandy">Sandy Soil</SelectItem>
                    <SelectItem value="clay">Clay Soil</SelectItem>
                    <SelectItem value="loamy">Loamy Soil</SelectItem>
                    <SelectItem value="saline">Saline Soil</SelectItem>
                    <SelectItem value="peaty">Peaty Soil</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="soilPh">Soil pH</Label>
                <Input 
                  type="number" 
                  id="soilPh" 
                  placeholder="Enter soil pH"
                  min="0"
                  max="14"
                  step="0.1"
                  className="bg-white border-2 border-primary/20 shadow-sm"
                  onChange={(e) => setSoilPh(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nitrogen">Nitrogen (kg/ha)</Label>
                <Input 
                  type="number" 
                  id="nitrogen" 
                  placeholder="Enter nitrogen content"
                  className="bg-white border-2 border-primary/20 shadow-sm"
                  onChange={(e) => setNitrogen(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phosphorus">Phosphorus (kg/ha)</Label>
                <Input 
                  type="number" 
                  id="phosphorus" 
                  placeholder="Enter phosphorus content"
                  className="bg-white border-2 border-primary/20 shadow-sm"
                  onChange={(e) => setPhosphorus(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="potassium">Potassium (kg/ha)</Label>
                <Input 
                  type="number" 
                  id="potassium" 
                  placeholder="Enter potassium content"
                  className="bg-white border-2 border-primary/20 shadow-sm"
                  onChange={(e) => setPotassium(e.target.value)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white">
              {t.getPrediction}
            </Button>
          </form>

          {result && (
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-green-50 border border-primary rounded-lg">
                <h3 className="text-lg font-semibold text-primary mb-2">{t.predictionResult}</h3>
                <p className="text-gray-700">{result}</p>
              </div>
              
              <Link 
                to="/crop-economics" 
                state={{ cropName: predictedCrop }}
                className="block w-full"
              >
                <Button 
                  type="button"
                  className="w-full bg-secondary hover:bg-secondary-dark text-white"
                >
                  Check Economic Analysis
                </Button>
              </Link>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Predict;
