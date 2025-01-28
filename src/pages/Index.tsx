import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import LanguageSelector from '@/components/LanguageSelector';

const Index = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  console.log('Rendering Index with language:', currentLanguage);

  const translations = {
    en: {
      title: "Crop Prediction System",
      subtitle: "Make data-driven decisions for your farming needs",
      quickPrediction: "Quick Prediction",
      detailedAnalysis: "Detailed Analysis",
      dataDriven: "Data-Driven",
      dataDrivenDesc: "Make informed decisions based on scientific data and analysis",
      comprehensive: "Comprehensive",
      comprehensiveDesc: "Consider multiple factors affecting crop growth",
      easyToUse: "Easy to Use",
      easyToUseDesc: "Simple interface for quick and detailed predictions"
    },
    hi: {
      title: "फसल पूर्वानुमान प्रणाली",
      subtitle: "अपनी कृषि आवश्यकताओं के लिए डेटा-संचालित निर्णय लें",
      quickPrediction: "त्वरित पूर्वानुमान",
      detailedAnalysis: "विस्तृत विश्लेषण",
      dataDriven: "डेटा-संचालित",
      dataDrivenDesc: "वैज्ञानिक डेटा और विश्लेषण के आधार पर सूचित निर्णय लें",
      comprehensive: "व्यापक",
      comprehensiveDesc: "फसल विकास को प्रभावित करने वाले कई कारकों पर विचार करें",
      easyToUse: "उपयोग में आसान",
      easyToUseDesc: "त्वरित और विस्तृत पूर्वानुमान के लिए सरल इंटरफ़ेस"
    },
    te: {
      title: "పంట అంచనా వ్యవస్థ",
      subtitle: "మీ వ్యవసాయ అవసరాలకు డేటా ఆధారిత నిర్ణయాలు తీసుకోండి",
      quickPrediction: "త్వరిత అంచనా",
      detailedAnalysis: "వివరణాత్మక విశ్లేషణ",
      dataDriven: "డేటా ఆధారిత",
      dataDrivenDesc: "శాస్త్రీయ డేటా మరియు విశ్లేషణ ఆధారంగా సమాచార నిర్ణయాలు తీసుకోండి",
      comprehensive: "సమగ్రమైన",
      comprehensiveDesc: "పంట పెరుగుదలను ప్రభావితం చేసే అనేక కారకాలను పరిగణించండి",
      easyToUse: "ఉపయోగించడానికి సులభం",
      easyToUseDesc: "త్వరిత మరియు వివరణాత్మక అంచనాల కోసం సరళమైన ఇంటర్ఫేస్"
    },
    ta: {
      title: "பயிர் கணிப்பு அமைப்பு",
      subtitle: "உங்கள் விவசாய தேவைகளுக்கான தரவு சார்ந்த முடிவுகளை எடுக்கவும்",
      quickPrediction: "விரைவான கணிப்பு",
      detailedAnalysis: "விரிவான பகுப்பாய்வு",
      dataDriven: "தரவு சார்ந்த",
      dataDrivenDesc: "அறிவியல் தரவு மற்றும் பகுப்பாய்வின் அடிப்படையில் தகவலறிந்த முடிவுகளை எடுக்கவும்",
      comprehensive: "விரிவான",
      comprehensiveDesc: "பயிர் வளர்ச்சியை பாதிக்கும் பல காரணிகளை கருத்தில் கொள்ளுங்கள்",
      easyToUse: "பயன்படுத்த எளிதானது",
      easyToUseDesc: "விரைவான மற்றும் விரிவான கணிப்புகளுக்கான எளிய இடைமுகம்"
    }
  };

  // Get translation with fallback to English if language not found
  const getTranslation = () => {
    console.log('Getting translation for language:', currentLanguage);
    return translations[currentLanguage as keyof typeof translations] || translations.en;
  };

  const t = getTranslation();

  return (
    <div className="min-h-screen bg-cream relative">
      <LanguageSelector onLanguageChange={setCurrentLanguage} />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-6">{t.title}</h1>
          <p className="text-xl text-gray-600 mb-8">{t.subtitle}</p>
          <div className="space-x-4">
            <Button 
              onClick={() => navigate('/predict')}
              className="bg-primary hover:bg-primary-dark text-white"
            >
              {t.quickPrediction}
            </Button>
            <Button 
              onClick={() => navigate('/detailed-predict')}
              className="bg-secondary hover:bg-secondary-dark text-white"
            >
              {t.detailedAnalysis}
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
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