"use client";

import React from "react";
import { Box, Stack, Typography, IconButton, CardMedia } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Product } from "@/core/entities";

interface CartItemRowProps {
  item: Product & { quantity: number };
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{
        p: 2,
        borderBottom: "1px solid #eee",
        alignItems: "center",
        bgcolor: "background.paper",
      }}
    >
      {/* Imagen */}
      <Box sx={{ width: 100, height: 100, flexShrink: 0 }}>
        <CardMedia
          component="img"
          image={item.images[0]}
          alt={item.title}
          sx={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Box>

      {/* Info del Producto */}
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }} noWrap>
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Marca: {item.brand}
        </Typography>
        <Typography variant="h6" sx={{ color: "#EC6608", mt: 1 }}>
          ${item.mainPrice.amount.toLocaleString()}
        </Typography>
      </Box>

      {/* Controles de Cantidad */}
      <Stack direction="row" alignItems="center" spacing={1}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ border: "1px solid #ddd", borderRadius: "25px", px: 1 }}
        >
          <IconButton
            size="small"
            onClick={() => onDecrease(item.id)}
            disabled={item.quantity <= 1}
          >
            <RemoveIcon fontSize="small" />
          </IconButton>
          <Typography
            sx={{
              mx: 1.5,
              fontWeight: "bold",
              minWidth: "20px",
              textAlign: "center",
            }}
          >
            {item.quantity}
          </Typography>
          <IconButton size="small" onClick={() => onIncrease(item.id)}>
            <AddIcon fontSize="small" />
          </IconButton>
        </Stack>

        <IconButton
          color="error"
          onClick={() => onRemove(item.id)}
          title="Eliminar"
        >
          <DeleteOutlineIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
};
