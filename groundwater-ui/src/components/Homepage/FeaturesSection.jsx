import React from 'react';
import { Box, Typography, Grid, Container, Card, CardContent } from '@mui/material';

const features = [
  {
    title: 'Spatial Forecasting',
    description: 'Predict groundwater levels across different regions using spatial data.',
  },
  {
    title: 'Temporal Forecasting',
    description: 'Analyze trends over time with advanced temporal forecasting models.',
  },
  {
    title: 'User-Friendly Interface',
    description: 'Accessible to researchers, policymakers, and the general public.',
  },
];

const FeaturesSection = () => {
  return (
    <Box id="features" sx={{ py: 8, bgcolor: 'background.paper' }}>
      <Container>
        <Typography variant="h4" component="h2" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
          Key Features
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturesSection;