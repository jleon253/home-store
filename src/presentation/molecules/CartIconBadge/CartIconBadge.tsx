// src/presentation/molecules/CartIconBadge/CartIconBadge.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { Badge, IconButton, Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCartStore } from '@/presentation/store/useCartStore';

export const CartIconBadge: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  const itemsCount = useCartStore((state) => 
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mientras no esté montado, mostramos el icono sin el badge o un esqueleto
  if (!mounted) {
    return (
      <IconButton disabled color="inherit">
        <ShoppingCartIcon sx={{ opacity: 0.5 }} />
      </IconButton>
    );
  }

  return (
    <Tooltip title={itemsCount > 0 ? `Tienes ${itemsCount} productos` : "Carrito vacío"}>
      <IconButton aria-label={`Ver carrito con ${itemsCount} productos`} color="inherit" onClick={() => console.log('Navegar a /cart')}>
        <Badge 
          badgeContent={itemsCount} 
          color="error"
          showZero={false}
          sx={{
            '& .MuiBadge-badge': {
              backgroundColor: '#EC6608', // Coherencia con tu paleta de marca
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.75rem',
            }
          }}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};