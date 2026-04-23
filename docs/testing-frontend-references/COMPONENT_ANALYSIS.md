# Análisis Completo de Componentes React - HomeStore

## 📊 Resumen Ejecutivo

- **Total de componentes**: 21 componentes `.tsx`
- **Framework**: React 18 + Next.js 14
- **Testing**: Vitest + React Testing Library
- **Estado**: Zustand (con persistencia en IndexedDB)
- **UI**: Material-UI (MUI)

---

## 🏗️ Estructura de Componentes

### **ATOMS (3 componentes)** - Componentes presentacionales simples, sin lógica de negocio

| Componente | Ruta | Complejidad | Props | Hooks | Stores | Servicios |
|-----------|------|-----------|-------|-------|--------|-----------|
| `Logo` | `atoms/Logo/Logo.tsx` | ⭐ Muy Baja | - | - | - | - |
| `SearchInput` | `atoms/SearchInput/SearchInput.tsx` | ⭐ Baja | `onSearch`, `placeholder` | `useState`, `useCallback` | - | - |
| `ThemeToggleButton` | `atoms/ThemeToggleButton/ThemeToggleButton.tsx` | ⭐ Muy Baja | - | - | - | - |

---

### **MOLECULES (8 componentes)** - Componentes reutilizables con lógica específica

| Componente | Ruta | Complejidad | Props | Hooks | Stores | Servicios |
|-----------|------|-----------|-------|-------|--------|-----------|
| `BodyCarousel` | `molecules/BodyCarousel/BodyCarousel.tsx` | ⭐⭐ Baja | `images` | `useState` | - | - |
| `Breadcrumb` | `molecules/Breadcrumb/Breadcrumb.tsx` | ⭐⭐ Baja-Media | - | - | `useProductStore` ✅ | - |
| `CartIconBadge` | `molecules/CartIconBadge/CartIconBadge.tsx` | ⭐⭐ Baja-Media | - | `useState`, `useEffect` | `useCartStore` ✅ | - |
| `CartItemRow` | `molecules/CartItemRow/CartItemRow.tsx` | ⭐⭐ Baja | `item`, `onIncrease`, `onDecrease`, `onRemove` | - | - | - |
| `FeedbackModal` | `molecules/FeedbackModal/FeedbackModal.tsx` | ⭐⭐ Baja | `open`, `onClose`, `type`, `title`, `message`, `buttonText` | - | - | - |
| `OrderSummary` | `molecules/OrderSummary/OrderSummary.tsx` | ⭐⭐ Baja | `subtotal`, `total`, `savings` | - | - | - |
| `ProductCard` | `molecules/ProductCard/ProductCard.tsx` | ⭐⭐⭐ Media | `product`, `viewMode`, `onAddToCart`, `onViewDetails` | - | - | - |
| `ProductGridHeader` | `molecules/ProductGridHeader/ProductGridHeader.tsx` | ⭐⭐ Baja-Media | `total`, `currentSort`, `onSortChange`, `viewMode`, `onViewModeChange` | - | `useProductStore` ✅ | - |
| `ProductInfoBlock` | `molecules/ProductInfoBlock/ProductInfoBlock.tsx` | ⭐⭐⭐ Media | `product` | `useState` | `useCartStore` ✅ | - |
| `ProductTechnicalSpecs` | `molecules/ProductTechnicalSpecs/ProductTechnicalSpecs.tsx` | ⭐ Muy Baja | `highlights`, `description` | - | - | - |

---

### **ORGANISMS (5 componentes)** - Componentes complejos, composición de moléculas

