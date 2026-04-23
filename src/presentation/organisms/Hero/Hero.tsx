"use client";

import React from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const Hero: React.FC = () => {
  
  const handleScroll = () => {
    // Busca el elemento que inicia la grilla de productos y hace scroll suave
    const productSection = document.getElementById('product-grid');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      component="section"
      sx={{
        width: '100%',
        bgcolor: '#000000',
        color: '#FFFFFF',
        py: { xs: 8, md: 12 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={3} alignItems="center">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.75rem' },
              lineHeight: 1.2,
            }}
          >
            Todo lo que necesitas para tu hogar
          </Typography>

          <Typography
            variant="h5"
            component="p"
            sx={{
              color: 'grey.400',
              maxWidth: '600px',
              mx: 'auto',
              fontWeight: 300,
            }}
          >
            Encuentra las mejores herramientas y muebles para hacer realidad tus proyectos
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={handleScroll}
            endIcon={<KeyboardArrowDownIcon />}
            sx={{
              bgcolor: '#EC6608',
              color: '#FFFFFF',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': {
                bgcolor: '#D45A07', // Un tono más oscuro para el hover funcional
              },
            }}
          >
            Explorar productos
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};