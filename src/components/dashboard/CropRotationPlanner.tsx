
import React from 'react';
import { Card } from "@/components/ui/card";
import { PredictionService } from '@/services/PredictionService';

interface RotationPlan {
  season: string;
  recommendedCrops: string[];
  benefits: string[];
  soilPreparation: string;
}

const CropRotationPlanner = ({ currentCrop }: { currentCrop: string }) => {
  const getRotationPlan = (crop: string): RotationPlan[] => {
    // Get soil type recommendations for different crops
    const nextSeasonCrops = PredictionService.getSoilTypeRecommendations('alluvial')
      .filter(c => c.toLowerCase() !== crop.toLowerCase())
      .slice(0, 3);

    const seasons = ['Summer', 'Monsoon', 'Winter'];
    
    return seasons.map((season, index) => ({
      season,
      recommendedCrops: nextSeasonCrops,
      benefits: [
        'Improves soil fertility',
        'Breaks pest cycles',
        'Enhances yield'
      ],
      soilPreparation: 'Standard soil preparation with organic matter addition'
    }));
  };

  const rotationPlan = getRotationPlan(currentCrop);

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Crop Rotation Planner</h3>
      <div className="space-y-4">
        {rotationPlan.map((plan, index) => (
          <div key={index} className="border rounded-lg p-4">
            <h4 className="font-medium text-primary mb-2">{plan.season} Season</h4>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium">Recommended Crops:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {plan.recommendedCrops.map((crop, idx) => (
                    <span key={idx} className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {crop}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Benefits:</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {plan.benefits.map((benefit, idx) => (
                    <li key={idx}>{benefit}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium">Soil Preparation:</p>
                <p className="text-sm text-gray-600">{plan.soilPreparation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CropRotationPlanner;
