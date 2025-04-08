"use client"

import { useState } from "react"
import {
  Box,
  Typography,
  Container,
  Paper,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Alert,
  Fade,
  useTheme,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import InputForm from "../InputForm"
import PredictionResults from "../PredictionResults"

const PredictionForm = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [formData, setFormData] = useState({
    location: "",
    temperature: "",
    rainfall: "",
    startDate: "",
    endDate: "",
  })
  const navigate = useNavigate()
  const theme = useTheme()

  const handleFormSubmit = (data) => {
    setFormData(data)
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setShowResults(true)
      setActiveStep(1)
    }, 2000)
  }

  const steps = ["Enter Parameters", "View Results"]

  return (
    <Container sx={{ my: 8, pt: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          background: "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,1))",
          backdropFilter: "blur(10px)",
          position: "relative",
          overflow: "hidden",
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "5px",
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          },
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{
            fontWeight: "bold",
            mb: 4,
            color: theme.palette.text.primary,
          }}
        >
          Groundwater Level Prediction
        </Typography>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Fade in={activeStep === 0} timeout={500}>
            <Box>
              <InputForm onSubmit={handleFormSubmit} />
            </Box>
          </Fade>
        )}

        {activeStep === 1 && (
          <Fade in={activeStep === 1} timeout={500}>
            <Box>
              {loading ? (
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 4 }}>
                  <CircularProgress size={60} />
                  <Typography variant="h6" sx={{ mt: 2 }}>
                    Generating predictions...
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    This may take a few moments
                  </Typography>
                </Box>
              ) : showResults ? (
                <PredictionResults
                  location={formData.location}
                  startDate={formData.startDate}
                  endDate={formData.endDate}
                  temperature={formData.temperature}
                  rainfall={formData.rainfall}
                />
              ) : (
                <Alert severity="info">Please complete the previous step to view results.</Alert>
              )}
            </Box>
          </Fade>
        )}
      </Paper>
    </Container>
  )
}

export default PredictionForm;

