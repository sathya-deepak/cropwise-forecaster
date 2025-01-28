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
    es: {
      title: "Sistema de Predicción de Cultivos",
      subtitle: "Tome decisiones basadas en datos para sus necesidades agrícolas",
      quickPrediction: "Predicción Rápida",
      detailedAnalysis: "Análisis Detallado",
      dataDriven: "Basado en Datos",
      dataDrivenDesc: "Tome decisiones informadas basadas en datos y análisis científicos",
      comprehensive: "Integral",
      comprehensiveDesc: "Considere múltiples factores que afectan el crecimiento de los cultivos",
      easyToUse: "Fácil de Usar",
      easyToUseDesc: "Interfaz simple para predicciones rápidas y detalladas"
    },
    fr: {
      title: "Système de Prédiction des Cultures",
      subtitle: "Prenez des décisions basées sur les données pour vos besoins agricoles",
      quickPrediction: "Prédiction Rapide",
      detailedAnalysis: "Analyse Détaillée",
      dataDriven: "Basé sur les Données",
      dataDrivenDesc: "Prenez des décisions éclairées basées sur des données et analyses scientifiques",
      comprehensive: "Complet",
      comprehensiveDesc: "Prenez en compte de multiples facteurs affectant la croissance des cultures",
      easyToUse: "Facile à Utiliser",
      easyToUseDesc: "Interface simple pour des prédictions rapides et détaillées"
    },
    de: {
      title: "Ernte-Vorhersagesystem",
      subtitle: "Treffen Sie datengesteuerte Entscheidungen für Ihre landwirtschaftlichen Bedürfnisse",
      quickPrediction: "Schnelle Vorhersage",
      detailedAnalysis: "Detaillierte Analyse",
      dataDriven: "Datengesteuert",
      dataDrivenDesc: "Treffen Sie fundierte Entscheidungen basierend auf wissenschaftlichen Daten",
      comprehensive: "Umfassend",
      comprehensiveDesc: "Berücksichtigen Sie mehrere Faktoren, die das Pflanzenwachstum beeinflussen",
      easyToUse: "Einfach zu Bedienen",
      easyToUseDesc: "Einfache Benutzeroberfläche für schnelle und detaillierte Vorhersagen"
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
    }
  };

  const t = translations[currentLanguage as keyof typeof translations];

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