| Componente | Ruta | Complejidad | Props | Hooks | Stores | Servicios |
|-----------|------|-----------|-------|-------|--------|-----------|
| `CartView` | `organisms/CartView/CartView.tsx` | ⭐⭐⭐ Media | - | `useState`, `useEffect` | `useCartStore` ✅ | - |
| `Header` | `organisms/Header/Header.tsx` | ⭐⭐ Baja-Media | - | `useCallback` | - | - |
| `Hero` | `organisms/Hero/Hero.tsx` | ⭐ Muy Baja | - | - | - | - |
| `InvoiceView` | `organisms/InvoiceView/InvoiceView.tsx` | ⭐⭐⭐⭐ Alta | - | `useState`, `useEffect` | `useCartStore` ✅ | - |
| `ProductDetailView` | `organisms/ProductDetailView/ProductDetailView.tsx` | ⭐⭐⭐ Media | `product`, `allProducts` | `useMemo` | - | - |
| `ProductGrid` | `organisms/ProductGrid/ProductGrid.tsx` | ⭐⭐⭐⭐ Alta | - | `useState`, `useEffect`, `useMemo` | `useProductStore`, `useCartStore` ✅✅ | `ProductSortService` |

---

### **TEMPLATES (1 componente)** - Layout contenedor

| Componente | Ruta | Complejidad | Props | Hooks | Stores | Servicios |
|-----------|------|-----------|-------|-------|--------|-----------|
| `MainLayout` | `templates/MainLayout/MainLayout.tsx` | ⭐ Muy Baja | `children` | - | - | - |

---

### **SHARED (1 componente)** - Componentes de utilidad

| Componente | Ruta | Complejidad | Props | Hooks | Stores | Servicios |
|-----------|------|-----------|-------|-------|--------|-----------|
| `HydrateStore` | `shared/HydrateStore.tsx` | ⭐⭐ Baja | `category`, `products` | `useEffect`, `useRef` | `useProductStore` ✅ | - |

---

## 🎯 Clasificación por Complejidad

### ⭐ **MUY BAJA - Componentes Presentacionales Puros**
1. `Logo` - Solo renderiza JSX estático con Link
2. `ThemeToggleButton` - Icono button simple
3. `Hero` - Sección estática con scroll handler
4. `ProductTechnicalSpecs` - Tabla de specs, solo props

### ⭐⭐ **BAJA - Componentes Simples con Lógica Básica**
1. `SearchInput` - Control de input con estado local
2. `BodyCarousel` - Carrusel con índice local
3. `CartIconBadge` - Lectura de store + hydration
4. `Breadcrumb` - Lectura de store, cálculo de rutas
5. `OrderSummary` - Datos de props, navegación
6. `ProductGridHeader` - Selects y botones, lectura de store
7. `FeedbackModal` - Dialog con props configurables
8. `CartItemRow` - Callbacks para cantidad
9. `Header` - Composición de 3 atoms, responsive

### ⭐⭐⭐ **MEDIA - Componentes con Lógica de Negocio**
1. `ProductCard` - Cálculo de descuentos, múltiples callbacks
2. `ProductInfoBlock` - Manejo de cantidad, modal, interacción con store
3. `CartView` - Composición, cálculo de totales, operaciones cart
4. `ProductDetailView` - Filtering de productos, memoización

### ⭐⭐⭐⭐ **ALTA - Componentes Complejos**
1. `ProductGrid` - Múltiples estados, sorting service, modales, hidratación
2. `InvoiceView` - Generación de órdenes, router, efectos complejos

---

## 🔗 Análisis de Dependencias

### **Componentes que Usan Stores**

#### `useCartStore` - 5 componentes ✅
```
✓ CartIconBadge     → read: items
✓ ProductInfoBlock  → write: addItem
✓ CartView          → read/write: items, getSubtotal, getTotal, getSavings, updateQuantity, removeItem
✓ InvoiceView       → read/write: items, clearCart
✓ ProductGrid       → write: addItem
```

#### `useProductStore` - 4 componentes ✅
```
✓ Breadcrumb            → read: category
✓ ProductGridHeader     → read: category
✓ ProductGrid           → read: products, viewMode; write: setViewMode
✓ HydrateStore          → write: setCatalog
```

### **Componentes que Usan Servicios**

#### `ProductSortService` - 1 componente
```
✓ ProductGrid → ProductSortService.sort(products, sort)
```

### **Componentes que Consumen Componentes**

