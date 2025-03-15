import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material'; // Import Box for padding
import Navbar from './components/Navbar';
import HeroSection from './components/Homepage/HeroSection';
import FeaturesSection from './components/Homepage/FeaturesSection';
import Footer from './components/Homepage/Footer';
import PredictionForm from './components/PredictionForm/PredictionForm';

function App() {
  return (
    <Router>
      <div>
        {/* Navbar is fixed at the top */}
        <Navbar />

        {/* Add padding to the main content to avoid overlap with the Navbar */}
        <Box sx={{ paddingTop: '64px' }}>
          <Routes>
            {/* Home Page Route */}
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <FeaturesSection />
                </>
              }
            />
            {/* Prediction Form Route */}
            <Route path="/predict" element={<PredictionForm />} />
          </Routes>
        </Box>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;