import { Metadata } from "next";
import { ApiProductRepository } from "@/infrastructure/repositories/api-product.repository";
import { GetStoreCatalogUseCase } from "@/application/use-cases/get-store-catalog.use-case";
import { HydrateStore } from "@/presentation/shared/HydrateStore";
import { CartView } from "@/presentation/organisms";

export const metadata: Metadata = {
  title: "Mi Carrito | Home Store",
  description: "Revisa tus productos seleccionados y finaliza tu compra.",
};

export default async function CartPage() {
  const productRepository = new ApiProductRepository();
  const getStoreCatalog = new GetStoreCatalogUseCase(productRepository);
  const { products, category } = await getStoreCatalog.execute();

  return (
    <>
      <HydrateStore products={products} category={category} />
      <CartView />
    </>
  );
}
