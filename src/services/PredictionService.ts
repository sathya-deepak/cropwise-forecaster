
import { useToast } from "@/components/ui/use-toast";

interface WeatherData {
  temperature: number;
  rainfall: number;
  humidity: number;
  month: number;
}

interface SoilData {
  type: 'alluvial' | 'black' | 'red' | 'laterite' | 'sandy' | 'clay' | 'loamy' | 'saline' | 'peaty';
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter?: number;
  drainage?: 'good' | 'moderate' | 'poor';
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
      // Enhanced mock prediction logic with soil type consideration
      const soilSuitabilityMap: Record<string, number> = {
        'alluvial': 0.95,
        'black': 0.9,
        'clay': 0.85,
        'loamy': 0.8,
        'sandy': 0.6,
        'red': 0.7,
        'laterite': 0.65,
        'saline': 0.4,
        'peaty': 0.5
      };

      const soilSuitability = soilSuitabilityMap[input.soil.type] || 0.5;
      const recommendations: string[] = [];

      if (input.soil.ph < 6.5) {
        recommendations.push('Consider lime application to increase soil pH');
      }
      if (input.soil.nitrogen < 140) {
        recommendations.push('Increase nitrogen fertilization');
      }

      const mockPrediction: PredictionResult = {
        recommendedCrops: ['Sugarcane', 'Rice', 'Wheat'],
        confidence: 0.85 * soilSuitability,
        marketPriceRange: {
          min: 3200,
          max: 3800
        },
        riskLevel: soilSuitability > 0.7 ? 'low' : soilSuitability > 0.5 ? 'medium' : 'high',
        soilSuitability: {
          score: soilSuitability,
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
