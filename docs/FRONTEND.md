# Documento de Arquitectura Front End: Clean Architecture & Modular Design

## 1. Stack Tecnológico

- **Framework:** Next.js 14+ (App Router).
- **Lenguaje:** TypeScript 5+ (Tipado estricto e inmutabilidad).
- **UI Library:** Material UI (MUI) v5+ con Emotion como motor de estilos.
- **State Management:** Zustand (Client-side state & persistence).
- **Persistence Layer:** IndexedDB (vía middleware de persistencia de Zustand).
- **Estilos:** Theme Context (Dark Mode) y CSS-in-JS.

---

## 2. Patrones de Diseño Implementados

- **Clean Architecture:** Separación clara entre capas de Dominio, Aplicación, Infraestructura y Presentación.
- **Atomic Design (Adaptado):** Organización de componentes en Moléculas y Organismos para maximizar la reutilización.
- **Repository Pattern:** Desacoplamiento de la fuente de datos (API) de la lógica de negocio.
- **Observer Pattern:** Implementado mediante Stores de Zustand para una reactividad eficiente.
- **Singleton/Static Services:** Uso de servicios de dominio para lógica pura (ej. `ProductSortService`).

---

## 3. Estructura de Directorios y Responsabilidades

### 📂 `src/core` (Capa de Dominio)

Contiene las entidades de negocio y la lógica pura.

- **`entities/product.entity.ts`**: Define la interfaz `Product` inmutable.
- **`services/product-sort.service.ts`**: Lógica de ordenamiento pura (Price, Brand).

### 📂 `src/application` (Capa de Aplicación)

Orquesta el flujo de datos sin conocer la procedencia técnica de los mismos.

- **`use-cases/get-store-catalog.use-case.ts`**: Coordina la obtención y mapeo del catálogo.

### 📂 `src/infrastructure` (Capa de Infraestructura)

Implementaciones técnicas y mapeo de datos externos.

- **`repositories/api-product.repository.ts`**: Consumo de endpoints y transformación de JSON crudo a `Product Entity`.
- **`mappers/product.mapper.ts`**: Transforma el DTO del backend al modelo de dominio.

### 📂 `src/presentation` (Capa de Presentación)

UI y gestión del estado visual.

---

## 4. Gestión de Estado y Persistencia (IndexedDB)

Se decidió el uso de **Zustand** con el middleware `persist` apuntando a **IndexedDB** para el `useCartStore`.

- **¿Por qué IndexedDB?**: A diferencia de `localStorage`, IndexedDB es asíncrono, no bloquea el hilo principal y permite almacenar volúmenes de datos mayores sin el límite de 5MB.
- **¿Para qué?**:
    1. **Persistencia de Sesión:** El carrito sobrevive a recargas de página y cierres de navegador.
    2. **Integridad de Datos:** Permite manejar estructuras de datos complejas (objetos anidados de productos) de forma eficiente.
    3. **Snapshot de Facturación:** Facilita la recuperación de datos para la generación de la factura incluso después de procesos de limpieza.

```tsx
// src/presentation/store/useCartStore.ts
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => { /* Lógica de agregación */ },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => indexedDBStorage), // Implementación personalizada
    }
  )
);
```

---

## 5. Inventario de Páginas y Componentes Críticos

### A. Páginas (App Router)

- **`src/app/product/[id]/page.tsx`**: Server Component que gestiona SEO dinámico y pre-fetching de datos.
- **`src/app/checkout/success/page.tsx`**: Página de factura con lógica de "Blindaje" (Redirección si el store está vacío).

### B. Organismos (Componentes Complejos)

- **`ProductDetailView`**: Orquestador de la PDP. Gestiona la lógica de productos similares filtrando la entidad actual.
- **`InvoiceView`**: Gestiona el snapshot de la compra y la limpieza del store post-pago.

### C. Moléculas (UI Reutilizable)

- **`BodyCarousel`**: Galería de imágenes técnica con soporte para miniaturas y navegación por flechas.
- **`ProductInfoBlock`**: Caja transaccional que gestiona el estado local de cantidad (`qty`) y la integración con el store.
- **`ProductTechnicalSpecs`**: Renderizado dinámico de tablas basado en `highlights` de la entidad.

---

## 6. Decisiones Técnicas Destacadas

### Blindaje de Navegación (Guardia de Factura)

Para evitar la visualización de facturas vacías al acceder por URL manual:

```tsx
// Lógica de blindaje en InvoiceView.tsx
useEffect(() => {
  if (items.length === 0 && !orderProcessed) {
    router.replace('/'); // Evita historial de navegación inconsistente
  }
}, [items]);
```

### Configuración de Seguridad de Imágenes

Debido al uso de un CDN externo (`media.falabella.com`), se configuró el protocolo de patrones remotos en el core de la infraestructura:

- **Archivo:** `next.config.js`
- **Configuración:** `remotePatterns` para validar protocolo HTTPS y hostname específico, mitigando riesgos de inyección de recursos externos no autorizados.