```
Header:
  ├─ Logo (atom)
  ├─ SearchInput (atom)
  ├─ ThemeToggleButton (atom)
  └─ CartIconBadge (molecule)

CartView:
  ├─ CartItemRow (molecule)
  └─ OrderSummary (molecule)

ProductGrid:
  ├─ ProductGridHeader (molecule)
  ├─ ProductCard (molecule)
  └─ FeedbackModal (molecule)

ProductDetailView:
  ├─ BodyCarousel (molecule)
  ├─ ProductInfoBlock (molecule)
  ├─ ProductTechnicalSpecs (molecule)
  └─ ProductCard (molecule)

ProductInfoBlock:
  └─ FeedbackModal (molecule)

MainLayout:
  └─ Header (organism)
```

---

## 🧪 Configuración de Testing

### **Vitest Configuration**
```typescript
// vitest.config.ts
{
  environment: 'jsdom',
  setupFiles: ['./src/infrastructure/api/mocks/setup.ts'],
  globals: true,
  env: loadEnv('test', process.cwd(), '')
}
```

### **Librerías Instaladas**
- ✅ `vitest@^4.1.5` - Test runner
- ✅ `@testing-library/react@^16.3.2` - Rendering & queries
- ✅ `@testing-library/dom@^10.4.1` - DOM queries
- ✅ `jsdom@^29.0.2` - DOM simulation
- ✅ `@vitejs/plugin-react@^6.0.1` - React support
- ✅ `msw@^2.13.4` - API mocking

### **Scripts Disponibles**
```json
{
  "test": "vitest",
  "test:ui": "vitest --ui",
  "test:coverage": "vitest --coverage"
}
```

### **Mock Setup**
- Archivo de setup: `./src/infrastructure/api/mocks/setup.ts`
- Mock handler: `./src/infrastructure/api/mocks/handlers.ts`
- Usado por: Vitest automáticamente

---

## 📋 Matriz de Testing Recomendada

### **Por Complejidad del Componente**

#### ⭐ MUY BAJA - Snapshot + Basic Render
```
Logo
ThemeToggleButton
Hero
ProductTechnicalSpecs
```
**Tests recomendados**: 1-2 tests
- Render básico
- Snapshot (opcional)

#### ⭐⭐ BAJA - Render + User Interactions
```
SearchInput
BodyCarousel
CartIconBadge
Breadcrumb
OrderSummary
ProductGridHeader
FeedbackModal
CartItemRow
Header
```
**Tests recomendados**: 3-5 tests
- Render con props
- Eventos y callbacks
- Estados iniciales
- Integración de composición (para Header)

#### ⭐⭐⭐ MEDIA - Render + Logic + Store Integration
```
ProductCard
ProductInfoBlock
CartView
ProductDetailView
```
**Tests recomendados**: 5-8 tests
- Render con diferentes props
- Cálculos de valores derivados
- Mock de stores y callbacks
- Edge cases
- Validaciones

#### ⭐⭐⭐⭐ ALTA - Render + Complex Logic + Store + Services
```
ProductGrid
InvoiceView
```
**Tests recomendados**: 8-12 tests cada uno
- Render condicional (hidratación)
- Estados complejos (loading, error, success)
- Mock de stores con persistencia
- Mock de servicios (ProductSortService)
- Mock de router (next/navigation)
- Efectos secundarios
- Modales
- Validaciones de datos

---

## 🔧 Dependencias por Componente (Detalle)

### **ATOMS**

#### Logo.tsx
```
- Imports: React, MUI (Stack, Box, Typography), Next Link
- Props: None
- Hooks: None
- Stores: None
- Servicios: None
- JSX estático: ✅
```

#### SearchInput.tsx
```
- Imports: React, MUI (TextField, InputAdornment, IconButton), MUI Icons
- Props: onSearch (function), placeholder (optional string)
- Hooks: useState (value), useCallback (handleTrigger)
- Stores: None
- Servicios: None
- Eventos: onChange, onKeyDown, onClick
```

#### ThemeToggleButton.tsx
```
- Imports: React, MUI (IconButton), MUI Icons
- Props: None
- Hooks: None
- Stores: None
- Servicios: None
- JSX estático: ✅
```

