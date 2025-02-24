
import { useToast } from "@/components/ui/use-toast";

interface WeatherData {
  temperature: number;
  rainfall: number;
  humidity: number;
  month: number;
  location: string;
}

interface SoilData {
  type: 'alluvial' | 'black' | 'red' | 'laterite' | 'sandy' | 'clay' | 'loamy' | 'saline' | 'peaty';
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter?: number;
  drainage?: 'good' | 'moderate' | 'poor';
  texture?: 'fine' | 'medium' | 'coarse';
}

export interface PredictionInput {
  weather: WeatherData;
  soil: SoilData;
  region: string;
  previousCrop?: string;
  irrigationAvailable?: boolean;
}

export interface PredictionResult {
  recommendedCrops: string[];
  confidence: number;
  marketPriceRange: {
    min: number;
    max: number;
  };
  riskLevel: 'low' | 'medium' | 'high';
  soilSuitability: {
    score: number;
    recommendations?: string[];
  };
}

export class PredictionService {
  private static modelEndpoint = 'https://api.example.com/predict';

  static async predictCrops(input: PredictionInput): Promise<PredictionResult> {
    try {
      // Enhanced soil suitability mapping with more factors
      const soilSuitabilityMap: Record<string, { score: number; crops: string[] }> = {
        'alluvial': { 
          score: 0.95,
          crops: ['Rice', 'Wheat', 'Sugarcane', 'Cotton', 'Jute']
        },
        'black': { 
          score: 0.9,
          crops: ['Cotton', 'Sugarcane', 'Wheat', 'Pulses', 'Sunflower']
        },
        'clay': { 
          score: 0.85,
          crops: ['Rice', 'Wheat', 'Cotton', 'Sugarcane']
        },
        'loamy': { 
          score: 0.8,
          crops: ['Most Vegetables', 'Wheat', 'Cotton', 'Sugarcane', 'Pulses']
        },
        'sandy': { 
          score: 0.6,
          crops: ['Groundnut', 'Potato', 'Watermelon', 'Carrot']
        },
        'red': { 
          score: 0.7,
          crops: ['Groundnut', 'Millet', 'Pulses']
        },
        'laterite': { 
          score: 0.65,
          crops: ['Tea', 'Coffee', 'Rubber', 'Cashew']
        },
        'saline': { 
          score: 0.4,
          crops: ['Date Palm', 'Barley', 'Cotton']
        },
        'peaty': { 
          score: 0.5,
          crops: ['Rice', 'Vegetables', 'Grass']
        }
      };

      const soilData = soilSuitabilityMap[input.soil.type];
      const soilScore = soilData?.score || 0.5;
      const recommendations: string[] = [];

      // Soil pH recommendations
      if (input.soil.ph < 6.5) {
        recommendations.push('Consider lime application to increase soil pH');
      } else if (input.soil.ph > 7.5) {
        recommendations.push('Consider sulfur application to decrease soil pH');
      }

      // Nutrient recommendations
      if (input.soil.nitrogen < 140) {
        recommendations.push('Increase nitrogen fertilization');
      }
      if (input.soil.phosphorus < 10) {
        recommendations.push('Add phosphorus-rich fertilizers');
      }
      if (input.soil.potassium < 200) {
        recommendations.push('Supplement with potassium fertilizers');
      }

      // Weather-based adjustments
      let weatherSuitability = 0.8;
      if (input.weather.temperature < 15 || input.weather.temperature > 35) {
        weatherSuitability *= 0.7;
      }
      if (input.weather.humidity < 40 || input.weather.humidity > 80) {
        weatherSuitability *= 0.8;
      }

      const mockPrediction: PredictionResult = {
        recommendedCrops: soilData?.crops || ['Generic Crops'],
        confidence: 0.85 * soilScore * weatherSuitability,
        marketPriceRange: {
          min: 3200,
          max: 3800
        },
        riskLevel: soilScore > 0.7 ? 'low' : soilScore > 0.5 ? 'medium' : 'high',
        soilSuitability: {
          score: soilScore,
          recommendations
        }
      };

      return mockPrediction;
    } catch (error) {
      console.error('Error in crop prediction:', error);
      throw new Error('Failed to generate prediction');
    }
  }

  static analyzeHistoricalPrices(crop: string, months: number = 12): number[] {
    const basePrice = this.getBasePriceForCrop(crop);
    const prices: number[] = [];
    
    for (let i = 0; i < months; i++) {
      const seasonalFactor = Math.sin((i / 12) * Math.PI * 2);
      const randomFactor = (Math.random() - 0.5) * 0.2;
      const price = basePrice * (1 + seasonalFactor * 0.15 + randomFactor);
      prices.push(Math.round(price));
    }
    
    return prices;
  }

  private static getBasePriceForCrop(crop: string): number {
    const basePrices: Record<string, number> = {
      'rice': 22000,
      'wheat': 25000,
      'maize': 20000,
      'cotton': 65000,
      'groundnut': 45000,
      'sugarcane': 3500,
      'soybean': 38000,
      'mustard': 42000,
      'barley': 28000
    };
    
    return basePrices[crop.toLowerCase()] || 30000;
  }

  static getSoilTypeRecommendations(soilType: string): string[] {
    const recommendations: Record<string, string[]> = {
      'alluvial': ['Sugarcane', 'Rice', 'Wheat', 'Cotton'],
      'black': ['Cotton', 'Sugarcane', 'Wheat'],
      'red': ['Groundnut', 'Tobacco', 'Vegetables'],
      'laterite': ['Cashew', 'Rubber', 'Tea'],
      'sandy': ['Groundnut', 'Potato', 'Vegetables'],
      'clay': ['Rice', 'Sugarcane', 'Jute'],
      'loamy': ['Most crops', 'Vegetables', 'Fruits'],
      'saline': ['Salt-tolerant crops', 'Date palm'],
      'peaty': ['Vegetables', 'Rice']
    };

    return recommendations[soilType.toLowerCase()] || ['Consider soil testing for specific recommendations'];
  }
}
