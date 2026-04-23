"use client";
import React, { useState } from 'react';
import { Stack, Typography, Rating, Button, IconButton, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Product } from '@/core/entities';

export const ProductInfoBlock = ({product} : {product: Product}) => {
  const [qty, setQty] = useState(1);

  return (
    <Stack spacing={2.5}>
      <Typography variant="overline" color="text.secondary">{product.brand}</Typography>
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{product.title}</Typography>
      <Typography variant="body2" color="text.secondary">
        {product.model || 'N/A'} | SKU: {product.id || '0000'}
      </Typography>
      
      <Stack direction="row" alignItems="center" spacing={1}>
        <Rating value={product.rating} readOnly size="small" />
        <Typography variant="caption" color="text.secondary">({product.reviewsCount || 0})</Typography>
      </Stack>

      <Box>
        {product.originalPrice && (
          <Typography variant="body1" sx={{ textDecoration: 'line-through', color: 'text.disabled' }}>
            ${product.originalPrice?.amount.toLocaleString()}
          </Typography>
        )}
        <Typography variant="h4" sx={{ color: '#EC6608', fontWeight: 'bold' }}>
          ${product.mainPrice.amount.toLocaleString()}
        </Typography>
      </Box>

      {/* Input de cantidad */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <Stack direction="row" alignItems="center" sx={{ border: '1px solid #ccc', borderRadius: 1 }}>
          <IconButton onClick={() => setQty(Math.max(1, qty - 1))} size="small"><RemoveIcon /></IconButton>
          <Typography sx={{ minWidth: 40, textAlign: 'center' }}>{qty}</Typography>
          <IconButton onClick={() => setQty(qty + 1)} size="small"><AddIcon /></IconButton>
        </Stack>
        <Button variant="contained" fullWidth sx={{ bgcolor: '#EC6608', py: 1.5 }}>
          Agregar al carrito
        </Button>
      </Stack>

      {/* Especificaciones principales */}
      <Box sx={{ bgcolor: '#f9f9f9', p: 2, borderRadius: 2 }}>
        <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold' }}>Especificaciones principales</Typography>
        <ul>
          {product.highlights.map((item) => (
            <li key={item.label}><Typography variant="caption">{item.label}: {item.value}</Typography></li>
          ))}
        </ul>
      </Box>
    </Stack>
  );
};