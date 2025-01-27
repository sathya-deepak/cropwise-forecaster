import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Predict from "@/pages/Predict";
import DetailedPredict from "@/pages/DetailedPredict";
import CropEconomics from "@/pages/CropEconomics";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/predict" element={<Predict />} />
      <Route path="/detailed-predict" element={<DetailedPredict />} />
      <Route path="/crop-economics" element={<CropEconomics />} />
    </Routes>
  );
}

export default App;