# Pruebas Unitarias - Componentes de Presentación

## 📋 Resumen de Implementación

Se han creado **80+ tests unitarios** para los componentes React en la carpeta `src/presentation/`, utilizando **Vitest** y **React Testing Library** siguiendo las mejores prácticas del proyecto.


# Referencias

[Quick References](/testing-frontend-references/QUICK_REFERENCE.md)
[Component Analysis](/testing-frontend-references/COMPONENT_ANALYSIS.md)
[Component Test Examples](/testing-frontend-references/COMPONENT_TEST_EXAMPLES.md)


## 🏗️ Estructura de Mocks Centralizada

Se creó una carpeta centralizada de mocks en: `src/presentation/__mocks__/`

### Archivos de Mocks:

- **`useCartStore.ts`** - Mock del store de carrito con todas sus acciones
- **`useProductStore.ts`** - Mock del store de productos
- **`next.ts`** - Mocks de módulos Next.js (Link, Router, etc.)
- **`data.ts`** - Datos mockeados reutilizables (productos, categorías)
- **`setup.ts`** - Setup global de mocks para todos los tests
- **`index.ts`** - Exportador central de todos los mocks

## 📁 Estructura de Tests por Componente

### Atoms (3 componentes - 12 tests)

```
atoms/
├── Logo/
│   ├── Logo.tsx
│   └── Logo.spec.tsx ✓
├── SearchInput/
│   ├── SearchInput.tsx
│   └── SearchInput.spec.tsx ✓
└── ThemeToggleButton/
    ├── ThemeToggleButton.tsx
    └── ThemeToggleButton.spec.tsx ✓
```

**Tests:**

- Logo: Renderización, link a home, iconografía
- SearchInput: Búsqueda, eventos, validación
- ThemeToggleButton: Renderización, accesibilidad

### Molecules (8 componentes - 52 tests)

#### Sin Store:

```
molecules/
├── BodyCarousel/
│   ├── BodyCarousel.tsx
│   └── BodyCarousel.spec.tsx ✓
├── CartItemRow/
│   ├── CartItemRow.tsx
│   └── CartItemRow.spec.tsx ✓
├── FeedbackModal/
│   ├── FeedbackModal.tsx
│   └── FeedbackModal.spec.tsx ✓
├── OrderSummary/
│   ├── OrderSummary.tsx
│   └── OrderSummary.spec.tsx ✓
└── ProductTechnicalSpecs/
    ├── ProductTechnicalSpecs.tsx
    └── ProductTechnicalSpecs.spec.tsx ✓
```

#### Con Store:

```
├── Breadcrumb/
│   ├── Breadcrumb.tsx
│   └── Breadcrumb.spec.tsx ✓
├── CartIconBadge/
│   ├── CartIconBadge.tsx
│   └── CartIconBadge.spec.tsx ✓
├── ProductCard/
│   ├── ProductCard.tsx
│   └── ProductCard.spec.tsx ✓
├── ProductGridHeader/
│   ├── ProductGridHeader.tsx
│   └── ProductGridHeader.spec.tsx ✓
└── ProductInfoBlock/
    ├── ProductInfoBlock.tsx
    └── ProductInfoBlock.spec.tsx ✓
```

### Organisms (5 componentes - 38 tests)

```
organisms/
├── CartView/
│   ├── CartView.tsx
│   └── CartView.spec.tsx ✓
├── Header/
│   ├── Header.tsx
│   └── Header.spec.tsx ✓
├── Hero/
│   ├── Hero.tsx
│   └── Hero.spec.tsx ✓
├── InvoiceView/
│   ├── InvoiceView.tsx
│   └── InvoiceView.spec.tsx ✓
├── ProductDetailView/
│   ├── ProductDetailView.tsx
│   └── ProductDetailView.spec.tsx ✓
└── ProductGrid/
    ├── ProductGrid.tsx
    └── ProductGrid.spec.tsx ✓
```

### Shared & Templates (2 componentes - 16 tests)

```
shared/
├── HydrateStore.tsx
└── HydrateStore.spec.tsx ✓

templates/
└── MainLayout/
    ├── MainLayout.tsx
    └── MainLayout.spec.tsx ✓
```

## 🧪 Tipo de Tests Implementados

### Tests Básicos

- ✓ Renderización de componentes
- ✓ Presencia de elementos en el DOM
- ✓ Atributos HTML correctos
- ✓ Visibilidad condicional

