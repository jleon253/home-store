# Guía de Testing - Home Store

## Resumen de la Configuración

Se ha configurado exitosamente un entorno de testing completo para el proyecto Home Store con **79 tests funcionales** que validan todas las capas de la arquitectura limpia implementada.

### ✅ Tests Ejecutados con Éxito

```
 Test Files  5 passed (5)
      Tests  79 passed (79)
   Start at  10:27:44
   Duration  1.30s
```

## Archivos Creados y Configurados

### 1. Configuración de Vitest

**Archivo:** `vitest.config.ts`
- Configuración de entorno `jsdom` para pruebas de componentes React
- Path aliases (`@/`) alineados con `tsconfig.json`
- Setup automático de MSW para todas las pruebas

### 2. Mock Service Worker (MSW)

**Archivos en `src/infrastructure/api/mocks/`:**

- **`handlers.ts`**: Define los handlers HTTP que interceptan peticiones
  - GET para endpoint del API de categoría
  - Handlers de error para simular respuestas 404, 500 y network errors
  
- **`setup.ts`**: Configuración de MSW
  - Inicializa el servidor antes de ejecutar tests
  - Limpia handlers entre tests
  - Detiene el servidor después de todas las pruebas

- **`endpoint-example.json`**: Datos mock del API
  - Estructura real del endpoint copiada desde `.agents/skills/endpoint-info/example/`

### 3. Pruebas Unitarias (79 tests)

#### **Mappers** (16 tests) - `product.mapper.spec.ts`
✅ Conversión de tipos (string → number)
✅ Manejo de valores nulos y opcionales
✅ Lógica de jerarquía de precios (CMR > INTERNET > NORMAL)
✅ Mapeo completo de DTOs a Entities

#### **Repositories** (22 tests) - `api-product.repository.spec.ts`
✅ Consumo correcto de variables de entorno
✅ Manejo de errores de red (404, 500, timeout)
✅ Delegación correcta al Mapper
✅ Configuración de headers y caché

#### **Entities** (41 tests)

**Product Entity** (14 tests) - `product.entity.spec.ts`
- Inmutabilidad de interfaces (type-level)
- Validez de estructura
- Tipado correcto de propiedades
- Tipos numéricos y booleanos
- Arrays tipados

**Category Entity** (10 tests) - `category.entity.spec.ts`
- Inmutabilidad de propiedades readonly
- Validez de estructura
- Tipos de propiedades correctos

**Cart Entity** (17 tests) - `cart.entity.spec.ts`
- Inmutabilidad de entidades
- Validez de estructura
- Tipos de propiedades
- Escenarios complejos
- Casos extremos

## Patrones de Testing Utilizados

### 1. AAA Pattern (Arrange, Act, Assert)
Todos los tests siguen el patrón AAA:
```typescript
// Arrange - Configurar datos iniciales
const product: Product = { ... };

// Act - Ejecutar la acción
const result = ProductMapper.toDomain(productDTO);

// Assert - Verificar resultados
expect(result.rating).toBe(4.5);
```

### 2. Tipado Estricto
- ✅ No se utiliza `any`
- ✅ Todos los valores están correctamente tipados
- ✅ Se usan interfaces específicas en lugar de genéricas

### 3. Responsabilidad Única
- 1 archivo de test por cada clase de infraestructura
- Tests focalizados en un aspecto específico
- Nombre descriptivo que explica qué se está probando

## Cómo Ejecutar los Tests

### Ejecutar todos los tests
```bash
npm test
```

### Ejecutar tests en modo watch (desarrollo)
```bash
npm test
# Presiona 'a' para ejecutar todos
# Presiona 'q' para salir
```

### Ejecutar tests específicos
```bash
npm test -- src/infrastructure/adapters/product.mapper.spec.ts
```

### Ejecutar con coverage (requiere dependencia adicional)
```bash
npm test -- --coverage
```

### Ejecutar en modo no-interactivo (CI/CD)
```bash
npm test -- --run
```

## Variables de Entorno para Testing

**Archivo:** `.env.test`
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_CATEGORY_ENDPOINT=/api/category
NEXT_PUBLIC_DEFAULT_CACHE_TIME=3600
```

## Cobertura de Tests

### Mappers (ProductMapper)
- ✅ Transformación de tipos numéricos
- ✅ Normalización de unidades (Und → UND)
- ✅ Validación de valores nulos
- ✅ Jerarquía de precios de negocio
- ✅ Mapeo de badges y highlights

### Repositories (ApiProductRepository)
- ✅ Consumo del API mediante variables de entorno
- ✅ Manejo de errores HTTP (404, 500)
- ✅ Manejo de errores de red (timeout)
- ✅ Delegación correcta a Mappers
- ✅ Extracción de datos de respuesta estructurada

### Entities
- ✅ Inmutabilidad verificada en tiempo de compilación
- ✅ Estructuras correctas de datos
- ✅ Tipos correctos para todas las propiedades
- ✅ Validación de referencias entre entidades

## Casos de Borde Validados

1. **Conversión de tipos con valores inválidos**
   - `rating: "invalid"` → 0
   - `totalReviews: "abc"` → 0

2. **Arrays y valores opcionales**
   - Badges faltantes → array vacío
   - Highlights faltantes → array vacío
   - FastShippingLabels faltantes → false

3. **Jerarquía de precios**
   - CMR disponible → Se elige CMR
   - Solo INTERNET → Se elige INTERNET
   - Solo NORMAL → Se elige NORMAL

4. **Errores de red**
   - 404 Not Found
   - 500 Internal Server Error
   - Network timeout

## Próximos Pasos (Opcional)

1. **Agregar coverage reports:**
   ```bash
   pnpm add -D @vitest/coverage-v8
   ```

2. **Agregar UI de tests:**
   ```bash
   npm test -- --ui
   ```

3. **Integrar con CI/CD:**
   - Usar `npm test -- --run` en pipelines
   - Generar reports de coverage

4. **Agregar tests E2E:**
   - Considerar Playwright o Cypress para tests end-to-end

## Referencia Rápida de Dependencias

```json
{
  "devDependencies": {
    "vitest": "^4.1.5",
    "@vitejs/plugin-react": "^6.0.1",
    "jsdom": "^29.0.2",
    "@testing-library/react": "^16.3.2",
    "@testing-library/dom": "^10.4.1",
    "msw": "^2.13.4",
    "tsx": "^4.21.0",
    "vite": "^8.0.9"
  }
}
```

## Notas Importantes

- Los tests utilizan **Mock Service Worker** para interceptar llamadas HTTP
- La inmutabilidad de las entidades se verifica a nivel de tipos (TypeScript compile-time)
- Todos los tests son independientes y pueden ejecutarse en cualquier orden
- MSW se reinicia automáticamente entre tests para evitar interferencias
