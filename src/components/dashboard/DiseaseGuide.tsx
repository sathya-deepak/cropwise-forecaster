
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
      'default': [
        {
          name: 'Common Fungal Infection',
          symptoms: ['Leaf spots', 'Wilting', 'Discoloration'],
          treatment: 'Apply appropriate fungicide',
          preventiveMeasures: ['Proper spacing', 'Good air circulation', 'Clean tools'],
          riskLevel: 'medium'
        }
      ]
    };

    return diseases[crop.toLowerCase()] || diseases.default;
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
