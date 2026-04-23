"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Link from "next/link";
import { CartItem, useCartStore } from "@/presentation/store";
import { useRouter } from "next/navigation";

export const InvoiceView = () => {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [orderSummary, setOrderSummary] = useState({
    items: [] as CartItem[],
    total: 0,
    orderId: "",
  });
  const [isProcessed, setIsProcessed] = useState(true);

  useEffect(() => {
    if (items.length > 0) {
      const total = items.reduce(
        (acc, item) => acc + item.mainPrice.amount * item.quantity,
        0,
      );
      const generatedId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

      setOrderSummary({ items: [...items], total, orderId: generatedId });

      clearCart();
      setIsProcessed(false);
    } else {
      const timeout = setTimeout(() => {
        if (orderSummary.items.length === 0) {
          router.replace("/");
        }
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [items, clearCart, router, orderSummary.items.length]);

  if (isProcessed && orderSummary.items.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
        <Typography>No hay órdenes pendientes</Typography>
        <CircularProgress sx={{ color: '#EC6608' }} />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
        <CheckCircleOutlineIcon
          sx={{ fontSize: 60, color: "#4caf50", mb: 2 }}
        />
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          ¡Compra Exitosa!
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          Referencia: {orderSummary.orderId}
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Table size="small" sx={{ mb: 3 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Producto</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Subtotal
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderSummary.items.map((item: CartItem) => (
              <TableRow key={item.id}>
                <TableCell>
                  {item.title}{" "}
                  <Typography variant="caption" component="span">
                    x{item.quantity}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  ${(item.mainPrice.amount * item.quantity).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box sx={{ bgcolor: "action.hover", p: 2, borderRadius: 2, mb: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>Subtotal</Typography>
            <Typography>${orderSummary.total.toLocaleString()}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
            }}
          >
            <Typography variant="h6">Total Pagado</Typography>
            <Typography variant="h6" color="primary">
              ${orderSummary.total.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <Button
          component={Link}
          href="/"
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#EC6608",
            fontWeight: "bold",
            py: 1.5,
            mb: 2,
            "&:hover": { bgcolor: "#d45a07" },
          }}
        >
          Volver al Inicio
        </Button>
      </Paper>
    </Container>
  );
};
