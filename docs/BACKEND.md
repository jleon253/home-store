# Documentación de Arquitectura Técnica: Backend & Infraestructura

Esta documentación detalla la arquitectura del núcleo lógico y la capa de infraestructura para la SPA de catálogo y carrito de compras, implementada bajo principios de **Clean Architecture** y **Domain-Driven Design (DDD)**. Todo orientado a la mantenibilidad, escalabilidad y desacoplamiento de servicios externos.

---

## 1. Stack Técnico

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript 5.x (Tipado estricto)
- **Entorno de Ejecución:** Node.js (Runtime de Next.js)
- **Gestión de Datos:** Fetch API con Data Cache de Next.js
- **Pruebas:** Vitest + MSW (Estrategia definida)
- **Arquitectura:** Clean Architecture (Capas: Domain, Infrastructure, Application)
- **Estrategia de Renderizado:** Server-Side Rendering (SSR) dinámico para datos críticos de negocio.
- **Orquestación:** Use Cases (Interactors) para el desacoplamiento de la lógica de aplicación.
- **Lógica de Dominio:** Servicios de dominio puros para operaciones de computación (Sorting/Filtering).

---

## 2. Patrón Arquitectural: Clean Architecture

Se ha adoptado una estructura de **Arquitectura Limpia** dividida en capas para garantizar que las reglas de negocio sean independientes de los cambios en el API externo o el framework de UI.

### Capas Implementadas:

#### Capa de Dominio (Core)

Contiene las reglas de negocio y los contratos esenciales.

- **`src/core/entities/product.entity.ts`**: Definición del modelo de producto con tipos normalizados.
- **`src/core/entities/category.entity.ts`**: Modelo para navegación y SEO.
- **`src/core/repositories/product-repository.interface.ts`**: Interfaz de contrato para el acceso a datos.

```tsx
// Fragmento de la Interfaz del Repositorio
export interface IProductRepository {
  getProducts(): Promise<Product[]>;
  getCategoryData(): Promise<Category>;
}
```

- **`src/core/services/product-sort.service.ts`**: Servicio puro encargado de la algoritmia de ordenamiento. Utiliza inmutabilidad para prevenir efectos secundarios en el estado de la aplicación.

```tsx
static sort(products: Product[], order: SortOrder): Product[] {
  const items = [...products];
  // Switch case para NAME_ASC, BRAND_ASC, PRICE_ASC, PRICE_DESC
  return items.sort((a, b) => a.mainPrice.amount - b.mainPrice.amount);
}
```

- **`src/core/entities/product.entity.ts`**: Se actualiza la interfaz para soportar la visualización de ofertas.

```tsx
readonly mainPrice: Price;      // Precio final transaccional
readonly originalPrice?: Price; // Precio base (opcional)
readonly hasDiscount: boolean;  // Estado de oferta
```

#### Capa de Infraestructura (Adapters & API)

Implementaciones concretas de los contratos y comunicación con el exterior.

- **`src/infrastructure/api/dtos/product.dto.ts`**: Espejo exacto de la respuesta del API externo.
- **`src/infrastructure/api/dtos/response.dto.ts`**: Wrapper global de la respuesta del endpoint.
- **`src/infrastructure/adapters/product.mapper.ts`**: Lógica de transformación DTO -> Entidad.

```tsx
// Fragmento del Mapper (Tratamiento de inconsistencias)
rating: parseFloat(dto.rating) || 0,
mainPrice: this.mapPrice(this.getBestPrice(dto.prices)),
```

- **`src/infrastructure/repositories/api-product.repository.ts`**:
  - Implementación de red que consume las variables de entorno.
  - Ahora soporta inyección de política de caché dinámica.

```tsx
const fetchOptions = isDynamic
  ? { cache: "no-store" }
  : { next: { revalidate: 3600 } };
```

- **`src/infrastructure/adapters/product.mapper.ts`**: Implementación de la lógica de comparación.

```tsx
const hasDiscount = mainPrice.amount < originalPrice.amount;
return {
  // ...
  mainPrice,
  originalPrice: hasDiscount ? originalPrice : undefined,
  hasDiscount,
};
```

#### Capa de Configuración y Scripts

- **.env.local**: Configuración de variables de entorno (Base URL, Endpoints).
- **src/types/env.d.ts**: Declaración global de tipos para `process.env`.
- **src/scripts/test-api.ts**: Smoke test para validación en Node runtime.

#### Capa de Aplicación (Use Cases)

Actúa como mediadora entre la UI y la Infraestructura.

- **`src/application/use-cases/get-store-catalog.use-case.ts`**: Orquestador de la lógica para obtener el catálogo completo.
  - _Fragmento:_

```tsx
const [products, category] = await Promise.all([
  this.productRepository.getProducts(true),
  this.productRepository.getCategoryData(true),
]);
```

---

## 3. Decisiones Técnicas y Argumentación

### A. Desacoplamiento mediante el Patrón Repository

Se definió una interfaz en la capa de dominio para actuar como contrato inmutable.

- **Razón:** Permite que la aplicación sea agnóstica a la fuente de datos. Si el API de Homecenter es reemplazada, solo se requiere una nueva implementación de la interfaz sin afectar la lógica de negocio.

### B. Patrón Data Mapper para Saneamiento

El API externo presenta inconsistencias de tipos (ej. números enviados como strings).

