"use client";
import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { ProductHighlight } from '@/core/entities';

interface Props { highlights: ProductHighlight[]; description?: string; }

export const ProductTechnicalSpecs: React.FC<Props> = ({ highlights, description }) => (
  <Box sx={{ mt: 4 }}>
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Descripción</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
        {description || "No hay descripción disponible para este producto."}
      </Typography>
    </Box>

    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Ficha técnica</Typography>
    <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
      <Table>
        <TableBody>
          {highlights.map((item, idx) => (
            <TableRow key={idx} sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
              <TableCell sx={{ fontWeight: 'bold', width: '40%' }}>{item.label}</TableCell>
              <TableCell>{item.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);