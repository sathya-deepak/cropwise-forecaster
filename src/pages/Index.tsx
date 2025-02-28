
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/utils/translations";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, LineChart, Calendar, Sprout, Users } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = getTranslation(language);

  console.log('Rendering Index with language:', language);

  return (
    <div className="min-h-screen bg-cream relative">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-6">{t.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{t.subtitle}</p>
          
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <Button 
                onClick={() => navigate('/predict')}
                className="bg-primary hover:bg-primary-dark text-white w-48"
              >
                {t.quickPrediction}
              </Button>
              <Button 
                onClick={() => navigate('/detailed-predict')}
                className="bg-secondary hover:bg-secondary-dark text-white w-48"
              >
                {t.detailedAnalysis}
              </Button>
            </div>
            
            <div className="mt-4 flex justify-center">
              <LanguageSelector />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center mb-12">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">{t.dataDriven}</h3>
            <p className="text-gray-600">{t.dataDrivenDesc}</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">{t.comprehensive}</h3>
            <p className="text-gray-600">{t.comprehensiveDesc}</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">{t.easyToUse}</h3>
            <p className="text-gray-600">{t.easyToUseDesc}</p>
          </div>
        </div>
        
        {/* New Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-primary mb-10">Featured Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <LineChart className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Market Price Analysis</h3>
                <p className="text-gray-600 text-sm mb-4">Track crop prices across major markets and plan your sales for maximum profit.</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-auto"
                  onClick={() => navigate('/crop-economics')}
                >
                  Explore <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Calendar className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Crop Calendar</h3>
                <p className="text-gray-600 text-sm mb-4">Personalized planting and harvesting schedules based on your location and climate.</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-auto" 
                  onClick={() => navigate('/detailed-predict')}
                >
                  Explore <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Sprout className="w-12 h-12 text-yellow-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Disease Detection</h3>
                <p className="text-gray-600 text-sm mb-4">Early identification of crop diseases and pests with treatment recommendations.</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-auto"
                  onClick={() => navigate('/predict')}
                >
                  Explore <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Users className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Farmer Community</h3>
                <p className="text-gray-600 text-sm mb-4">Connect with other farmers, share experiences, and learn best practices.</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-auto"
                  onClick={() => navigate('/predict')}
                >
                  Explore <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Seasonal Recommendations */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-8 mb-12 shadow-sm">
          <h2 className="text-2xl font-bold text-primary mb-6">Seasonal Recommendations</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Monsoon Crops</h3>
              <p className="text-sm text-gray-600 mb-3">Best crops to plant during the monsoon season based on your region.</p>
              <Button 
                className="w-full" 
                size="sm"
                variant="outline"
                onClick={() => navigate('/predict')}
              >
                Get Recommendations
              </Button>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Drought-Resistant Options</h3>
              <p className="text-sm text-gray-600 mb-3">Crops that thrive in low-water conditions for water-scarce regions.</p>
              <Button 
                className="w-full" 
                size="sm"
                variant="outline"
                onClick={() => navigate('/predict')}
              >
                View Options
              </Button>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Market Demand Forecast</h3>
              <p className="text-sm text-gray-600 mb-3">Crops predicted to have high market demand in the coming season.</p>
              <Button 
                className="w-full" 
                size="sm"
                variant="outline"
                onClick={() => navigate('/crop-economics')}
              >
                See Forecast
              </Button>
            </div>
          </div>
        </div>
        
        {/* Success Stories Teaser */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-primary mb-4">Success Stories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            See how farmers across India are using our prediction tools to increase yields and profitability.
          </p>
          <Button className="bg-primary hover:bg-primary-dark">
            Read Stories
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
