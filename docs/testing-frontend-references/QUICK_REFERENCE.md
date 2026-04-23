# 📑 Referencia Rápida - Componentes React HomeStore

## 📊 Resumen Ejecutivo por Componente

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        ESTRUCTURA DE COMPONENTES                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ ATOMS (3)           │ MOLECULES (8)      │ ORGANISMS (5)  │ TEMPLATES (1)   │
│ - Logo              │ - BodyCarousel     │ - CartView     │ - MainLayout    │
│ - SearchInput       │ - Breadcrumb       │ - Header       │                 │
│ - ThemeToggleButton │ - CartIconBadge    │ - Hero         │                 │
│                     │ - CartItemRow      │ - InvoiceView  │                 │
│                     │ - FeedbackModal    │ - ProductGrid  │                 │
│                     │ - OrderSummary     │ - Product      │                 │
│                     │ - ProductCard      │   DetailView   │                 │
│                     │ - ProductGridHdr   │                │                 │
│                     │ - ProductInfoBlk   │                │                 │
│                     │ - ProductTechSpcs  │                │                 │
│                     │                    │ SHARED (1)     │                 │
│                     │                    │ - HydrateStore │                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Matriz Rápida de Complejidad

| Componente | Tipo | ⭐ Complejidad | Props | Hooks | Stores | Tests |
|-----------|------|---|-------|-------|--------|-------|
| **Logo** | Atom | ⭐ | 0 | 0 | 0 | 2 |
| **SearchInput** | Atom | ⭐⭐ | 2 | 2 | 0 | 5 |
| **ThemeToggleButton** | Atom | ⭐ | 0 | 0 | 0 | 2 |
| **BodyCarousel** | Molecule | ⭐⭐ | 1 | 1 | 0 | 6 |
| **Breadcrumb** | Molecule | ⭐⭐ | 0 | 0 | 1 | 5 |
| **CartIconBadge** | Molecule | ⭐⭐ | 0 | 2 | 1 | 6 |
| **CartItemRow** | Molecule | ⭐⭐ | 4 | 0 | 0 | 7 |
| **FeedbackModal** | Molecule | ⭐⭐ | 6 | 0 | 0 | 5 |
| **OrderSummary** | Molecule | ⭐⭐ | 3 | 0 | 0 | 4 |
| **ProductCard** | Molecule | ⭐⭐⭐ | 4 | 0 | 0 | 8 |
| **ProductGridHeader** | Molecule | ⭐⭐ | 5 | 0 | 1 | 6 |
| **ProductInfoBlock** | Molecule | ⭐⭐⭐ | 1 | 2 | 1 | 7 |
| **ProductTechnicalSpecs** | Molecule | ⭐ | 2 | 0 | 0 | 3 |
| **CartView** | Organism | ⭐⭐⭐ | 0 | 2 | 1 | 7 |
| **Header** | Organism | ⭐⭐ | 0 | 3 | 0 | 4 |
| **Hero** | Organism | ⭐ | 0 | 0 | 0 | 3 |
| **InvoiceView** | Organism | ⭐⭐⭐⭐ | 0 | 2 | 1 | 8 |
| **ProductDetailView** | Organism | ⭐⭐⭐ | 2 | 1 | 0 | 5 |
| **ProductGrid** | Organism | ⭐⭐⭐⭐ | 0 | 3 | 2 | 8 |
| **MainLayout** | Template | ⭐ | 1 | 0 | 0 | 2 |
| **HydrateStore** | Shared | ⭐⭐ | 2 | 2 | 1 | 4 |

**Total**: 21 componentes | ~127 tests recomendados | ~6.5 horas de testing

---

## 🔗 Dependencias por Tipo

### **Hooks React Usados**
```
├─ useState           (7 componentes)   ┐
├─ useEffect          (5 componentes)   ├─ Standard Hooks
├─ useCallback        (2 componentes)   │
├─ useMemo            (2 componentes)   │
├─ useRef             (1 componente)    ┘
├─ useTheme           (1 componente)    ┐
├─ useMediaQuery      (1 componente)    ├─ MUI Hooks
├─ useRouter          (1 componente)    ├─ Next Hooks
└─ useCartStore       (5 componentes)   ├─ Custom Stores
   useProductStore    (4 componentes)   ┘
```

### **Componentes por Dependencia**

#### **useCartStore** (5 componentes)
1. CartIconBadge
2. ProductInfoBlock
3. CartView
4. InvoiceView
5. ProductGrid

#### **useProductStore** (4 componentes)
1. Breadcrumb
2. ProductGridHeader
3. ProductGrid
4. HydrateStore

#### **ProductSortService** (1 componente)
1. ProductGrid

---

## 📋 Plantilla de Testing por Complejidad

### **⭐ MUY BAJA (Logo, ThemeToggleButton, Hero)**
```
□ Render básico
□ Snapshot (opcional)
□ Validar estructura HTML
→ 1-2 tests por componente
```

### **⭐⭐ BAJA (SearchInput, BodyCarousel, etc.)**
```
□ Render con props
□ Eventos y callbacks
□ Estados locales
□ Validaciones de UI
→ 4-6 tests por componente
```

### **⭐⭐⭐ MEDIA (ProductCard, CartView, ProductDetailView)**
```
□ Render con diferentes estados
□ Cálculos y transformaciones
□ Mock de stores
□ Callbacks y eventos
□ Edge cases
→ 6-8 tests por componente
```

