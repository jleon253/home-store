import { ApiProductRepository } from '@/infrastructure/repositories/api-product.repository';
import { GetStoreCatalogUseCase } from '@/application/use-cases/get-store-catalog.use-case';
import { HydrateStore } from '@/presentation/shared/HydrateStore';
import { Breadcrumb } from '@/presentation/molecules/Breadcrumb/Breadcrumb';
import { Hero, ProductGrid } from '@/presentation/organisms';

export default async function HomePage() {
  const productRepository = new ApiProductRepository();
  const getStoreCatalog = new GetStoreCatalogUseCase(productRepository);
  const { products, category } = await getStoreCatalog.execute();

  return (
    <>
      <HydrateStore products={products} category={category} />
      <Breadcrumb />
      <Hero />
      <section>
        <ProductGrid />
      </section>
    </>
  );
}