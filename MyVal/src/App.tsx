import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import React from 'react'
import Val2024 from './components/Val2024/Val2024';
import Val2025 from './components/Val2025/Val2025';
import Val2026 from './components/Val2026/Val2026';
import Val2026Surprise from './components/Val2026/Val2026Surprise';
import Val2026BeMyValentine from './components/Val2026/Val2026BeMyValentine';
import HeroPage from './components/HeroPage';
import Val2026Timeline from './components/Val2026/Val2026Timeline';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/val2024" element={<Val2024 />} />
          <Route path="/val2025" element={<Val2025 />} />
          <Route path="/val2026" element={<Val2026 />} />
          <Route path="/val2026/surprise" element={<Val2026Surprise />} />
          <Route path="/val2026/be-my-valentine" element={<Val2026BeMyValentine />} />
          <Route path="/val2026/2026-timeline" element={<Val2026Timeline />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
