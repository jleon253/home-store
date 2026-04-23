"use client";
import React, { useState } from "react";
import {
  Stack,
  Typography,
  Rating,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import { Product } from "@/core/entities";
import { useCartStore } from "@/presentation/store";
import { FeedbackModal, ModalType } from '@/presentation/molecules';

export const ProductInfoBlock = ({ product }: { product: Product }) => {
  const [qty, setQty] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleIncrease = () => setQty((prev) => prev + 1);
  const handleDecrease = () => setQty((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem(product);
      setIsModalOpen(true);
    }
  };

  return (
    <Stack spacing={2.5}>
      <Typography variant="overline" color="text.secondary">
        {product.brand}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        {product.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {product.model || "N/A"} | SKU: {product.id || "0000"}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={1}>
        <Rating value={product.rating} readOnly size="small" />
        <Typography variant="caption" color="text.secondary">
          ({product.reviewsCount || 0})
        </Typography>
      </Stack>

      <Box>
        {product.originalPrice && (
          <Typography
            variant="body1"
            sx={{ textDecoration: "line-through", color: "text.disabled" }}
          >
            ${product.originalPrice?.amount.toLocaleString()}
          </Typography>
        )}
        <Typography variant="h4" sx={{ color: "#EC6608", fontWeight: "bold" }}>
          ${product.mainPrice.amount.toLocaleString()}
        </Typography>
      </Box>

      {/* Input de cantidad */}
      <Stack direction="row" alignItems="center" spacing={2}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ border: "1px solid #ccc", borderRadius: 1 }}
        >
          <IconButton onClick={handleDecrease} size="small">
            <RemoveIcon />
          </IconButton>
          <Typography sx={{ minWidth: 40, textAlign: "center" }}>
            {qty}
          </Typography>
          <IconButton onClick={handleIncrease} size="small">
            <AddIcon />
          </IconButton>
        </Stack>
        <Button
          variant="contained"
          fullWidth
          onClick={handleAddToCart}
          sx={{
            bgcolor: "#EC6608",
            height: "48px",
            fontWeight: "bold",
            "&:hover": { bgcolor: "#d45a07" },
          }}
        >
          Agregar al carrito
        </Button>
      </Stack>

      {/* Especificaciones principales */}
      <Box sx={{ bgcolor: "#f9f9f9", p: 2, borderRadius: 2 }}>
        <Typography
          variant="subtitle2"
          gutterBottom
          sx={{ fontWeight: "bold" }}
        >
          Especificaciones principales
        </Typography>
        <ul>
          {product.highlights.map((item) => (
            <li key={item.label}>
              <Typography variant="caption">
                {item.label}: {item.value}
              </Typography>
            </li>
          ))}
        </ul>
      </Box>

      <FeedbackModal
        buttonText="Seguir comprando"
        message={`Has agregado ${qty} unidad(es) de "${product.title}" al carrito .`}
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
        title="¡Producto añadido!"
        type={ModalType.SUCCESS}
      />
    </Stack>
  );
};
