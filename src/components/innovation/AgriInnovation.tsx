
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, Sprout, TrendingUp, Coins, ExternalLink } from 'lucide-react';

interface InnovationCard {
  id: number;
  title: string;
  description: string;
  category: string;
  fundingRange: string;
  difficulty: 'easy' | 'medium' | 'hard';
  link: string;
}

const innovationIdeas: InnovationCard[] = [
  {
    id: 1,
    title: "Smart Irrigation System",
    description: "Develop automated irrigation systems that use soil moisture sensors and weather data to optimize water usage.",
    category: "AgriTech",
    fundingRange: "₹50,000 - ₹2,00,000",
    difficulty: "medium",
    link: "#"
  },
  {
    id: 2,
    title: "Organic Fertilizer Production",
    description: "Start a small-scale organic fertilizer production unit using crop residues and animal waste.",
    category: "Sustainable Farming",
    fundingRange: "₹30,000 - ₹1,00,000",
    difficulty: "easy",
    link: "#"
  },
  {
    id: 3,
    title: "Farm-to-Table Delivery App",
    description: "Build a mobile app connecting farmers directly with consumers, eliminating middlemen and increasing profits.",
    category: "Digital Platform",
    fundingRange: "₹1,00,000 - ₹5,00,000",
    difficulty: "hard",
    link: "#"
  },
  {
    id: 4,
    title: "Vertical Farming Setup",
    description: "Implement a vertical farming system in limited space to grow high-value crops throughout the year.",
    category: "Modern Farming",
    fundingRange: "₹2,00,000 - ₹10,00,000",
    difficulty: "hard",
    link: "#"
  },
  {
    id: 5,
    title: "Crop Disease Detection Tool",
    description: "Create a mobile app that uses camera photos to detect crop diseases and suggests remedies.",
    category: "AgriTech",
    fundingRange: "₹75,000 - ₹3,00,000",
    difficulty: "medium",
    link: "#"
  },
  {
    id: 6,
    title: "Value-Added Product Line",
    description: "Process your crops into value-added products like pickles, jams, or dried goods to increase profit margins.",
    category: "Food Processing",
    fundingRange: "₹25,000 - ₹1,50,000",
    difficulty: "easy",
    link: "#"
  }
];

const fundingSources = [
  {
    name: "Pradhan Mantri MUDRA Yojana",
    description: "Government loans up to ₹10 lakhs for small businesses with minimal documentation.",
    link: "https://www.mudra.org.in"
  },
  {
    name: "NABARD Schemes",
    description: "Various agriculture and rural development funding options with subsidized interest rates.",
    link: "https://www.nabard.org"
  },
  {
    name: "Startup India Seed Fund",
    description: "Financial assistance up to ₹5 crores for early-stage startups.",
    link: "https://www.startupindia.gov.in"
  },
  {
    name: "Kisan Credit Card",
    description: "Easy credit access for farmers with flexible repayment options.",
    link: "https://pmkisan.gov.in"
  }
];

const AgriInnovation = () => {
  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 border-b">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-purple-600" />
            Innovation & Entrepreneurship Opportunities
          </h3>
          <p className="text-sm text-gray-500">Explore new business ideas in agriculture</p>
        </div>
        
        <CardContent className="p-6">
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Sprout className="w-5 h-5 text-green-600" />
                <h4 className="font-medium">Why Innovate in Agriculture?</h4>
              </div>
              <ul className="text-sm space-y-2 text-gray-700">
                <li>• Higher profit margins than traditional farming</li>
                <li>• Year-round income opportunities</li>
                <li>• Government incentives and funding support</li>
                <li>• Reduced dependency on weather conditions</li>
                <li>• Access to premium markets</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-amber-600" />
                <h4 className="font-medium">Agricultural Trends</h4>
              </div>
              <ul className="text-sm space-y-2 text-gray-700">
                <li>• Precision farming and IoT integration</li>
                <li>• Organic and sustainable agriculture</li>
                <li>• Direct-to-consumer marketing channels</li>
                <li>• Climate-resilient farming techniques</li>
                <li>• Specialized and high-value crop varieties</li>
              </ul>
            </div>
          </div>
          
          <h4 className="font-medium text-lg mb-3">Agricultural Business Ideas</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {innovationIdeas.map((idea) => (
              <Card key={idea.id} className="border border-gray-200">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-md">{idea.title}</h5>
                    <Badge 
                      variant="outline" 
                      className={
                        idea.category === "AgriTech" ? "bg-blue-50 text-blue-700 border-blue-200" :
                        idea.category === "Sustainable Farming" ? "bg-green-50 text-green-700 border-green-200" :
                        idea.category === "Digital Platform" ? "bg-purple-50 text-purple-700 border-purple-200" :
                        idea.category === "Modern Farming" ? "bg-indigo-50 text-indigo-700 border-indigo-200" :
                        "bg-amber-50 text-amber-700 border-amber-200"
                      }
                    >
                      {idea.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{idea.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                      Investment: {idea.fundingRange}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={
                        idea.difficulty === "easy" ? "bg-green-50 text-green-700 border-green-200" :
                        idea.difficulty === "medium" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                        "bg-red-50 text-red-700 border-red-200"
                      }
                    >
                      {idea.difficulty === "easy" ? "Easy" : 
                       idea.difficulty === "medium" ? "Medium" : "Advanced"}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <h4 className="font-medium text-lg mb-3 flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-600" />
            Funding Opportunities
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            {fundingSources.map((source, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h5 className="font-medium mb-1">{source.name}</h5>
                <p className="text-sm text-gray-600 mb-2">{source.description}</p>
                <a 
                  href={source.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  Learn more <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h5 className="font-medium mb-2">Need personalized guidance?</h5>
            <p className="text-sm text-gray-700 mb-3">
              Our agricultural business experts can help you develop a business plan, 
              connect with investors, and navigate government schemes.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Request Consultation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgriInnovation;
