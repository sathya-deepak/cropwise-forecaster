import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/utils/translations";
import LanguageSelector from '@/components/LanguageSelector';
import { PredictionService } from '@/services/PredictionService';
import ExpertConsultation from '@/components/community/ExpertConsultation';
import ROICalculator from '@/components/financial/ROICalculator';

const Predict = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const t = getTranslation(language);
  
  const [result, setResult] = useState<string | null>(null);
  const [predictedCrop, setPredictedCrop] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('');
  const [soilType, setSoilType] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>(null);

  const fetchWeatherData = async (location: string) => {
    try {
      // Simulated weather API call
      const mockWeatherData = {
        temperature: Math.floor(Math.random() * (35 - 15) + 15),
        humidity: Math.floor(Math.random() * (80 - 40) + 40),
        rainfall: Math.floor(Math.random() * (100 - 10) + 10)
      };
      setWeatherData(mockWeatherData);
      return mockWeatherData;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent form from submitting traditionally
    
    if (!location || !soilType) {
      toast({
        title: "Missing Fields",
        description: "Please enter both location and soil type.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Fetch weather data based on location
      const weather = await fetchWeatherData(location);

      const predictionInput = {
        weather: {
          ...weather,
          month: new Date().getMonth() + 1,
          location: location
        },
        soil: {
          type: soilType as any,
          ph: 7.0, // Default values
          nitrogen: 140,
          phosphorus: 50,
          potassium: 200
        },
        region: location
      };

      const prediction = await PredictionService.predictCrops(predictionInput);
      const resultText = `Based on the provided conditions in ${location} (Temperature: ${weather.temperature}°C), 
        we recommend: ${prediction.recommendedCrops.join(', ')}. 
        Confidence: ${Math.round(prediction.confidence * 100)}%. 
        Risk Level: ${prediction.riskLevel}`;

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

  const handleNavigateHome = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default button behavior
    navigate('/');
  };

  const handleCheckEconomics = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default link behavior
    navigate('/crop-economics', { 
      state: { 
        cropName: predictedCrop, 
        location, 
        weatherData 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-cream p-6">
      <LanguageSelector />
      <Button 
        variant="ghost" 
        onClick={handleNavigateHome}
        className="mb-6 text-primary hover:text-primary-dark"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> {t.backToHome}
      </Button>

      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">{t.quickPrediction}</h1>
        
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location"
                    placeholder="Enter your location"
                    className="bg-white border-2 border-primary/20 shadow-sm"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="soilType">Soil Type</Label>
                  <Select value={soilType} onValueChange={setSoilType} required>
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
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-dark text-white"
              >
                {t.getPrediction}
              </Button>
            </form>

            {result && weatherData && (
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-green-50 border border-primary rounded-lg">
                  <h3 className="text-lg font-semibold text-primary mb-2">{t.predictionResult}</h3>
                  <p className="text-gray-700">{result}</p>
                </div>
                
                <Button 
                  onClick={handleCheckEconomics}
                  className="w-full bg-secondary hover:bg-secondary-dark text-white"
                >
                  Check Economic Analysis
                </Button>
              </div>
            )}
          </Card>

          <ROICalculator />
        </div>

        <div className="mt-8">
          <ExpertConsultation />
        </div>
      </div>
    </div>
  );
};

export default Predict;
