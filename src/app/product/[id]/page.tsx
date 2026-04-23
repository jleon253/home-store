import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ApiProductRepository } from '@/infrastructure/repositories/api-product.repository';
import { GetStoreCatalogUseCase } from '@/application/use-cases/get-store-catalog.use-case';
import { ProductDetailView } from '@/presentation/organisms/ProductDetailView/ProductDetailView';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const repository = new ApiProductRepository();
  const useCase = new GetStoreCatalogUseCase(repository);
  
  const { products } = await useCase.execute();
  const product = products.find((p) => p.id === params.id);

  if (!product) return { title: 'Producto no encontrado' };

  return {
    title: `${product.title} | ${product.brand} | Store`,
    description: `Compra ${product.title}. ${product.highlights.map(h => h.value).join(', ')}`,
  };
}

export default async function ProductPage({ params }: Props) {
  const repository = new ApiProductRepository();
  const useCase = new GetStoreCatalogUseCase(repository);

  const { products } = await useCase.execute();
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <ProductDetailView 
        product={product} 
        allProducts={products} 
      />
    </main>
  );
}