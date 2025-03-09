
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
      </div>
    </div>
  );
};

export default Index;