### **MOLECULES**

#### BodyCarousel.tsx
```
- Imports: React, Next Image, MUI (Box, Stack, IconButton, CardMedia), MUI Icons
- Props: images (string[])
- Hooks: useState (activeIdx)
- Stores: None
- Servicios: None
- Eventos: onClick (prev/next), click thumbnail
- Cálculos: Modulo para índice circular
```

#### Breadcrumb.tsx
```
- Imports: React, MUI (Breadcrumbs, Link, Typography, Box), MUI Icons, Next Link
- Props: None
- Hooks: None
- Stores: useProductStore (category.breadcrumbs)
- Servicios: None
- Condicional: Renderiza si category existe
- Navegación: Links dinámicos a /categoria/{id}
```

#### CartIconBadge.tsx
```
- Imports: React, MUI (Badge, IconButton, Tooltip), MUI Icons, Next Link
- Props: None
- Hooks: useState (mounted), useEffect
- Stores: useCartStore (items)
- Servicios: None
- Cálculo: suma de quantities
- Hidratación: mounted check
```

#### CartItemRow.tsx
```
- Imports: React, MUI (Box, Stack, Typography, IconButton, CardMedia), MUI Icons
- Props: item (Product & quantity), onIncrease, onDecrease, onRemove
- Hooks: None
- Stores: None
- Servicios: None
- Callbacks: onClick handlers
```

#### FeedbackModal.tsx
```
- Imports: React, MUI (Dialog, DialogContent, DialogActions, Button, Typography, Stack), MUI Icons
- Props: open, onClose, type (enum), title, message, buttonText
- Hooks: None
- Stores: None
- Servicios: None
- Condicional: Render based on type enum
- Mapeo: typeConfig por tipo de modal
```

#### OrderSummary.tsx
```
- Imports: MUI (Paper, Stack, Typography, Button, Divider), Next Link
- Props: subtotal, total, savings (números)
- Hooks: None
- Stores: None
- Servicios: None
- Condicional: Renderiza descuento si savings > 0
- Formato: Locale string para precios
```

#### ProductCard.tsx
```
- Imports: React, MUI (Card, CardMedia, CardContent, Typography, Button, Stack, Box, Badge, Rating, Divider), MUI Icons, Next Link
- Props: product (Product), viewMode (enum), onAddToCart (function), onViewDetails (function)
- Hooks: None
- Stores: None
- Servicios: None
- Cálculos: discountPercentage
- Condicional: Renderiza descuento si hasDiscount
- Estilos dinámicos: flex direction basado en viewMode
```

#### ProductGridHeader.tsx
```
- Imports: React, MUI (Stack, Typography, Select, MenuItem, IconButton, Box, FormControl, InputLabel), MUI Icons
- Props: total, currentSort (enum), onSortChange, viewMode (enum), onViewModeChange
- Hooks: None
- Stores: useProductStore (category)
- Servicios: None
- Eventos: onChange (Select), onClick (IconButton)
```

#### ProductInfoBlock.tsx
```
- Imports: React, MUI (Stack, Typography, Rating, Button, IconButton, Box), MUI Icons
- Props: product (Product)
- Hooks: useState (qty, isModalOpen)
- Stores: useCartStore (addItem)
- Servicios: None
- Componentes: FeedbackModal
- Cálculos: loop de addItem por cantidad
- Eventos: incremento/decremento cantidad
```

#### ProductTechnicalSpecs.tsx
```
- Imports: React, MUI (Box, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper)
- Props: highlights (ProductHighlight[]), description (optional string)
- Hooks: None
- Stores: None
- Servicios: None
- JSX estructura: map de tabla
```

### **ORGANISMS**

#### CartView.tsx
```
- Imports: React, MUI (Container, Grid, Typography, Button, Stack), Next Link
- Props: None
- Hooks: useState (mounted), useEffect
- Stores: useCartStore (items, getSubtotal, getTotal, getSavings, updateQuantity, removeItem)
- Servicios: None
- Componentes: CartItemRow, OrderSummary
- Condicionales: isEmpty, isMounted
- Cálculos: totales
```

