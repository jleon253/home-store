"use client";

import React, { useState, useCallback } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchInputProps {
  onSearch: (term: string) => void;
  placeholder?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({ onSearch, placeholder = '' }) => {
  const [value, setValue] = useState('');

  const handleTrigger = useCallback(() => {
    onSearch(value.trim());
  }, [onSearch, value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleTrigger();
  };

  return (
    <TextField
      fullWidth
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleTrigger} edge="end" aria-label="buscar">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};