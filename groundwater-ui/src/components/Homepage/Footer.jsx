import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 4 }}>
      <Container>
        <Typography variant="body1" align="center">
          © 2023 Groundwater Predictor. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;