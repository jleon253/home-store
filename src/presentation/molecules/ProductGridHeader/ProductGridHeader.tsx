"use client";

import React from 'react';
import { Stack, Typography, Select, MenuItem, IconButton, Box, FormControl, InputLabel } from '@mui/material';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import { SortOrder } from '@/shared/enums/product.enum';
import { ViewMode } from '@/shared/enums/category.enum';
import { useProductStore } from '@/presentation/store/useProductStore';

interface Props {
  total: number;
  currentSort: SortOrder;
  onSortChange: (sort: SortOrder) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export const ProductGridHeader: React.FC<Props> = ({ 
  total, currentSort, onSortChange, viewMode, onViewModeChange 
}) => {
  const { category } = useProductStore();

  return (
    <Stack 
      direction={{ xs: 'column', sm: 'row' }} 
      justifyContent="space-between" 
      alignItems="center" 
      spacing={2} 
      sx={{ mb: 3, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}
      component="header"
    >
      <Box>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
          {category ? category.name : 'Catálogo de Productos'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {total} productos
        </Typography>
      </Box>

      <Stack direction="row" alignItems="center" spacing={2}>
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Ordenar por</InputLabel>
          <Select
            value={currentSort}
            label="Ordenar por"
            onChange={(e) => onSortChange(e.target.value as SortOrder)}
          >
            <MenuItem value={SortOrder.NAME_ASC}>Nombre (A-Z)</MenuItem>
            <MenuItem value={SortOrder.BRAND_ASC}>Marca (A-Z)</MenuItem>
            <MenuItem value={SortOrder.PRICE_ASC}>Precio: Menor a Mayor</MenuItem>
            <MenuItem value={SortOrder.PRICE_DESC}>Precio: Mayor a Menor</MenuItem>
          </Select>
        </FormControl>

        <Stack direction="row" spacing={1}>
          <IconButton 
            color={viewMode === ViewMode.GRID ? 'primary' : 'default'}
            onClick={() => onViewModeChange(ViewMode.GRID)}
          >
            <GridViewIcon />
          </IconButton>
          <IconButton 
            color={viewMode === ViewMode.LIST ? 'primary' : 'default'}
            onClick={() => onViewModeChange(ViewMode.LIST)}
          >
            <ViewListIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};