
import React from 'react';
import { Card } from "@/components/ui/card";

interface SoilRecommendation {
  parameter: string;
  value: string;
  status: 'good' | 'warning' | 'poor';
  recommendation: string;
}

const SoilAnalysis = ({ cropName }: { cropName: string }) => {
  const getSoilRecommendations = (crop: string): SoilRecommendation[] => {
    // Mock data - in a real app, this would come from an API or database
    const recommendations: Record<string, SoilRecommendation[]> = {
      'rice': [
        { parameter: 'pH Level', value: '6.5', status: 'good', recommendation: 'Maintain current pH levels' },
        { parameter: 'Nitrogen', value: 'Medium', status: 'warning', recommendation: 'Add nitrogen-rich fertilizer' },
        { parameter: 'Phosphorus', value: 'High', status: 'good', recommendation: 'No action needed' },
        { parameter: 'Potassium', value: 'Low', status: 'poor', recommendation: 'Apply potash fertilizer' }
      ],
      'default': [
        { parameter: 'pH Level', value: '7.0', status: 'good', recommendation: 'Soil pH is optimal' },
        { parameter: 'Nitrogen', value: 'Medium', status: 'warning', recommendation: 'Consider nitrogen supplementation' },
        { parameter: 'Organic Matter', value: 'Low', status: 'poor', recommendation: 'Add organic compost' }
      ]
    };

    return recommendations[crop.toLowerCase()] || recommendations.default;
  };

  const recommendations = getSoilRecommendations(cropName);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-600 bg-green-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'poor':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Soil Analysis & Recommendations</h3>
      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className={`p-3 rounded-lg ${getStatusColor(rec.status)}`}>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{rec.parameter}</h4>
                <p className="text-sm">Value: {rec.value}</p>
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-opacity-20 capitalize">
                {rec.status}
              </span>
            </div>
            <p className="text-sm mt-2">{rec.recommendation}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SoilAnalysis;