#### Header.tsx
```
- Imports: React, MUI (AppBar, Toolbar, Stack, Box, useTheme, useMediaQuery)
- Props: None
- Hooks: useCallback (handleSearch), useTheme, useMediaQuery
- Stores: None
- Servicios: None
- Componentes: Logo, SearchInput, ThemeToggleButton, CartIconBadge
- Responsive: layout change en isMobile
```

#### Hero.tsx
```
- Imports: React, MUI (Box, Typography, Button, Container, Stack), MUI Icons
- Props: None
- Hooks: None
- Stores: None
- Servicios: None
- Eventos: onClick scroll smooth
```

#### InvoiceView.tsx
```
- Imports: React, MUI (Container, Paper, Typography, Box, Divider, Table, TableBody, TableCell, TableHead, TableRow, Button, CircularProgress), MUI Icons, Next Link
- Props: None
- Hooks: useState (orderSummary, isProcessed), useEffect
- Stores: useCartStore (items, clearCart)
- Router: useRouter (next/navigation)
- Servicios: None
- Cálculos: total = sum(mainPrice * qty)
- Generación: orderId = ORD-${random}
- Condicionales: Redirect si items vacío
- Efectos: timeout para redirect
```

#### ProductDetailView.tsx
```
- Imports: React, MUI (Container, Grid, Box, Typography, Breadcrumbs, Link)
- Props: product (Product), allProducts (Product[])
- Hooks: useMemo (similarProducts)
- Stores: None
- Servicios: None
- Componentes: BodyCarousel, ProductInfoBlock, ProductTechnicalSpecs, ProductCard
- Cálculos: filtering similar products (same brand, different id)
```

#### ProductGrid.tsx
```
- Imports: React, MUI (Grid, Typography, Box), MUI Icons
- Props: None
- Hooks: useState (isHydrated, sort, modalConfig), useEffect, useMemo
- Stores: useProductStore (products, viewMode, setViewMode), useCartStore (addItem)
- Servicios: ProductSortService.sort(products, sort)
- Componentes: ProductGridHeader, ProductCard, FeedbackModal
- Condicionales: Hydration check, empty products check
- Estados: Loading, Error, Success modals
- Cálculos: sorted products
```

### **TEMPLATES**

#### MainLayout.tsx
```
- Imports: React, MUI (Container, Box)
- Props: children (ReactNode)
- Hooks: None
- Stores: None
- Servicios: None
- Componentes: Header
- Layout: Flex column, min-height 100vh
```

### **SHARED**

#### HydrateStore.tsx
```
- Imports: React, useEffect, useRef
- Props: category (Category), products (Product[])
- Hooks: useEffect, useRef, useProductStore
- Stores: useProductStore (setCatalog)
- Servicios: None
- Comportamiento: Inicializa store una sola vez (initialized flag)
- Render: null (utility component)
```

---

## 📊 Resumen de Dependencias Externas

### **React Hooks Usados**
- ✅ `useState` - 7 componentes
- ✅ `useEffect` - 5 componentes
- ✅ `useCallback` - 2 componentes
- ✅ `useMemo` - 2 componentes
- ✅ `useRef` - 1 componente
- ✅ `useTheme` - 1 componente
- ✅ `useMediaQuery` - 1 componente
- ✅ `useRouter` - 1 componente

### **Custom Hooks Creados**
- ❌ Ninguno (carpeta `hooks` vacía)

### **Librerías UI**
- Material-UI (MUI) - Componentes
- MUI Icons - Iconografía
- Next.js Link - Navegación

### **Estado Global**
- Zustand (2 stores: useCartStore, useProductStore)
- Persistencia: IndexedDB (idb-keyval)

### **Servicios de Negocio**
- ProductSortService (product-sort.service.ts)

### **Entidades**
- Product, Category, ProductHighlight, CartItem

### **Enums**
- ViewMode (category.enum)
- SortOrder (product.enum)
- ModalType (FeedbackModal.tsx)

