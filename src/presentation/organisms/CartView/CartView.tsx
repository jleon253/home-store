"use client";
import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, Stack } from "@mui/material";
import Link from "next/link";
import { useCartStore } from "@/presentation/store";
import { CartItemRow, OrderSummary } from "@/presentation/molecules";

export const CartView: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const {
    items,
    getSubtotal,
    getTotal,
    getSavings,
    updateQuantity,
    removeItem,
  } = useCartStore();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <Container sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Tu carrito está vacío
        </Typography>
        <Button
          component={Link}
          href="/"
          variant="contained"
          sx={{ bgcolor: "#EC6608", mt: 2 }}
        >
          Volver a la tienda
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{ mb: 4, fontWeight: "bold" }}
      >
        Mi Carrito
      </Typography>
      <Grid container spacing={4}>
        {/* Columna Izquierda: Productos */}
        <Grid item xs={12} md={8} component="section">
          <Stack spacing={2}>
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onIncrease={(id) => updateQuantity(id, 1)}
                onDecrease={(id) => updateQuantity(id, -1)}
                onRemove={(id) => removeItem(id)}
              />
            ))}
          </Stack>
        </Grid>

        {/* Columna Derecha: Resumen */}
        <Grid item xs={12} md={4}>
          <OrderSummary
            subtotal={getSubtotal()}
            total={getTotal()}
            savings={getSavings()}
          />
        </Grid>
      </Grid>
    </Container>
  );
};
