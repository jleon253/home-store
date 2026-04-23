import { ApiProductRepository } from "@/infrastructure/repositories/api-product.repository";
import { GetStoreCatalogUseCase } from "@/application/use-cases/get-store-catalog.use-case";
import { InvoiceView } from '@/presentation/organisms';
import { HydrateStore } from '@/presentation/shared/HydrateStore';

export const metadata = {
  title: 'Confirmación de Compra | Store',
};

export default async function SuccessPage() {
    const productRepository = new ApiProductRepository();
    const getStoreCatalog = new GetStoreCatalogUseCase(productRepository);
    const { products, category } = await getStoreCatalog.execute();

  return (
    <main>
      <HydrateStore products={products} category={category} />
      <InvoiceView />
    </main>
  );
}