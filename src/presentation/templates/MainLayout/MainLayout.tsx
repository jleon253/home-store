import React from 'react';
import { Container, Box } from '@mui/material';
import { Header } from '@/presentation/organisms/Header/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Organismo persistente */}
      <Header />
      
      {/* Área de contenido dinámico */}
      <Container 
        component="main" 
        maxWidth="lg" 
        sx={{ 
          flexGrow: 1, 
          py: { xs: 2, md: 4 }, // Padding dinámico según breakpoint
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {children}
      </Container>
      
      {/* Aquí podría ir un Footer en el futuro */}
    </Box>
  );
};