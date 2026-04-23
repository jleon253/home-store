"use client";

import React, { useCallback } from 'react';
import { AppBar, Toolbar, Stack, Box, useTheme, useMediaQuery } from '@mui/material';
import { Logo, SearchInput, ThemeToggleButton} from '@/presentation/atoms';
import { CartIconBadge } from '@/presentation/molecules';

export const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSearch = useCallback((term: string) => {
    console.log('Buscando:', term);
    // Aquí se integrará con el Caso de Uso del Backend posteriormente
  }, []);

  return (
    <AppBar position="sticky" color="default" elevation={1} component="header">
      <Toolbar>
        <Stack
          direction="column"
          spacing={2}
          sx={{ width: '100%', py: isMobile ? 2 : 1 }}
        >
          {/* Renglón 1 (Desktop y Mobile) */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Logo />
            
            {/* En Desktop el buscador va en el medio */}
            {!isMobile && (
              <Box sx={{ flexGrow: 1, mx: 4 }}>
                <SearchInput onSearch={handleSearch} />
              </Box>
            )}

            <Stack direction="row" spacing={1} alignItems="center">
              <CartIconBadge />
              <ThemeToggleButton />
            </Stack>
          </Stack>

          {/* Renglón 2 (Solo Mobile) */}
          {isMobile && (
            <Box sx={{ width: '100%' }}>
              <SearchInput onSearch={handleSearch} />
            </Box>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};