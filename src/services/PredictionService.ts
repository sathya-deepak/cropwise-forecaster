
import { useToast } from "@/components/ui/use-toast";

export interface PredictionInput {
  soil: {
    type: 'alluvial' | 'black' | 'red' | 'laterite' | 'sandy' | 'clay' | 'loamy' | 'saline' | 'peaty';
    ph: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
  };
  weather: {
    temperature: number;
    humidity: number;
    rainfall: number;
    month: number;
    location: string;
  };
  region: string;
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
    recommendations: string[];
  };
}

export class PredictionService {
  private static modelEndpoint = 'https://api.example.com/predict';

  static async predictCrops(input: PredictionInput): Promise<PredictionResult> {
    try {
      // Enhanced soil suitability mapping with more crops
      const soilSuitabilityMap: Record<string, { score: number; crops: string[] }> = {
        'alluvial': { 
          score: 0.95,
          crops: ['Rice', 'Wheat', 'Sugarcane', 'Cotton', 'Jute', 'Maize', 'Mustard', 'Chickpea', 'Peanut']
        },
        'black': { 
          score: 0.9,
          crops: ['Cotton', 'Sugarcane', 'Wheat', 'Pulses', 'Sunflower', 'Soybeans', 'Chickpea', 'Onion']
        },
        'clay': { 
          score: 0.85,
          crops: ['Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Black Gram', 'Green Gram', 'Turmeric']
        },
        'loamy': { 
          score: 0.8,
          crops: ['Most Vegetables', 'Wheat', 'Cotton', 'Sugarcane', 'Pulses', 'Mustard', 'Soybeans', 'Onion', 'Turmeric']
        },
        'sandy': { 
          score: 0.6,
          crops: ['Groundnut', 'Potato', 'Watermelon', 'Carrot', 'Pearl Millet', 'Sesame', 'Peanut']
        },
        'red': { 
          score: 0.7,
          crops: ['Groundnut', 'Millet', 'Pulses', 'Pearl Millet', 'Green Gram', 'Black Gram']
        },
        'laterite': { 
          score: 0.65,
          crops: ['Tea', 'Coffee', 'Rubber', 'Cashew', 'Turmeric']
        },
        'saline': { 
          score: 0.4,
          crops: ['Date Palm', 'Barley', 'Cotton', 'Sunflower']
        },
        'peaty': { 
          score: 0.5,
          crops: ['Rice', 'Vegetables', 'Grass', 'Turmeric']
        }
      };
      
      // Weather suitability mapping (simplified for demo)
      const soilData = soilSuitabilityMap[input.soil.type];
      const soilScore = soilData?.score || 0.5;
      
      // Calculate weather suitability
      let weatherSuitability = 1.0;
      
      // Temperature factor
      if (input.weather.temperature < 10 || input.weather.temperature > 40) {
        weatherSuitability *= 0.6;
      } else if (input.weather.temperature < 15 || input.weather.temperature > 35) {
        weatherSuitability *= 0.8;
      }
      
      // Rainfall factor
      if (input.weather.rainfall < 30 || input.weather.rainfall > 300) {
        weatherSuitability *= 0.7;
      }
      
      // Calculate recommendations based on soil
      const recommendations = [`Your ${input.soil.type} soil is suitable for: ${soilData?.crops.join(', ') || 'limited crops'}`];
      
      // Add pH recommendation if available
      if (input.soil.ph) {
        if (input.soil.ph < 5.5) {
          recommendations.push('Consider liming to increase soil pH for better nutrient availability.');
        } else if (input.soil.ph > 8.0) {
          recommendations.push('Consider adding organic matter or sulfur to decrease soil pH.');
        }
      }
      
      // Add NPK recommendation if available
      if (input.soil.nitrogen && input.soil.phosphorus && input.soil.potassium) {
        if (input.soil.nitrogen < 140) {
          recommendations.push('Nitrogen levels are low. Consider adding nitrogen-rich fertilizers.');
        }
        if (input.soil.phosphorus < 10) {
          recommendations.push('Phosphorus levels are low. Consider adding phosphorus-rich fertilizers.');
        }
        if (input.soil.potassium < 200) {
          recommendations.push('Potassium levels are low. Consider adding potassium-rich fertilizers.');
        }
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

  static analyzeHistoricalPrices(crop: string): number[] {
    const basePrice = this.getBasePriceForCrop(crop);
    
    // Generate simulated historical price data with seasonal variation
    const prices = [];
    for (let i = 0; i < 12; i++) {
      // Add seasonal variation (10-20% fluctuation)
      const seasonalFactor = 1 + (Math.sin(i / 3 * Math.PI) * 0.15);
      // Add random noise (±5%)
      const randomFactor = 1 + (Math.random() * 0.1 - 0.05);
      // Calculate price
      const price = Math.round(basePrice * seasonalFactor * randomFactor);
      prices.push(price);
    }
    
    return prices;
  }

  static predictYieldVariation(cropName: string, weatherConditions: any): number {
    const {temperature, rainfall, humidity} = weatherConditions;
    
    // Base variation is 0 (no change from expected yield)
    let variation = 0;
    
    // Temperature impact (-20% to +10%)
    if (temperature > 35) {
      variation -= 0.2; // Too hot reduces yield by 20%
    } else if (temperature < 15) {
      variation -= 0.15; // Too cold reduces yield by 15%
    } else if (temperature >= 22 && temperature <= 28) {
      variation += 0.1; // Ideal temperature increases yield by 10%
    }
    
    // Rainfall impact (-25% to +15%)
    if (rainfall < 50) {
      variation -= 0.25; // Too dry severely reduces yield
    } else if (rainfall > 200) {
      variation -= 0.15; // Too wet reduces yield
    } else if (rainfall >= 80 && rainfall <= 150) {
      variation += 0.15; // Ideal rainfall boosts yield
    }
    
    // Humidity impact (-10% to +5%)
    if (humidity > 80) {
      variation -= 0.1; // Too humid reduces yield
    } else if (humidity < 30) {
      variation -= 0.1; // Too dry air reduces yield
    } else if (humidity >= 50 && humidity <= 70) {
      variation += 0.05; // Ideal humidity slightly boosts yield
    }
    
    // Return as a factor (e.g., 1.05 means 5% increase)
    return 1 + variation;
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
      'barley': 28000,
      'pearl millet': 18000,
      'chickpea': 52000,
      'turmeric': 75000,
      'onion': 15000,
      'peanut': 48000,
      'green gram': 65000,
      'black gram': 62000,
      'sesame': 85000,
      'sunflower': 45000
    };
    
    return basePrices[crop.toLowerCase()] || 30000;
  }

  static getSoilTypeRecommendations(soilType: string): string[] {
    const recommendations: Record<string, string[]> = {
      'alluvial': ['Sugarcane', 'Rice', 'Wheat', 'Cotton', 'Maize', 'Mustard'],
      'black': ['Cotton', 'Sugarcane', 'Wheat', 'Chickpea', 'Sunflower', 'Soybeans'],
      'red': ['Groundnut', 'Pearl Millet', 'Green Gram', 'Black Gram'],
      'laterite': ['Cashew', 'Rubber', 'Tea', 'Turmeric'],
      'sandy': ['Groundnut', 'Pearl Millet', 'Potato', 'Sesame'],
      'clay': ['Rice', 'Sugarcane', 'Cotton', 'Black Gram', 'Turmeric'],
      'loamy': ['Most crops', 'Vegetables', 'Wheat', 'Soybeans', 'Onion'],
      'saline': ['Barley', 'Date palm', 'Cotton', 'Sunflower'],
      'peaty': ['Rice', 'Vegetables', 'Turmeric']
    };

    return recommendations[soilType.toLowerCase()] || ['Consider soil testing for specific recommendations'];
  }
}
