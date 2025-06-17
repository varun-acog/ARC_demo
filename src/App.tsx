import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DocumentProvider } from './contexts/DocumentContext';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import GenerateDocument from './pages/GenerateDocument';
import ReviewContract from './pages/ReviewContract';
import CompareContract from './pages/CompareContract';

function App() {
  return (
    <DocumentProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/generate" element={<GenerateDocument />} />
            <Route path="/review" element={<ReviewContract />} />
            <Route path="/compare" element={<CompareContract />} />
          </Routes>
        </div>
      </Router>
    </DocumentProvider>
  );
}

export default App;