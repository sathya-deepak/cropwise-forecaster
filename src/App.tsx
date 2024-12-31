import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Predict from './pages/Predict';
import DetailedPredict from './pages/DetailedPredict';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/detailed-predict" element={<DetailedPredict />} />
      </Routes>
    </Router>
  );
}

export default App;