import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PredictionForm = () => {
  const [location, setLocation] = useState('');
  const [temperature, setTemperature] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Location:', location);
    console.log('Temperature:', temperature);
    // Add API call or prediction logic here
  };

  const handleBack = () => {
    navigate('/'); // Navigate back to the home page
  };

  return (
    <Container sx={{ my: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
        Prediction Form
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
        <Stack spacing={3}>
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Temperature (°C)"
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            fullWidth
            required
          />
          <Button type="submit" variant="contained" size="large">
            Predict
          </Button>
          <Button variant="outlined" size="large" onClick={handleBack}>
            Back to Home
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default PredictionForm;