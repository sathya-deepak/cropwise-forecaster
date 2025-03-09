
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/utils/translations";

const Index = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = getTranslation(language);

  console.log('Rendering Index with language:', language);

  return (
    <div className="min-h-screen bg-cream relative">
      <div className="container mx-auto px-4 py-10">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-primary mb-6">{t.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{t.subtitle}</p>
          
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <Button 
                onClick={() => navigate('/predict')}
                className="bg-primary hover:bg-primary-dark text-white w-48 hover-scale"
              >
                {t.quickPrediction}
              </Button>
              <Button 
                onClick={() => navigate('/detailed-predict')}
                className="bg-secondary hover:bg-secondary-dark text-white w-48 hover-scale"
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
          <div className="p-6 bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">{t.dataDriven}</h3>
            <p className="text-gray-600">{t.dataDrivenDesc}</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">{t.comprehensive}</h3>
            <p className="text-gray-600">{t.comprehensiveDesc}</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <h3 className="text-xl font-semibold mb-4">{t.easyToUse}</h3>
            <p className="text-gray-600">{t.easyToUseDesc}</p>
          </div>
        </div>

        {/* Advertisement Boxes */}
        <div className="grid md:grid-cols-2 gap-8 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <div className="bg-accent rounded-lg p-6 shadow-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-accent-light to-accent opacity-40"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-primary mb-3">Farming Equipment Sale</h3>
              <p className="text-gray-800 mb-4">Get up to 30% off on premium farming equipment. Limited time offer!</p>
              <Button className="bg-primary hover:bg-primary-dark text-white hover-scale">
                Shop Now
              </Button>
            </div>
          </div>
          <div className="bg-primary-light rounded-lg p-6 shadow-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-light opacity-20"></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-3">Agricultural Workshops</h3>
              <p className="text-gray-100 mb-4">Join our expert-led workshops on sustainable farming practices.</p>
              <Button className="bg-white text-primary hover:bg-gray-100 hover-scale">
                Register Now
              </Button>
            </div>
          </div>
        </div>

        {/* Crops Collage Section */}
        <div className="mt-16 mb-10 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <h2 className="text-3xl font-bold text-primary text-center mb-8 relative">
            <span className="inline-block relative after:content-[''] after:absolute after:w-24 after:h-1 after:bg-accent after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:mt-2 pb-3">
              Crop Varieties
            </span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="aspect-square rounded-lg overflow-hidden transform transition-all duration-500 hover:z-10 hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1474440692490-2e83ae13ba29?auto=format&fit=crop&w=500&h=500&q=80" 
                alt="Wheat field" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden transform transition-all duration-500 hover:z-10 hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1530649298728-95bde48943e4?auto=format&fit=crop&w=500&h=500&q=80" 
                alt="Rice paddy" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden transform transition-all duration-500 hover:z-10 hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?auto=format&fit=crop&w=500&h=500&q=80" 
                alt="Cotton plants" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden transform transition-all duration-500 hover:z-10 hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1471194402529-8e0f5a675de6?auto=format&fit=crop&w=500&h=500&q=80" 
                alt="Corn field" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden transform transition-all duration-500 hover:z-10 hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1504826023243-27caa3e4f9ab?auto=format&fit=crop&w=500&h=500&q=80" 
                alt="Sunflower field" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden transform transition-all duration-500 hover:z-10 hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1568568544477-c47549d3228e?auto=format&fit=crop&w=500&h=500&q=80" 
                alt="Chili peppers" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden transform transition-all duration-500 hover:z-10 hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1502741126161-b048400d085d?auto=format&fit=crop&w=500&h=500&q=80" 
                alt="Soybean field" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden transform transition-all duration-500 hover:z-10 hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1596450514735-111a2e7097cd?auto=format&fit=crop&w=500&h=500&q=80" 
                alt="Sugarcane field" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
