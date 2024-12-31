import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-cream">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-6">Crop Prediction System</h1>
          <p className="text-xl text-gray-600 mb-8">Make data-driven decisions for your farming needs</p>
          <div className="space-x-4">
            <Button 
              onClick={() => navigate('/predict')}
              className="bg-primary hover:bg-primary-dark text-white"
            >
              Quick Prediction
            </Button>
            <Button 
              onClick={() => navigate('/detailed-predict')}
              className="bg-secondary hover:bg-secondary-dark text-white"
            >
              Detailed Analysis
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Data-Driven</h3>
            <p className="text-gray-600">Make informed decisions based on scientific data and analysis</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Comprehensive</h3>
            <p className="text-gray-600">Consider multiple factors affecting crop growth</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Easy to Use</h3>
            <p className="text-gray-600">Simple interface for quick and detailed predictions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;