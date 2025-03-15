import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Box, CssBaseline, ThemeProvider } from "@mui/material"
import Navbar from "./components/Navbar"
import HeroSection from "./components/Homepage/HeroSection"
import FeaturesSection from "./components/Homepage/FeaturesSection"
import Footer from "./components/Homepage/Footer"
import PredictionForm from "./components/PredictionForm/PredictionForm"
import theme from "./theme"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          {/* Navbar is fixed at the top */}
          <Navbar />

          {/* Main content */}
          <Box component="main" sx={{ flexGrow: 1 }}>
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
        </Box>
      </Router>
    </ThemeProvider>
  )
}

export default App