### **⭐⭐⭐⭐ ALTA (ProductGrid, InvoiceView)**
```
□ Renderizado condicional
□ Hidratación y mounting
□ Múltiples estados
□ Mock de servicios
□ Mock de router
□ Efectos secundarios
□ Integración de componentes
□ Validaciones complejas
→ 8-12 tests por componente
```

---

## 🧪 Matriz de Testing - ¿Qué Testear?

| Aspecto | Atoms | Molecules | Organisms | Shared |
|--------|-------|-----------|-----------|--------|
| **Render** | ✅ | ✅ | ✅ | ✅ |
| **Props** | ❌ | ✅ | ~(composición) | ✅ |
| **Callbacks** | ❌ | ✅ | ✅ | ❌ |
| **Hooks** | ❌ | ✅ | ✅ | ✅ |
| **Stores** | ❌ | ✅ | ✅ | ✅ |
| **Servicios** | ❌ | ❌ | ✅ | ❌ |
| **Integración** | ❌ | ~ | ✅ | ❌ |

---

## 📊 Fases de Implementación Recomendadas

### **Fase 1: Base (2-3 horas)**
```
Logo (1)
SearchInput (1)
ThemeToggleButton (1)
Hero (1)
ProductTechnicalSpecs (1)
→ 5 componentes, ~5 tests
```

### **Fase 2: Moléculas Sin Store (1.5-2 horas)**
```
BodyCarousel (1)
CartItemRow (1)
FeedbackModal (1)
OrderSummary (1)
ProductCard (1)
Breadcrumb + ProductGridHeader (con mock store)
→ 6 componentes, ~28 tests
```

### **Fase 3: Moléculas Con Store (1-1.5 horas)**
```
CartIconBadge (1)
ProductInfoBlock (1)
→ 2 componentes, ~13 tests
```

### **Fase 4: Organismos Simples (1-1.5 horas)**
```
Header (1)
MainLayout (1)
→ 2 componentes, ~6 tests
```

### **Fase 5: Organismos Complejos (2.5-3 horas)**
```
CartView (1)
ProductDetailView (1)
ProductGrid (1)
InvoiceView (1)
HydrateStore (1)
→ 5 componentes, ~32 tests
```

**Total Estimado**: ~90-120 minutos (~1.5-2 horas por fase)

---

## 🔐 Configuración de Mocking Rápida

### **useCartStore Mock**
```typescript
vi.mock('@/presentation/store/useCartStore', () => ({
  useCartStore: vi.fn(() => ({
    items: [],
    addItem: vi.fn(),
    updateQuantity: vi.fn(),
    removeItem: vi.fn(),
    clearCart: vi.fn(),
    getSubtotal: () => 0,
    getTotal: () => 0,
    getSavings: () => 0,
  }))
}));
```

### **useProductStore Mock**
```typescript
vi.mock('@/presentation/store/useProductStore', () => ({
  useProductStore: vi.fn(() => ({
    category: null,
    products: [],
    setCatalog: vi.fn(),
    viewMode: 'GRID',
    setViewMode: vi.fn(),
  }))
}));
```

### **Next.js Mocks**
```typescript
// link
vi.mock('next/link', () => ({
  default: ({ children, href }: any) => 
    <a href={href}>{children}</a>
}));

// image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => 
    <img src={src} alt={alt} {...props} />
}));

// router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/',
}));
```

---

## 📌 Checklist de Validación por Componente

### **Para cada test, verificar:**
- [ ] Setup correcto (renders, mocks)
- [ ] Props válidas y tipos correctos
- [ ] Eventos se disparan correctamente
- [ ] Callbacks se invocan con argumentos esperados
- [ ] Stores se consultan/actualizan correctamente
- [ ] Estados condicionales funcionan
- [ ] Accesibilidad (aria-labels, roles)
- [ ] Responsive (si aplica)
- [ ] Edge cases (empty, error, loading)

---

## 🚀 Quick Start - Primeros Tests

### **1. Crear archivo de test**
```bash
# Ejemplo: atoms/Logo/Logo.test.tsx
touch src/presentation/atoms/Logo/Logo.test.tsx
```

### **2. Template básico**
```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Logo } from './Logo';

describe('Logo', () => {
  it('should render', () => {
    render(<Logo />);
    expect(screen.getByText('HomeStore')).toBeInTheDocument();
  });
});
```

### **3. Ejecutar tests**
```bash
npm run test                 # Ejecutar todos
npm run test Logo           # Ejecutar específico
npm run test:ui             # Ver UI
npm run test:coverage       # Coverage report
```

---

## 📈 Métricas de Cobertura Objetivo

| Métrica | Objetivo |
|---------|----------|
| **Statements** | > 80% |
| **Branches** | > 75% |
| **Functions** | > 85% |
| **Lines** | > 80% |

---

## 📚 Referencias Rápidas

### **Testing Library**
- `render()` - Renderiza componente
- `screen.getBy*()` - Query única
- `screen.queryBy*()` - Query opcional
- `screen.getAllBy*()` - Query múltiple
- `fireEvent.click()` - Click
- `userEvent.type()` - Typing

### **Vitest**
- `describe()` - Suite
- `it()` / `test()` - Test individual
- `expect()` - Assertion
- `vi.fn()` - Mock function
- `vi.mock()` - Mock módulo
- `beforeEach()` / `afterEach()` - Hooks

### **Async Testing**
- `waitFor()` - Espera condición
- `userEvent.setup()` - Setup para eventos
- `vi.useFakeTimers()` - Mock timers

---

**Última actualización**: 2026-04-23 | **v1.0**
