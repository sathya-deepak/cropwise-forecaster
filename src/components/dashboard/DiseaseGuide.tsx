
import React from 'react';
import { Card } from "@/components/ui/card";
import { AlertTriangle } from 'lucide-react';

interface Disease {
  name: string;
  symptoms: string[];
  treatment: string;
  preventiveMeasures: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

const DiseaseGuide = ({ cropName }: { cropName: string }) => {
  const getDiseaseData = (crop: string): Disease[] => {
    const diseases: Record<string, Disease[]> = {
      'rice': [
        {
          name: 'Blast Disease',
          symptoms: ['Diamond-shaped lesions', 'White to gray center spots', 'Brown borders'],
          treatment: 'Apply fungicides containing tricyclazole or isoprothiolane',
          preventiveMeasures: ['Use resistant varieties', 'Maintain proper spacing', 'Balance nitrogen use'],
          riskLevel: 'high'
        },
        {
          name: 'Bacterial Blight',
          symptoms: ['Yellow to white lesions', 'Wilting', 'Leaf curling'],
          treatment: 'Use copper-based bactericides',
          preventiveMeasures: ['Crop rotation', 'Field sanitation', 'Balanced fertilization'],
          riskLevel: 'medium'
        }
      ],
      'wheat': [
        {
          name: 'Rust Disease',
          symptoms: ['Orange-brown pustules', 'Yellowing leaves', 'Reduced grain quality'],
          treatment: 'Apply fungicides with propiconazole',
          preventiveMeasures: ['Plant resistant varieties', 'Early sowing', 'Monitor regularly'],
          riskLevel: 'high'
        },
        {
          name: 'Powdery Mildew',
          symptoms: ['White powdery patches', 'Stunted growth', 'Reduced yield'],
          treatment: 'Use sulfur-based fungicides',
          preventiveMeasures: ['Proper spacing', 'Good air circulation', 'Resistant varieties'],
          riskLevel: 'medium'
        }
      ],
      'cotton': [
        {
          name: 'Cotton Wilt',
          symptoms: ['Yellowing leaves', 'Wilting', 'Brown vascular tissue'],
          treatment: 'Soil solarization and fungicides',
          preventiveMeasures: ['Resistant varieties', 'Crop rotation', 'Field sanitation'],
          riskLevel: 'high'
        },
        {
          name: 'Boll Rot',
          symptoms: ['Discolored bolls', 'Wet lesions', 'Reduced fiber quality'],
          treatment: 'Apply copper-based fungicides',
          preventiveMeasures: ['Proper spacing', 'Weed control', 'Balanced irrigation'],
          riskLevel: 'medium'
        }
      ],
      'groundnut': [
        {
          name: 'Early Leaf Spot',
          symptoms: ['Brown circular spots', 'Yellowing leaves', 'Defoliation'],
          treatment: 'Apply chlorothalonil fungicides',
          preventiveMeasures: ['Crop rotation', 'Resistant varieties', 'Proper spacing'],
          riskLevel: 'high'
        },
        {
          name: 'Collar Rot',
          symptoms: ['Rotting at soil level', 'Wilting', 'Plant death'],
          treatment: 'Seed treatment with thiram',
          preventiveMeasures: ['Good drainage', 'Proper seed depth', 'Field sanitation'],
          riskLevel: 'medium'
        }
      ],
      'sugarcane': [
        {
          name: 'Red Rot',
          symptoms: ['Red internal tissue', 'Wilting', 'Dried leaves'],
          treatment: 'Hot water treatment of setts',
          preventiveMeasures: ['Disease-free setts', 'Resistant varieties', 'Field sanitation'],
          riskLevel: 'high'
        },
        {
          name: 'Smut',
          symptoms: ['Black whip-like structures', 'Stunted growth', 'Thin stalks'],
          treatment: 'Remove infected plants',
          preventiveMeasures: ['Clean planting material', 'Resistant varieties', 'Crop rotation'],
          riskLevel: 'medium'
        }
      ],
      'maize': [
        {
          name: 'Northern Corn Leaf Blight',
          symptoms: ['Long elliptical lesions', 'Gray-green spots', 'Lower leaf death'],
          treatment: 'Foliar fungicides application',
          preventiveMeasures: ['Resistant hybrids', 'Crop rotation', 'Residue management'],
          riskLevel: 'high'
        },
        {
          name: 'Common Rust',
          symptoms: ['Reddish-brown pustules', 'Chlorosis', 'Reduced yield'],
          treatment: 'Apply fungicides early',
          preventiveMeasures: ['Early planting', 'Resistant varieties', 'Regular monitoring'],
          riskLevel: 'medium'
        }
      ],
      'soybean': [
        {
          name: 'Asian Rust',
          symptoms: ['Small brown lesions', 'Yellow leaves', 'Early defoliation'],
          treatment: 'Preventive fungicide application',
          preventiveMeasures: ['Early planting', 'Resistant varieties', 'Monitoring'],
          riskLevel: 'high'
        },
        {
          name: 'Bacterial Blight',
          symptoms: ['Angular leaf spots', 'Yellow halos', 'Leaf shredding'],
          treatment: 'Copper-based bactericides',
          preventiveMeasures: ['Disease-free seeds', 'Crop rotation', 'Field sanitation'],
          riskLevel: 'medium'
        }
      ],
      'barley': [
        {
          name: 'Net Blotch',
          symptoms: ['Net-like brown patterns', 'Leaf necrosis', 'Reduced yield'],
          treatment: 'Apply systemic fungicides',
          preventiveMeasures: ['Resistant varieties', 'Crop rotation', 'Clean seed'],
          riskLevel: 'high'
        },
        {
          name: 'Scald',
          symptoms: ['Oval lesions', 'Water-soaked spots', 'Leaf death'],
          treatment: 'Fungicide application',
          preventiveMeasures: ['Resistant varieties', 'Crop rotation', 'Field sanitation'],
          riskLevel: 'medium'
        }
      ]
    };

    const normalizedCrop = crop.toLowerCase();
    return diseases[normalizedCrop] || [
      {
        name: 'Common Fungal Infection',
        symptoms: ['Leaf spots', 'Wilting', 'Discoloration'],
        treatment: 'Apply appropriate fungicide',
        preventiveMeasures: ['Proper spacing', 'Good air circulation', 'Clean tools'],
        riskLevel: 'medium'
      }
    ];
  };

  const diseases = getDiseaseData(cropName);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-yellow-600 bg-yellow-50';
      case 'low':
        return 'text-green-600 bg-green-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Disease Identification Guide</h3>
      <div className="space-y-4">
        {diseases.map((disease, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-medium text-lg">{disease.name}</h4>
              <span className={`px-3 py-1 rounded-full text-sm ${getRiskColor(disease.riskLevel)}`}>
                {disease.riskLevel} risk
              </span>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-1">Symptoms:</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {disease.symptoms.map((symptom, idx) => (
                    <li key={idx}>{symptom}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Treatment:</p>
                <p className="text-sm text-gray-600">{disease.treatment}</p>
              </div>
              <div>
                <p className="text-sm font-medium mb-1">Prevention:</p>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {disease.preventiveMeasures.map((measure, idx) => (
                    <li key={idx}>{measure}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DiseaseGuide;
