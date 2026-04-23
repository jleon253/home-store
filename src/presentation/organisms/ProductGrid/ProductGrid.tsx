"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { ProductSortService } from "@/core/services/product-sort.service";
import { Product } from "@/core/entities";
import {
  FeedbackModal,
  ModalType,
  ProductCard,
  ProductGridHeader,
} from "@/presentation/molecules";
import { useProductStore, useCartStore } from "@/presentation/store";
import { SortOrder, ViewMode } from "@/shared/enums";

export const ProductGrid: React.FC = () => {
  const { products, viewMode, setViewMode } = useProductStore();
  const { addItem } = useCartStore();

  const [isHydrated, setIsHydrated] = useState(false);
  const [sort, setSort] = useState<SortOrder>(SortOrder.NAME_ASC);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalConfig, setModalConfig] = useState<{
    open: boolean;
    type: ModalType;
    title: string;
    message: string;
  }>({
    open: false,
    type: ModalType.INFO,
    title: '',
    message: ''
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isHydrated && (!products || products.length === 0)) {
      setModalConfig({
        open: true,
        type: ModalType.ERROR,
        title: 'Error de Carga',
        message: 'No pudimos recuperar el catálogo de productos. Por favor, intenta recargar la página.'
      });
    }
  }, [isHydrated, products]);

  const closeModal = () => setModalConfig(prev => ({ ...prev, open: false }));

  const sortedProducts = useMemo(() => {
    return ProductSortService.sort(products, sort);
  }, [products, sort]);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    setModalConfig({
      open: true,
      type: ModalType.SUCCESS,
      title: '¡Producto añadido!',
      message: `${product.title} agregado en tu carrito.`
    });
    console.log("Agregado al carrito:", product.id);
  };

  const handleViewDetails = (id: string) => {
    console.log(`Navegando a detalle de: ${id}`);
  };

  if (sortedProducts.length === 0) {
    return (
      <Box sx={{ py: 10, textAlign: "center" }}>
        <Typography variant="h6">No se encontraron productos.</Typography>
      </Box>
    );
  }

  if (!isHydrated) return null;

  return (
    <>
      <Box id="product-grid" component="section" sx={{ py: 4 }}>
        <ProductGridHeader
          total={sortedProducts.length}
          currentSort={sort}
          onSortChange={setSort}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {sortedProducts.map((product) => (
            <Grid
              item
              key={product.id}
              xs={12}
              sm={viewMode === ViewMode.GRID ? 6 : 12}
              md={viewMode === ViewMode.GRID ? 4 : 12}
              lg={viewMode === ViewMode.GRID ? 3 : 12}
            >
              <ProductCard
                product={product}
                viewMode={viewMode}
                onAddToCart={handleAddToCart}
                onViewDetails={handleViewDetails}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <FeedbackModal
        {...modalConfig}
        onClose={closeModal}
        buttonText={modalConfig.type === ModalType.ERROR ? 'Reintentar' : 'Seguir explorando'}
      />
    </>
  );
};
