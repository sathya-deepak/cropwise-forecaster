
import React from 'react';
import { Card } from "@/components/ui/card";

interface Tip {
  title: string;
  description: string;
  category: 'water' | 'soil' | 'pest' | 'general';
}

const SustainableTips = ({ cropName }: { cropName: string }) => {
  const getTips = (crop: string): Tip[] => {
    const tips: Record<string, Tip[]> = {
      'rice': [
        {
          title: 'Water Conservation',
          description: 'Use alternate wetting and drying technique to reduce water consumption by up to 30%.',
          category: 'water'
        },
        {
          title: 'Natural Pest Control',
          description: 'Encourage natural predators like dragonflies to control pest populations.',
          category: 'pest'
        },
        {
          title: 'Soil Health',
          description: 'Practice crop rotation with legumes to improve soil nitrogen content.',
          category: 'soil'
        }
      ],
      'default': [
        {
          title: 'Water Management',
          description: 'Implement drip irrigation for efficient water use.',
          category: 'water'
        },
        {
          title: 'Organic Farming',
          description: 'Use organic fertilizers and natural pest control methods.',
          category: 'general'
        },
        {
          title: 'Soil Conservation',
          description: 'Practice mulching to retain soil moisture and prevent erosion.',
          category: 'soil'
        }
      ]
    };

    return tips[crop.toLowerCase()] || tips.default;
  };

  const tips = getTips(cropName);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'water':
        return 'bg-blue-100 text-blue-600';
      case 'soil':
        return 'bg-brown-100 text-yellow-800';
      case 'pest':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Sustainable Farming Tips</h3>
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${getCategoryIcon(tip.category)}`}>
                <span className="text-xs font-medium capitalize">{tip.category}</span>
              </div>
              <div>
                <h4 className="font-medium">{tip.title}</h4>
                <p className="text-sm text-gray-600 mt-1">{tip.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SustainableTips;
