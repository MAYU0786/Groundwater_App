"use client"
import { Grid, Paper, Typography, Box, Divider, Chip, useTheme } from "@mui/material"
import ChartVisualization from "../components/ChartVisualization"
import MapVisualization from "../components/MapVisualization"

const PredictionResults = ({ location, startDate, endDate, temperature, rainfall }) => {
  const theme = useTheme()

  // Format the location name for display
  const formatLocation = (locationCode) => {
    const locations = {
      "new-york": "New York, NY",
      "los-angeles": "Los Angeles, CA",
      chicago: "Chicago, IL",
      houston: "Houston, TX",
      phoenix: "Phoenix, AZ",
    }
    return locations[locationCode] || locationCode
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: theme.shape.borderRadius,
        background: "linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,1))",
        boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.1)",
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
        variant="h5"
        gutterBottom
        sx={{
          fontWeight: "bold",
          mb: 3,
          color: theme.palette.text.primary,
        }}
      >
        Groundwater Prediction Results
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Chip
          label="Prediction Parameters"
          sx={{
            mb: 2,
            background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
            color: "white",
            fontWeight: "medium",
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" color="text.secondary">
              Location
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              {formatLocation(location) || "Not specified"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" color="text.secondary">
              Time Period
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              {startDate && endDate ? `${startDate} to ${endDate}` : "Not specified"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" color="text.secondary">
              Temperature
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              {temperature ? `${temperature}°C` : "Not specified"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" color="text.secondary">
              Rainfall
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "medium" }}>
              {rainfall ? `${rainfall}mm` : "Not specified"}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mb: 4 }} />

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: 400 }}>
            <ChartVisualization />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ height: 400 }}>
            <MapVisualization />
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Chip
          label="Prediction Summary"
          sx={{
            mb: 2,
            background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.secondary.light})`,
            color: "white",
            fontWeight: "medium",
          }}
        />
        <Paper
          elevation={1}
          sx={{
            p: 3,
            borderRadius: theme.shape.borderRadius,
            background: "rgba(255, 255, 255, 0.7)",
          }}
        >
          <Typography variant="body1" paragraph>
            Based on the provided data for {formatLocation(location) || "the selected location"},
            {temperature ? ` with an average temperature of ${temperature}°C` : ""}
            {rainfall ? ` and annual rainfall of ${rainfall}mm` : ""}, our model predicts the following groundwater
            level changes:
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 2,
                  borderLeft: `4px solid ${theme.palette.primary.main}`,
                  bgcolor: "rgba(33, 150, 243, 0.05)",
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Expected Level Change
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
                  +2.3 meters
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  p: 2,
                  borderLeft: `4px solid ${theme.palette.secondary.main}`,
                  bgcolor: "rgba(0, 121, 107, 0.05)",
                }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Confidence Interval
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.secondary.main }}>
                  ±0.5 meters
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{ p: 2, borderLeft: `4px solid ${theme.palette.warning.main}`, bgcolor: "rgba(255, 152, 0, 0.05)" }}
              >
                <Typography variant="subtitle2" color="text.secondary">
                  Seasonal Variation
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.warning.main }}>
                  Moderate
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Paper>
  )
}

export default PredictionResults;

