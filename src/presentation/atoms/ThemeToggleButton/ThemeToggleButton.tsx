"use client";

import React from 'react';
import { IconButton } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/Brightness3';

export const ThemeToggleButton: React.FC = () => {
  return (
    <IconButton aria-label="cambiar modo oscuro">
      <DarkModeIcon />
    </IconButton>
  );
};