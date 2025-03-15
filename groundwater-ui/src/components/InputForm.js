import React, { useState } from 'react';
import { TextField, Button, Box, Stack } from '@mui/material';

const InputForm = () => {
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Location:', location);
    console.log('Start Date:', startDate);
    console.log('End Date:', endDate);
    // Add API call here to fetch predictions
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ my: 4 }}>
      <Stack spacing={3}>
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
        />
        <TextField
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
        />
        <Button type="submit" variant="contained" size="large">
          Generate Predictions
        </Button>
      </Stack>
    </Box>
  );
};

export default InputForm;