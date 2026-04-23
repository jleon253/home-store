import React from 'react';
import { Stack, Box, Typography } from '@mui/material';

export const Logo: React.FC = () => {
  return (
    <Stack direction="row" alignItems="center" spacing={1} sx={{ cursor: 'pointer' }}>
      <Box
        sx={{
          width: 32,
          height: 32,
          bgcolor: 'primary.main',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
          borderRadius: 1, // Recuadro
        }}
      >
        H
      </Box>
      <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
        HomeStore
      </Typography>
    </Stack>
  );
};