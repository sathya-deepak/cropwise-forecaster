
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import LanguageSelector from '@/components/LanguageSelector';
import { useLanguage } from "@/contexts/LanguageContext";
import { getTranslation } from "@/utils/translations";
import { useEffect, useState } from 'react';

const Index = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = getTranslation(language);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  console.log('Rendering Index with language:', language);

  // Updated crop images array with new URLs
  const cropImages = [
    {
      url: "https://tse1.mm.bing.net/th?id=OIP.hKPPPNaoUMBjvEq3T5kGbgHaE8&pid=Api&P=0&h=180",
      name: "Rice"
    },
    {
      url: "https://tse4.mm.bing.net/th?id=OIP.6HC3fVXAo0VgIiWfvpnungHaFj&pid=Api&P=0&h=180",
      name: "Mustard"
    },
    {
      url: "https://tse1.mm.bing.net/th?id=OIP.x1aIS19eK3Es6nt52uQdjAHaFj&pid=Api&P=0&h=180",
      name: "Soyabeans"
    },
    {
      url: "https://tse3.mm.bing.net/th?id=OIP.j4L611NG8QKlpIAjIIxaZwHaD6&pid=Api&P=0&h=180",
      name: "Pearl Millet"
    },
    {
      url: "https://tse1.mm.bing.net/th?id=OIP.li-AllzXlKACze26_RVaqgHaE7&pid=Api&P=0&h=180",
      name: "Chickpea"
    },
    {
      url: "https://tse2.mm.bing.net/th?id=OIP.gFmERxiJEoUERvOvF6vxAwHaHQ&pid=Api&P=0&h=180",
      name: "Turmeric"
    },
    {
      url: "https://tse1.mm.bing.net/th?id=OIP.NeXniAJXWcfOLFBgv2NAUQHaFC&pid=Api&P=0&h=180",
      name: "Onion"
    },
    {
      url: "https://tse1.mm.bing.net/th?id=OIP.TzCjJgUvvNbE4aLQII684wHaFj&pid=Api&P=0&h=180",
      name: "Peanut"
    },
    {
      url: "https://tse1.mm.bing.net/th?id=OIP.3HIFwX9Cw-TxS0ZKpFqEDgHaE8&pid=Api&P=0&h=180",
      name: "Barley"
    },
    {
      url: "https://tse2.mm.bing.net/th?id=OIP.J3n-6gfFNijFPDZM0ZdL4gHaFr&pid=Api&P=0&h=180",
      name: "Green Gram"
    },
    {
      url: "https://tse2.mm.bing.net/th?id=OIP.FlrRFkr6R8h3h61-iu-1CgHaFr&pid=Api&P=0&h=180",
      name: "Black Gram"
    },
    {
      url: "https://tse4.mm.bing.net/th?id=OIP.wJyCVafSAZ6UbuKnqH_djgHaFb&pid=Api&P=0&h=180",
      name: "Sunflower"
    }
  ];

  // Auto rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex((prevIndex) => (prevIndex + 1) % cropImages.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [cropImages.length]);

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

        {/* Crops Carousel Section */}
        <div className="mt-16 mb-10 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <h2 className="text-3xl font-bold text-primary text-center mb-8 relative">
            <span className="inline-block relative after:content-[''] after:absolute after:w-24 after:h-1 after:bg-accent after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:mt-2 pb-3">
              Crop Varieties
            </span>
          </h2>
          
          <div className="relative overflow-hidden rounded-lg shadow-xl max-w-2xl mx-auto">
            {/* Current featured crop image and name */}
            <div className="relative aspect-video">
              <img 
                src={cropImages[activeImageIndex].url} 
                alt={cropImages[activeImageIndex].name} 
                className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white text-2xl font-bold animate-fade-in">{cropImages[activeImageIndex].name}</h3>
              </div>
            </div>
            
            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-4 pb-4">
              {cropImages.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeImageIndex ? 'bg-primary scale-125' : 'bg-gray-300'
                  }`}
                  aria-label={`View ${cropImages[index].name}`}
                />
              ))}
            </div>
          </div>
          
          {/* Grid of smaller crop images below */}
          <div className="grid grid-cols-4 gap-3 mt-8">
            {cropImages.map((crop, index) => (
              <div 
                key={index}
                className={`aspect-square rounded-lg overflow-hidden transform transition-all duration-500 hover:z-10 hover:scale-105 cursor-pointer ${
                  index === activeImageIndex ? 'ring-4 ring-primary' : ''
                }`}
                onClick={() => setActiveImageIndex(index)}
              >
                <img 
                  src={crop.url} 
                  alt={crop.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
