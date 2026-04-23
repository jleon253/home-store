"use client";
import { Paper, Stack, Typography, Button, Divider } from "@mui/material";
import Link from "next/link";

interface Props {
  subtotal: number;
  total: number;
  savings: number;
}

export const OrderSummary: React.FC<Props> = ({ subtotal, total, savings }) => (
  <Paper
    variant="outlined"
    sx={{ p: 3, position: "sticky", top: 20, borderRadius: 2 }}
  >
    <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
      Resumen de la orden
    </Typography>
    <Stack spacing={2} sx={{ my: 2 }}>
      <Stack direction="row" justifyContent="space-between">
        <Typography color="text.secondary">Subtotal</Typography>
        <Typography>${subtotal.toLocaleString()}</Typography>
      </Stack>
      {savings > 0 && (
        <Stack direction="row" justifyContent="space-between">
          <Typography color="error.main">Descuento</Typography>
          <Typography color="error.main">
            -${savings.toLocaleString()}
          </Typography>
        </Stack>
      )}
      <Divider />
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Total
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#EC6608" }}>
          ${total.toLocaleString()}
        </Typography>
      </Stack>
    </Stack>
    <Button
      component={Link}
      href="/checkout/success"
      variant="contained"
      fullWidth
      size="large"
      sx={{
        bgcolor: "#EC6608",
        fontWeight: "bold",
        py: 1.5,
        mb: 2,
        "&:hover": { bgcolor: "#d45a07" },
      }}
    >
      Finalizar Compra
    </Button>
    <Button
      component={Link}
      href="/"
      variant="outlined"
      fullWidth
      color="inherit"
      sx={{ textTransform: "none" }}
    >
      Seguir comprando
    </Button>
  </Paper>
);
