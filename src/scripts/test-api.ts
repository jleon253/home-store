import { GetStoreCatalogUseCase } from '@/application/use-cases/get-store-catalog.use-case';
import { ApiProductRepository } from '../infrastructure/repositories/api-product.repository';
import { ProductSortService } from '../core/services/product-sort.service';
import { SortOrder } from '@/shared/enums/product.enum';

async function runTest() {
  console.log('🚀 Iniciando prueba de consumo de endpoint...');
  const productRepository = new ApiProductRepository();
  const getStoreCatalog = new GetStoreCatalogUseCase(productRepository);

  try {
    console.log('📡 Pidiendo productos y categoría...');
    const {products, category} = await getStoreCatalog.execute();

    console.log('✅ Conexión exitosa.');
    
    console.log('\n--- VALIDACIÓN DE PRODUCTOS ---');
    console.log(`Total mapeados: ${products.length}`);
    console.log('Primer producto (Inmutable):', {
      id: products[0].id,
      title: products[0].title,
      price: products[0].mainPrice.amount,
      rating: products[0].rating // Verificar si es number
    });

    console.log('\n--- PRUEBA DE ORDENAMIENTO (DOMAIN SERVICE) ---');
    
    const cheapest = ProductSortService.sort(products, SortOrder.PRICE_ASC);
    console.log(`💰 El más barato: ${cheapest[0].title} - $${cheapest[0].mainPrice.amount}`);

    const byBrand = ProductSortService.sort(products, SortOrder.BRAND_ASC);
    console.log(`🏷️  Primera marca (A-Z): ${byBrand[0].brand}`);

    console.log('\n--- VALIDACIÓN DE CATEGORÍA ---');
    console.log('SEO Title:', category.seo.title);
    console.log('Breadcrumbs count:', category.breadcrumbs.length);

  } catch (error) {
    console.error('❌ Error en la prueba:', error);
  }
}

runTest();