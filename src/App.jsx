import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Tokenization from './components/Tokenization';
import Segmentation from './components/Segmentation';
import Lemmatization from './components/Lemmatization';
import LLMArchitecture from './components/LLMArchitecture';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Tokenization />} />
            <Route path="/tokenization" element={<Tokenization />} />
            <Route path="/segmentation" element={<Segmentation />} />
            <Route path="/lemmatization" element={<Lemmatization />} />
            <Route path="/llm-architecture" element={<LLMArchitecture />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