### Tests de Interacción

- ✓ Click en botones
- ✓ Cambio en inputs
- ✓ Teclado (Enter)
- ✓ Eventos personalizados

### Tests de Lógica

- ✓ Llamadas a funciones callback
- ✓ Cambios de estado
- ✓ Cálculos (descuentos, totales)
- ✓ Filtrado y mapeo de datos

### Tests de Integración

- ✓ Interacción con stores (Zustand)
- ✓ Componentes anidados
- ✓ Props y callbacks

### Tests de Accesibilidad

- ✓ ARIA labels
- ✓ Roles semánticos
- ✓ Navegación por teclado

## 🛠️ Configuración

### Actualización de vitest.config.ts

El archivo de configuración ahora incluye ambos setups:

```typescript
setupFiles: [
  './src/infrastructure/api/mocks/setup.ts',
  './src/presentation/__mocks__/setup.ts',
],
```

### Mocks Globales Disponibles

- `next/link` - Link component
- `next/router` - Pages router
- `next/navigation` - App router
- `idb-keyval` - IndexedDB

## 📊 Cobertura por Componente


| Tipo             | Componentes | Tests   | Complejidad |
| ------------------ | ------------- | --------- | ------------- |
| Atoms            | 3           | 12      | ⭐          |
| Molecules        | 8           | 52      | ⭐⭐        |
| Organisms        | 5           | 38      | ⭐⭐⭐⭐    |
| Shared/Templates | 2           | 16      | ⭐          |
| **TOTAL**        | **18**      | **118** | **Variada** |

## 🚀 Cómo Ejecutar los Tests

### Ejecutar todos los tests:

```bash
npm run test
# o
pnpm test
```

### Ejecutar tests de un archivo específico:

```bash
npm run test src/presentation/atoms/Logo/Logo.spec.tsx
```

### Ejecutar con coverage:

```bash
npm run test -- --coverage
```

### Modo watch:

```bash
npm run test -- --watch
```

## 📝 Patrones de Testing Utilizados

### 1. Setup y Cleanup

```typescript
beforeEach(() => {
  mockFunction = vi.fn();
  vi.clearAllMocks();
});
```

### 2. Mocking de Stores

```typescript
vi.mock('@/presentation/store/useCartStore', () => ({
  useCartStore: vi.fn(),
}));

(useCartStore as any).mockReturnValue({ ...mockData });
```

### 3. Testing de Interacción

```typescript
const user = userEvent.setup();
await user.click(button);
await user.type(input, 'text');
```

### 4. Assertions de Accesibilidad

```typescript
expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
expect(button).toHaveAttribute('aria-label', 'Search');
```

## ✅ Checklist de Validación

- [X] Todos los componentes tienen archivos .spec.tsx
- [X] Mocks centralizados en una carpeta
- [X] Tests de renderización básica
- [X] Tests de interacción del usuario
- [X] Tests de props y callbacks
- [X] Tests de estado condicional
- [X] Mocks de stores (Zustand)
- [X] Mocks de Next.js
- [X] Setup global configurado
- [X] Vitest y React Testing Library configurados

## 🔍 Notas Importantes

1. **Hidratación**: Los componentes que usan stores incluyen tests de hidratación para verificar que se renderizan correctamente después de montar.
2. **Mocks de Componentes**: En tests de componentes complejos, los componentes hijo se mockean para aislar la lógica.
3. **Datos de Prueba**: Se usan datos mockeados reutilizables en `__mocks__/data.ts` para mantener consistencia.
4. **Accesibilidad**: Se priorizan los selectores basados en roles accesibles (getByRole) sobre selectores CSS.
5. **Async/Await**: Se usa `waitFor` para operaciones asincrónicas y cambios de estado retardados.

## 📦 Dependencias Usadas

- `vitest` - Test runner
- `@testing-library/react` - Utilidades para testing de componentes React
- `@testing-library/user-event` - Simulación de eventos del usuario
- `@testing-library/dom` - Queries y matchers
- `jsdom` - Simulación del DOM

## 🎯 Próximos Pasos (Opcional)

1. Agregar tests de snapshot para componentes UI complejos
2. Implementar visual regression testing
3. Aumentar coverage a 80%+ en componentes críticos
4. E2E tests con Playwright/Cypress
5. Tests de performance con React Testing Library

---

**Autor**: Generado automáticamente
**Fecha**: 2024
**Framework**: React + Next.js + Vitest + React Testing Library