- **Razón:** Centralizar la lógica de transformación y normalización fuera de los componentes de UI. Esto garantiza que el dominio siempre trabaje con datos limpios y predecibles (`number`, `readonly`, `enums`).

### C. Inmutabilidad en Entidades de Dominio

Todas las entidades se definieron con propiedades `readonly`.

- **Razón:** Evitar efectos secundarios (side-effects) en la gestión de estado y asegurar que la integridad del dato se mantenga desde la obtención hasta el renderizado.

### D. Estrategia de Caching en Infraestructura

Uso de `next: { revalidate }` en las peticiones de fetch.

- **Razón:** Optimizar el rendimiento en despliegues sobre Vercel mediante el uso de ISR (Incremental Static Regeneration), reduciendo la latencia y la carga sobre el proxy del API.

### E. Bypass de Caché para Datos Críticos (SSR)

Se ha implementado un flag de dinamismo en la capa de infraestructura.

- **Razón:** Los datos de stock, precio y promociones son altamente volátiles. Al utilizar `cache: 'no-store'` (o `revalidate: 0`), garantizamos que el usuario final en Vercel reciba la información más reciente del API sin depender de ciclos de revalidación estáticos.

### **F. Procesamiento de Colecciones en el Dominio**

Se ha optado por centralizar la lógica de ordenamiento en un **Domain Service** en lugar de delegarla directamente a la UI o al API.

- **Razón:** Dado que el dataset es acotado ($n=20$), el procesamiento en memoria garantiza latencia cero para el usuario. Al ubicar esta lógica en el Dominio, aseguramos que las reglas de negocio (como la jerarquía de precios para el ordenamiento) sean consistentes, testeables y reutilizables en cualquier componente.

### G. Centralización de la Lógica de Descuentos

Se ha decidido que el cálculo de la diferencia entre el precio base y el precio de oferta sea responsabilidad del **Mapper (Infraestructura)**.

- **Razón:** Garantiza que la UI sea puramente representativa. Al entregar una propiedad opcional `originalPrice` y un booleano `hasDiscount`, eliminamos la necesidad de que el frontend realice comparaciones numéricas o conozca las reglas de negocio de los tipos de precio (CMR, Internet, Normal). Si `originalPrice` es `undefined`, el sistema asume que no existe oferta, simplificando el renderizado condicional.

---

## 4. Flujo de datos

- **Request (SSR):** La capa de Aplicación y El Server Component de Next.js invoca al `GetStoreCatalogUseCase`
- **Orquestación:** El Use Case solicita datos frescos (`isDynamic: true`) al repositorio.
- **Fetch Dinámico:** `ApiProductRepository` ejecuta el fetch con `no-store`, forzando a Vercel a realizar una petición al origen en tiempo de ejecución; utilizando el endpoint configurado en `.env`.
- **Transferencia:** El API retorna un `RootResponseDTO`.
- **Transformación:** El `ProductMapper` normaliza los tipos, selecciona el mejor precio y determina mediante comparación si el producto posee un descuento activo, asignando las propiedades de precio correspondientes, ademas normaliza los datos.
- **Respuesta Unificada:** El Use Case consolida productos y categorías en un solo objeto de respuesta, reduciendo la lógica en la capa de presentación.
- **Transformación de Vista (Opcional):** La capa de aplicación o los componentes de la UI invocan al `ProductSortService` para reordenar la colección según la interacción del usuario, obteniendo un nuevo array inmutable.

---

## 5. Gestión de Infraestructura de Red

Se implementó un `ApiProductRepository` que utiliza el **Data Cache** de Next.js 14.

- **Ruta:** `src/infrastructure/repositories/api-product.repository.ts`
- **Detalle Técnico:** Se emplea el objeto `next: { revalidate }` para permitir **Incremental Static Regeneration (ISR)**, lo que reduce la carga al proxy del endpoint y mejora el tiempo de respuesta en producción (Vercel).

```tsx
private async fetchFromApi(): Promise<RootResponseDTO> {
  const response = await fetch(this.url, {
    next: { revalidate: Number(process.env.NEXT_PUBLIC_DEFAULT_CACHE_TIME) }
  });
  if (!response.ok) throw new Error('API_CONNECTION_ERROR');
  return response.json();
}
```

---

## 6. Consideraciones para Implementaciones Futuras (IA)

1. **Inyección de Dependencias:** Se recomienda usar un patrón _Provider_ o _Singleton_ para instanciar el repositorio.
2. **CORS:** Si se presentan bloqueos en el navegador, configurar `rewrites` en `next.config.js` apuntando a la base URL definida en el `.env`.
3. **Testing:** Utilizar el archivo `endpoint-example.json` como base para los estados de MSW en pruebas unitarias.
4. **Script de validación**: `src/scripts/test-api.ts` que contiene una pequeña prueba de implementación para esta arquitectura.
5. Se debe respetar la jerarquía de carpetas definida y utilizar los **Path Aliases** configurados (`@/`). Cualquier nueva funcionalidad (ej. filtrado de productos) debe nacer de una interfaz en `src/core/repositories` antes de ser implementada en la capa de infraestructura.

```json
{
  "path_aliases": {
    "@/core/*": ["src/core/*"],
    "@/infrastructure/*": ["src/infrastructure/*"],
    "@/shared/*": ["src/shared/*"]
  }
}
```

Esta estructura garantiza escalabilidad y facilidad para implementar pruebas unitarias con **Vitest**, aislando las dependencias mediante el mocking de los repositorios o el uso de MSW para los DTOs.