---

## ✅ Recomendaciones de Testing

### **Orden de Testing Recomendado**

1. **Fase 1: Atoms (3 tests, ~30 min)**
   - Componentes más simples, sin dependencias
   
2. **Fase 2: Molecules sin Store (6 tests, ~90 min)**
   - Breadcrumb, ProductGridHeader (with store mock)
   - CartItemRow, OrderSummary, ProductCard
   - FeedbackModal, ProductTechnicalSpecs
   
3. **Fase 3: Molecules con Store (3 tests, ~60 min)**
   - CartIconBadge, ProductInfoBlock
   - Requieren mock de useCartStore
   
4. **Fase 4: Organisms simples (3 tests, ~60 min)**
   - Hero, Header, MainLayout
   
5. **Fase 5: Organisms complejos (4 tests, ~120 min)**
   - CartView (3 tests)
   - ProductDetailView (2 tests)
   - ProductGrid (4 tests)
   - InvoiceView (3 tests)
   
6. **Fase 6: Shared (1 test, ~30 min)**
   - HydrateStore

**Total Estimado**: ~390 minutos (~6.5 horas)

---

## 🎬 Plantillas de Test (Boilerplate)

### **Para Atoms**
```typescript
import { render, screen } from '@testing-library/react';
import { Logo } from '@/presentation/atoms/Logo/Logo';

describe('Logo', () => {
  it('should render logo with correct text', () => {
    render(<Logo />);
    expect(screen.getByText('HomeStore')).toBeInTheDocument();
  });
});
```

### **Para Molecules con Callbacks**
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchInput } from '@/presentation/atoms/SearchInput/SearchInput';

describe('SearchInput', () => {
  it('should call onSearch with input value on Enter', () => {
    const mockOnSearch = vi.fn();
    render(<SearchInput onSearch={mockOnSearch} placeholder="Buscar..." />);
    
    const input = screen.getByPlaceholderText('Buscar...');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });
});
```

### **Para Molecules con Store**
```typescript
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { CartIconBadge } from '@/presentation/molecules/CartIconBadge/CartIconBadge';
import * as useCartStoreModule from '@/presentation/store/useCartStore';

describe('CartIconBadge', () => {
  it('should display item count from store', () => {
    vi.spyOn(useCartStoreModule, 'useCartStore').mockReturnValue({
      items: [
        { id: '1', quantity: 2 },
        { id: '2', quantity: 3 }
      ]
    } as any);
    
    render(<CartIconBadge />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });
});
```

### **Para Organisms**
```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { ProductGrid } from '@/presentation/organisms/ProductGrid/ProductGrid';

describe('ProductGrid', () => {
  it('should display products after hydration', async () => {
    // Mock stores
    const mockProducts = [{ id: '1', title: 'Product 1' }];
    vi.mock('@/presentation/store/useProductStore', () => ({
      useProductStore: vi.fn(() => ({
        products: mockProducts,
        viewMode: 'GRID',
        setViewMode: vi.fn()
      }))
    }));
    
    render(<ProductGrid />);
    
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });
  });
});
```

---

## 📝 Notas Importantes

### **Componentes Críticos para Testing**
1. `ProductGrid` - Complejo, múltiples integraciones, sorting logic
2. `InvoiceView` - Router, generación de IDs, efectos secundarios
3. `CartView` - Lógica de cart, cálculos de totales
4. `ProductInfoBlock` - Interacción con store, modales

### **Patrones Comunes a Testear**
- Hidratación (mounted checks)
- Callbacks pasados como props
- Integración con stores Zustand
- Filtrado y mapeo de datos
- Cálculos derivados (descuentos, totales)
- Efectos secundarios (useEffect)
- Condicionales de renderizado

### **Consideraciones de Mocking**
- Todos los stores deben ser mockeados en tests
- next/navigation (useRouter) requiere mock
- next/link puede ser renderizada directamente
- MSW ya está configurado en setup.ts

---

**Generado**: 2026-04-23 | **Versión**: 1.0
