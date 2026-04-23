"use client";

import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
  Badge,
  Rating,
  Divider,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Product } from "@/core/entities/product.entity";
import { ViewMode } from "@/shared/enums/category.enum";

interface ProductCardProps {
  product: Product;
  viewMode: ViewMode;
  onAddToCart: (product: Product) => void;
  onViewDetails: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  viewMode,
  onAddToCart,
  onViewDetails,
}) => {
  const {
    id,
    title,
    brand,
    mainPrice,
    originalPrice,
    hasDiscount,
    images,
    rating,
    reviewsCount,
  } = product;

  const isList = viewMode === ViewMode.LIST;

  // Cálculo del porcentaje de descuento
  const discountPercentage =
    hasDiscount && originalPrice
      ? Math.round(
          ((originalPrice.amount - mainPrice.amount) / originalPrice.amount) *
            100,
        )
      : 0;

  return (
    <Card
      component="article"
      sx={{
        display: "flex",
        flexDirection: isList ? "row" : "column",
        height: "100%",
        position: "relative",
        transition: "all 0.3s ease",
        "&:hover": { boxShadow: 6 },
      }}
    >
      {/* Contenedor de Imagen + Badge de Descuento */}
      <Box
        sx={{
          position: "relative",
          width: isList ? "30%" : "100%",
          minWidth: isList ? "200px" : "auto",
          pt: isList ? 0 : "100%",
          bgcolor: "#f9f9f9",
        }}
      >
        {hasDiscount && (
          <Box sx={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}>
            <Badge
              badgeContent={`-${discountPercentage}%`}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  fontSize: "0.8rem",
                  height: 25,
                  minWidth: 45,
                  fontWeight: "bold",
                },
              }}
            />
          </Box>
        )}
        <CardMedia
          component="img"
          image={images[0]}
          alt={title}
          sx={{
            position: isList ? "static" : "absolute",
            top: 0,
            width: "100%",
            height: isList ? "100%" : "100%",
            objectFit: "contain",
            p: 2,
          }}
        />
      </Box>

      {/* Contenido de Información */}
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          p: 2,
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: "grey.600", fontWeight: "bold" }}
        >
          {brand}
        </Typography>

        <Typography
          variant="body1"
          component="h3"
          sx={{
            fontWeight: 600,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxDirection: "vertical",
            minHeight: "2.8em",
          }}
        >
          {title}
        </Typography>

        {/* Sección de Precios */}
        <Stack spacing={0.5} sx={{ my: 1 }}>
          {hasDiscount && originalPrice && (
            <Typography
              variant="caption"
              sx={{ textDecoration: "line-through", color: "grey.500" }}
            >
              {originalPrice.currency} {originalPrice.amount.toLocaleString()}
            </Typography>
          )}
          <Typography variant="h6" sx={{ color: "#EC6608", fontWeight: 800 }}>
            {mainPrice.currency} {mainPrice.amount.toLocaleString()}
          </Typography>
        </Stack>

        {/* Rating */}
        <Stack direction="row" alignItems="center" spacing={1}>
          <Rating
            value={Number(rating)}
            precision={0.5}
            size="small"
            readOnly
          />
          <Typography variant="caption" color="text.secondary">
            ({reviewsCount})
          </Typography>
        </Stack>

        {!isList && <Divider sx={{ my: 1 }} />}

        {/* Botones de Acción */}
        <Stack
          direction={isList ? "row" : "column"}
          spacing={1}
          sx={{ mt: "auto", pt: 1 }}
        >
          <Button
            variant="contained"
            fullWidth
            startIcon={<AddShoppingCartIcon />}
            onClick={() => onAddToCart(product)}
            sx={{
              bgcolor: "#EC6608",
              "&:hover": { bgcolor: "#D45A07" },
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Agregar al carrito
          </Button>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<VisibilityIcon />}
            onClick={() => onViewDetails(id)}
            sx={{
              color: "grey.700",
              borderColor: "grey.300",
              textTransform: "none",
              "&:hover": { borderColor: "grey.500", bgcolor: "grey.50" },
            }}
          >
            Ver detalles
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};
