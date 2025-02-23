
import React from 'react';
import { Card } from "@/components/ui/card";

interface RotationPlan {
  season: string;
  recommendedCrops: string[];
  benefits: string[];
  soilPreparation: string;
}

const CropRotationPlanner = ({ currentCrop }: { currentCrop: string }) => {
  const getRotationPlan = (crop: string): RotationPlan[] => {
    const rotationPlans: Record<string, RotationPlan[]> = {
      'rice': [
        {
          season: 'Summer',
          recommendedCrops: ['Green Gram', 'Black Gram', 'Sesame'],
          benefits: ['Nitrogen fixation', 'Soil structure improvement', 'Pest cycle break'],
          soilPreparation: 'Minimum tillage, add organic matter'
        },
        {
          season: 'Monsoon',
          recommendedCrops: ['Rice', 'Jute'],
          benefits: ['Water utilization', 'High productivity', 'Weed suppression'],
          soilPreparation: 'Puddling, leveling, green manuring'
        },
        {
          season: 'Winter',
          recommendedCrops: ['Wheat', 'Potato', 'Mustard'],
          benefits: ['Residual moisture use', 'Different nutrient needs', 'Disease reduction'],
          soilPreparation: 'Light tillage, residue incorporation'
        }
      ],
      'wheat': [
        {
          season: 'Summer',
          recommendedCrops: ['Moong Bean', 'Cowpea', 'Soybean'],
          benefits: ['Nitrogen fixation', 'Soil health improvement', 'Erosion control'],
          soilPreparation: 'Summer plowing, organic matter addition'
        },
        {
          season: 'Monsoon',
          recommendedCrops: ['Rice', 'Maize', 'Sorghum'],
          benefits: ['Water efficiency', 'Different root depths', 'Pest management'],
          soilPreparation: 'Deep plowing, proper drainage'
        },
        {
          season: 'Winter',
          recommendedCrops: ['Wheat', 'Chickpea', 'Lentil'],
          benefits: ['Optimal temperature', 'Nitrogen balance', 'Market value'],
          soilPreparation: 'Fine tillage, proper seed bed'
        }
      ],
      'cotton': [
        {
          season: 'Summer',
          recommendedCrops: ['Green Gram', 'Cluster Bean', 'Sesame'],
          benefits: ['Soil enrichment', 'Water conservation', 'Pest reduction'],
          soilPreparation: 'Deep summer plowing'
        },
        {
          season: 'Monsoon',
          recommendedCrops: ['Cotton', 'Pigeon Pea'],
          benefits: ['Rain utilization', 'Long duration crop', 'High returns'],
          soilPreparation: 'Ridge and furrow preparation'
        },
        {
          season: 'Winter',
          recommendedCrops: ['Wheat', 'Chickpea', 'Safflower'],
          benefits: ['Residual moisture use', 'Soil structure', 'Risk distribution'],
          soilPreparation: 'Minimum tillage, moisture conservation'
        }
      ],
      'sugarcane': [
        {
          season: 'Summer',
          recommendedCrops: ['Moong Bean', 'Sesbania', 'Sunflower'],
          benefits: ['Short duration', 'Soil improvement', 'Additional income'],
          soilPreparation: 'Field cleaning, organic matter'
        },
        {
          season: 'Monsoon',
          recommendedCrops: ['Rice', 'Maize'],
          benefits: ['Water utilization', 'Nutrient cycling', 'Weed control'],
          soilPreparation: 'Proper drainage, land leveling'
        },
        {
          season: 'Winter',
          recommendedCrops: ['Potato', 'Mustard', 'Vegetables'],
          benefits: ['Cash crop option', 'Soil health', 'Market demand'],
          soilPreparation: 'Light tillage, bed preparation'
        }
      ],
      'maize': [
        {
          season: 'Summer',
          recommendedCrops: ['Green Gram', 'Cowpea', 'Groundnut'],
          benefits: ['Nitrogen addition', 'Soil conservation', 'Risk mitigation'],
          soilPreparation: 'Summer plowing, residue management'
        },
        {
          season: 'Monsoon',
          recommendedCrops: ['Rice', 'Soybean', 'Cotton'],
          benefits: ['Rain-fed cultivation', 'Different root system', 'Market value'],
          soilPreparation: 'Ridge making, drainage'
        },
        {
          season: 'Winter',
          recommendedCrops: ['Wheat', 'Peas', 'Mustard'],
          benefits: ['Temperature suitable', 'Nutrient efficiency', 'Good returns'],
          soilPreparation: 'Minimum tillage, moisture conservation'
        }
      ],
      'groundnut': [
        {
          season: 'Summer',
          recommendedCrops: ['Sesame', 'Sunflower', 'Pearl Millet'],
          benefits: ['Drought tolerance', 'Different nutrient needs', 'Soil structure'],
          soilPreparation: 'Deep plowing, organic matter'
        },
        {
          season: 'Monsoon',
          recommendedCrops: ['Soybean', 'Pigeon Pea', 'Cotton'],
          benefits: ['Rainfall utilization', 'Soil improvement', 'Economic returns'],
          soilPreparation: 'Broad bed furrow system'
        },
        {
          season: 'Winter',
          recommendedCrops: ['Wheat', 'Chickpea', 'Coriander'],
          benefits: ['Cool season crops', 'Market demand', 'Soil health'],
          soilPreparation: 'Light tillage, raised beds'
        }
      ]
    };

    const normalizedCrop = crop.toLowerCase();
    const defaultPlan = [
      {
        season: 'Summer',
        recommendedCrops: ['Green Gram', 'Cowpea', 'Sesame'],
        benefits: ['Soil health improvement', 'Water conservation', 'Pest management'],
        soilPreparation: 'Standard soil preparation with organic matter addition'
      },
      {
        season: 'Monsoon',
        recommendedCrops: ['Rice', 'Maize', 'Soybean'],
        benefits: ['Water utilization', 'Nutrient cycling', 'Economic returns'],
        soilPreparation: 'Proper drainage and land preparation'
      },
      {
        season: 'Winter',
        recommendedCrops: ['Wheat', 'Chickpea', 'Mustard'],
        benefits: ['Temperature suitable', 'Market demand', 'Soil improvement'],
        soilPreparation: 'Minimum tillage with moisture conservation'
      }
    ];

    return rotationPlans[normalizedCrop] || defaultPlan;
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
