
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Predict from "@/pages/Predict";
import DetailedPredict from "@/pages/DetailedPredict";
import CropEconomics from "@/pages/CropEconomics";
import AgriBusiness from "@/pages/AgriBusiness";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Chatbot from "@/components/chat/Chatbot";

function App() {
  console.log('Rendering App component');
  
  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/detailed-predict" element={<DetailedPredict />} />
        <Route path="/crop-economics" element={<CropEconomics />} />
        <Route path="/agri-business" element={<AgriBusiness />} />
      </Routes>
      <Chatbot />
    </LanguageProvider>
  );
}

export default App;
