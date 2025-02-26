
import React from 'react';
import { Card } from "@/components/ui/card";
import { AlertTriangle, Droplets, Sun, Wind } from 'lucide-react';

interface WeatherRisk {
  riskLevel: 'low' | 'medium' | 'high';
  description: string;
  impact: string;
  recommendation: string;
}

interface WeatherRiskProps {
  cropName: string;
  temperature: number;
  rainfall: number;
  humidity: number;
}

const WeatherRiskAssessment = ({ cropName, temperature, rainfall, humidity }: WeatherRiskProps) => {
  const getCropWeatherRisks = (crop: string, temp: number, rain: number, hum: number): WeatherRisk[] => {
    const risks: WeatherRisk[] = [];

    // Temperature Risk
    if (temp > 35) {
      risks.push({
        riskLevel: 'high',
        description: 'High Temperature Risk',
        impact: 'May cause crop stress and reduce yield',
        recommendation: 'Consider additional irrigation and shade structures'
      });
    } else if (temp < 15) {
      risks.push({
        riskLevel: 'medium',
        description: 'Low Temperature Risk',
        impact: 'May slow down growth rate',
        recommendation: 'Monitor crop development closely'
      });
    }

    // Rainfall Risk
    if (rain < 50) {
      risks.push({
        riskLevel: 'high',
        description: 'Low Rainfall Risk',
        impact: 'Drought stress likely',
        recommendation: 'Implement irrigation system'
      });
    } else if (rain > 200) {
      risks.push({
        riskLevel: 'medium',
        description: 'High Rainfall Risk',
        impact: 'Potential waterlogging',
        recommendation: 'Ensure proper drainage'
      });
    }

    // Humidity Risk
    if (hum > 80) {
      risks.push({
        riskLevel: 'high',
        description: 'High Humidity Risk',
        impact: 'Increased disease pressure',
        recommendation: 'Monitor for diseases and improve air circulation'
      });
    }

    return risks;
  };

  const risks = getCropWeatherRisks(cropName, temperature, rainfall, humidity);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high':
        return 'text-red-500 bg-red-50';
      case 'medium':
        return 'text-yellow-500 bg-yellow-50';
      case 'low':
        return 'text-green-500 bg-green-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <AlertTriangle className="w-5 h-5" />
        Weather Risk Assessment
      </h3>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
          <Sun className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm font-medium">Temperature</p>
            <p className="text-lg font-bold">{temperature}°C</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
          <Droplets className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm font-medium">Rainfall</p>
            <p className="text-lg font-bold">{rainfall}mm</p>
          </div>
        </div>
        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
          <Wind className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm font-medium">Humidity</p>
            <p className="text-lg font-bold">{humidity}%</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {risks.map((risk, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${getRiskColor(risk.riskLevel)} border border-current/10`}
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold">{risk.description}</h4>
              <span className="px-2 py-1 rounded text-sm capitalize font-medium">
                {risk.riskLevel} Risk
              </span>
            </div>
            <p className="text-sm mb-2">Impact: {risk.impact}</p>
            <p className="text-sm font-medium">Recommendation: {risk.recommendation}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WeatherRiskAssessment;
