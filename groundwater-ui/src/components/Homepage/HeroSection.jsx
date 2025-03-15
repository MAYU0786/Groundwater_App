import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/predict'); // Navigate to the prediction form
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url(/background.jpg)', // Reference the image in the public folder
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: 'white',
        position: 'relative',
        paddingTop: '64px', // Add padding to avoid overlap with Navbar
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
        },
      }}
    >
      <Container sx={{ position: 'relative', zIndex: 1 }}>
        <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Groundwater Level Predictor
        </Typography>
        <Typography variant="h5" component="p" gutterBottom sx={{ mb: 4 }}>
          Analyze and predict groundwater levels with ease. Empower your water resource management decisions.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={handleGetStarted} // Navigate on click
          sx={{ fontSize: '1.2rem' }}
        >
          Get Started
        </Button>
      </Container>
    </Box>
  );
};

export default HeroSection;