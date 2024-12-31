import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Sprout, Cloud, Thermometer, Calendar } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Calendar className="w-6 h-6 text-primary" />,
      title: "Seasonal Analysis",
      description: "Get predictions based on time of year and historical patterns"
    },
    {
      icon: <Cloud className="w-6 h-6 text-primary" />,
      title: "Weather Integration",
      description: "Factor in weather conditions for accurate predictions"
    },
    {
      icon: <Thermometer className="w-6 h-6 text-primary" />,
      title: "Temperature Tracking",
      description: "Temperature-based crop recommendations"
    },
    {
      icon: <Sprout className="w-6 h-6 text-primary" />,
      title: "Soil Analysis",
      description: "Soil type and field condition consideration"
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <div className="relative h-[600px] bg-hero-pattern bg-cover bg-center">
        <div className="absolute inset-0 bg-black/50">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-bold mb-6">Smart Crop Prediction</h1>
              <p className="text-xl mb-8">
                Make data-driven decisions for your farm using our advanced crop prediction system.
                Get accurate recommendations based on multiple environmental factors.
              </p>
              <Button 
                onClick={() => navigate('/predict')} 
                className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg flex items-center gap-2"
              >
                Try Prediction <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-16 text-primary">Our Features</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-secondary">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;