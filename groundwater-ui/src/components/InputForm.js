"use client"

import { useState } from "react"
import {
  TextField,
  Button,
  Box,
  Stack,
  MenuItem,
  Grid,
  Paper,
  Typography,
  Divider,
  Chip,
  useTheme,
} from "@mui/material"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import ThermostatIcon from "@mui/icons-material/Thermostat"
import WaterIcon from "@mui/icons-material/Water"
import SendIcon from "@mui/icons-material/Send"

const locations = [
  { value: "new-york", label: "New York, NY" },
  { value: "los-angeles", label: "Los Angeles, CA" },
  { value: "chicago", label: "Chicago, IL" },
  { value: "houston", label: "Houston, TX" },
  { value: "phoenix", label: "Phoenix, AZ" },
]

const InputForm = () => {
  const theme = useTheme()
  const [formData, setFormData] = useState({
    location: "",
    startDate: "",
    endDate: "",
    temperature: "",
    rainfall: "",
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when field is updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.location) newErrors.location = "Location is required"
    if (!formData.startDate) newErrors.startDate = "Start date is required"
    if (!formData.endDate) newErrors.endDate = "End date is required"

    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.endDate = "End date must be after start date"
    }

    if (
      formData.temperature &&
      (isNaN(formData.temperature) || formData.temperature < -50 || formData.temperature > 50)
    ) {
      newErrors.temperature = "Temperature must be between -50°C and 50°C"
    }

    if (formData.rainfall && (isNaN(formData.rainfall) || formData.rainfall < 0 || formData.rainfall > 5000)) {
      newErrors.rainfall = "Rainfall must be between 0mm and 5000mm"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validate()) {
      console.log("Form data:", formData)
      // Add API call here to fetch predictions
    }
  }

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: theme.shape.borderRadius,
        background: "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,1))",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        position: "relative",
        overflow: "hidden",
        "&:before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "4px",
          background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        },
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          Enter Prediction Parameters
        </Typography>
        <Divider />
      </Box>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                select
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.location}
                helperText={errors.location}
                InputProps={{
                  startAdornment: <LocationOnIcon color="primary" sx={{ mr: 1 }} />,
                }}
              >
                {locations.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Date"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
                error={!!errors.startDate}
                helperText={errors.startDate}
                InputProps={{
                  startAdornment: <CalendarMonthIcon color="primary" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="End Date"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
                error={!!errors.endDate}
                helperText={errors.endDate}
                InputProps={{
                  startAdornment: <CalendarMonthIcon color="primary" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
          </Grid>

          <Divider>
            <Chip
              label="Environmental Factors"
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
                color: "white",
                fontWeight: "medium",
              }}
            />
          </Divider>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Average Temperature (°C)"
                type="number"
                name="temperature"
                value={formData.temperature}
                onChange={handleChange}
                fullWidth
                error={!!errors.temperature}
                helperText={errors.temperature || "Optional"}
                InputProps={{
                  startAdornment: <ThermostatIcon color="primary" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Annual Rainfall (mm)"
                type="number"
                name="rainfall"
                value={formData.rainfall}
                onChange={handleChange}
                fullWidth
                error={!!errors.rainfall}
                helperText={errors.rainfall || "Optional"}
                InputProps={{
                  startAdornment: <WaterIcon color="primary" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            size="large"
            endIcon={<SendIcon />}
            sx={{
              mt: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
              "&:hover": {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.2)",
                transform: "translateY(-2px)",
                transition: "transform 0.3s ease",
              },
            }}
          >
            Generate Predictions
          </Button>
        </Stack>
      </Box>
    </Paper>
  )
}

export default InputForm;

