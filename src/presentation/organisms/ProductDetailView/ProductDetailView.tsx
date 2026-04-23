"use client";

import React, { useMemo } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Breadcrumbs,
  Link,
} from "@mui/material";

import { Product } from "@/core/entities/product.entity";
import { ViewMode } from "@/shared/enums/category.enum";

import {
  BodyCarousel,
  ProductInfoBlock,
  ProductTechnicalSpecs,
  ProductCard,
} from "../../molecules";

interface Props {
  product: Product;
  allProducts: Product[];
}

export const ProductDetailView: React.FC<Props> = ({
  product,
  allProducts,
}) => {
  const similarProducts = useMemo(() => {
    return allProducts
      .filter((p) => p.id !== product.id && p.brand === product.brand)
      .slice(0, 4);
  }, [product, allProducts]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link href="/" underline="hover" color="inherit">
          Inicio
        </Link>
        <Typography color="text.primary">{product.title}</Typography>
      </Breadcrumbs>

      <Grid container spacing={6}>
        <Grid item xs={12} md={7}>
          <BodyCarousel images={product.images} />
        </Grid>

        <Grid item xs={12} md={5}>
          <ProductInfoBlock product={product} />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <ProductTechnicalSpecs
          highlights={product.highlights}
        />
      </Box>

      {similarProducts.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4 }}>
            Productos similares
          </Typography>
          <Grid container spacing={3}>
            {similarProducts.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <ProductCard
                  product={item}
                  viewMode={ViewMode.GRID}
                  onAddToCart={() => {}}
                  onViewDetails={() => {}}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};
