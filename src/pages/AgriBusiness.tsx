
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Lightbulb, Sprout, Landmark, Target, TrendingUp } from 'lucide-react';
import AgriInnovation from '@/components/innovation/AgriInnovation';
import EntrepreneurshipResources from '@/components/innovation/EntrepreneurshipResources';
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/utils/translations";

interface SuccessStory {
  name: string;
  location: string;
  enterprise: string;
  story: string;
  achievement: string;
  image: string;
}

const successStories: SuccessStory[] = [
  {
    name: "Rajesh Kumar",
    location: "Punjab",
    enterprise: "Vertical Hydroponic Farming",
    story: "Started with a small 500 sq ft plot, Rajesh now runs a successful vertical hydroponic farm producing premium lettuce and herbs for high-end restaurants.",
    achievement: "10x yield compared to traditional farming with 90% less water usage",
    image: "/placeholder.svg"
  },
  {
    name: "Anita Sharma",
    location: "Maharashtra",
    enterprise: "Organic Fertilizer Production",
    story: "Anita transformed agricultural waste from neighboring farms into premium organic fertilizers, creating both environmental and economic value.",
    achievement: "Built a ₹50 lakh annual business from an initial investment of ₹2 lakhs",
    image: "/placeholder.svg"
  },
  {
    name: "Mohammed Ismail",
    location: "Karnataka",
    enterprise: "Farm-to-Door Delivery App",
    story: "Developed a mobile app that connects local farmers directly with urban consumers, eliminating middlemen and ensuring better prices for farmers.",
    achievement: "Connected over 200 farmers with 5000+ urban customers within 2 years",
    image: "/placeholder.svg"
  }
];

const AgriBusiness = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = getTranslation(language);

  return (
    <div className="min-h-screen bg-cream p-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/')}
        className="mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
      </Button>

      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-primary mb-2">Agricultural Innovation & Entrepreneurship</h1>
        <p className="text-xl text-gray-600 mb-8">Transform your farming knowledge into profitable business ventures</p>
        
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border-emerald-200">
            <CardContent className="p-6">
              <Sprout className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Why Agricultural Entrepreneurship?</h3>
              <p className="text-gray-700">
                Agriculture offers unique opportunities for innovation and sustainable business creation. 
                Diversify income streams and build resilience against traditional farming challenges.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-indigo-200">
            <CardContent className="p-6">
              <Target className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Market Opportunities</h3>
              <p className="text-gray-700">
                Growing demand for organic produce, sustainable farming, technology integration, 
                and value-added agricultural products creates diverse business opportunities.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-50 to-violet-100 border-violet-200">
            <CardContent className="p-6">
              <Landmark className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Government Support</h3>
              <p className="text-gray-700">
                Various schemes support agricultural startups with subsidies, loans, and technical assistance.
                Platforms like Startup India provide additional resources for agri-entrepreneurs.
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            Success Stories
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <Card key={index} className="overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.name} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{story.name}</h3>
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>{story.location}</span>
                    <span className="font-medium text-primary">{story.enterprise}</span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{story.story}</p>
                  <div className="bg-green-50 p-2 rounded-lg text-sm text-green-800">
                    <strong>Achievement:</strong> {story.achievement}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="mb-10">
          <AgriInnovation />
        </div>
        
        <div className="mb-10">
          <EntrepreneurshipResources />
        </div>
        
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-amber-500" />
              Ready to Start Your Agricultural Business?
            </h2>
            <p className="text-gray-700">
              Our experts can help you evaluate ideas, create business plans, and connect with funding sources.
            </p>
          </div>
          <Button size="lg" className="bg-primary hover:bg-primary-dark">
            Schedule a Consultation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AgriBusiness;
