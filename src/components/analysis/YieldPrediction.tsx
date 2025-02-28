
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Loader2, 
  ArrowUp, 
  ArrowDown, 
  Leaf 
} from 'lucide-react';

interface YieldPredictionProps {
  cropName: string;
  weatherFactors: {
    temperature: number;
    rainfall: number;
    humidity: number;
  };
  expectedYield: number;
}

const YieldPrediction = ({ cropName, weatherFactors, expectedYield }: YieldPredictionProps) => {
  // Calculate yield modifiers based on weather conditions
  const getYieldModifier = () => {
    const { temperature, rainfall, humidity } = weatherFactors;
    
    let modifier = 1.0;
    
    // Temperature impact
    if (temperature > 35) {
      modifier -= 0.2; // Too hot reduces yield
    } else if (temperature < 15) {
      modifier -= 0.15; // Too cold reduces yield
    } else if (temperature >= 22 && temperature <= 28) {
      modifier += 0.1; // Ideal temperature boosts yield
    }
    
    // Rainfall impact
    if (rainfall < 50) {
      modifier -= 0.25; // Too dry severely reduces yield
    } else if (rainfall > 200) {
      modifier -= 0.15; // Too wet reduces yield
    } else if (rainfall >= 80 && rainfall <= 150) {
      modifier += 0.15; // Ideal rainfall boosts yield
    }
    
    // Humidity impact
    if (humidity > 80) {
      modifier -= 0.1; // Too humid reduces yield
    } else if (humidity < 30) {
      modifier -= 0.1; // Too dry air reduces yield
    } else if (humidity >= 50 && humidity <= 70) {
      modifier += 0.05; // Ideal humidity slightly boosts yield
    }
    
    return modifier;
  };
  
  const yieldModifier = getYieldModifier();
  const predictedYield = (expectedYield * yieldModifier).toFixed(1);
  const yieldDifference = ((yieldModifier - 1) * 100).toFixed(1);
  const isPositive = yieldModifier >= 1;
  
  // Calculate the confidence level based on weather condition extremes
  const confidenceScore = () => {
    const { temperature, rainfall, humidity } = weatherFactors;
    let score = 80; // Base confidence score
    
    // Reduce confidence for extreme conditions
    if (temperature > 35 || temperature < 15) score -= 10;
    if (rainfall < 50 || rainfall > 200) score -= 15;
    if (humidity > 80 || humidity < 30) score -= 5;
    
    return Math.max(score, 30); // Minimum 30% confidence
  };
  
  const confidence = confidenceScore();

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 border-b">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Leaf className="w-5 h-5 text-green-600" />
          Yield Prediction
        </h3>
        <p className="text-sm text-gray-500">Based on current weather conditions</p>
      </div>
      
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Predicted Yield</span>
              <span className="text-2xl font-bold">{predictedYield} tons/acre</span>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-full ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
                {isPositive ? 
                  <ArrowUp className="w-5 h-5 text-green-600" /> : 
                  <ArrowDown className="w-5 h-5 text-red-600" />
                }
              </div>
              <div>
                <p className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? `+${yieldDifference}%` : `${yieldDifference}%`} from baseline
                </p>
                <p className="text-xs text-gray-500">Compared to average conditions</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Prediction Confidence</span>
                <span>{confidence}%</span>
              </div>
              <Progress value={confidence} className="h-2" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-medium text-sm">Weather Impact Factors</h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-orange-500" />
                  <span className="text-sm">Temperature</span>
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  weatherFactors.temperature > 35 || weatherFactors.temperature < 15
                    ? 'bg-red-100 text-red-700'
                    : weatherFactors.temperature >= 22 && weatherFactors.temperature <= 28
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {weatherFactors.temperature}°C
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">Rainfall</span>
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  weatherFactors.rainfall < 50
                    ? 'bg-red-100 text-red-700'
                    : weatherFactors.rainfall > 200
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {weatherFactors.rainfall}mm
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-purple-500" />
                  <span className="text-sm">Humidity</span>
                </div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  weatherFactors.humidity > 80 || weatherFactors.humidity < 30
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {weatherFactors.humidity}%
                </span>
              </div>
            </div>
            
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100 text-sm">
              <p className="font-medium text-blue-800">Tip:</p>
              <p className="text-blue-700">
                {yieldModifier < 0.8 
                  ? `Consider additional irrigation and protective measures to improve yield.` 
                  : yieldModifier > 1.1
                  ? `Current conditions are excellent for ${cropName}.`
                  : `Maintain regular monitoring of your crop.`
                }
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default YieldPrediction;
