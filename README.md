# Home Store

## Stack Tecnologico

- React v18
- NextJS v14
- TypScript v5
- Material UI v5
- Zustand v4
- idb-keyval v6 (para leer indexedDB)
- Tailwind v3
- Vitest v4

## Primeros pasos

- Ejecutar `npm install`
- Configurar el archvivo `.env.local`

```bash
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://apim-dev-proxy.sodhc.co/test-jasson/api
NEXT_PUBLIC_API_CATEGORY_ENDPOINT=/category

# Feature Flags & Config
NEXT_PUBLIC_DEFAULT_CACHE_TIME=3600
NEXT_PUBLIC_ENABLE_MOCKS=false

# Tiempo mínimo para caché en páginas de catálogo (en segundos)
# Para SSR puro on-demand se usa 0 o se ignora con 'no-store'
NEXT_PUBLIC_SSR_REVALIDATE=0
```

- Correr el servidor de desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

## Rutas

- `/`: Home
- `/cart`: Carrito de compras
- `/product/[id]`: Detalle del producto
- `/checkout/success`: Factura de la compra, tras finalizar

## Decisiones de arquitectura

Archivos de formato `.md` ubicados en el directorio `/docs`

- [FrontEnd](/docs/FRONTEND.md)
- [BackEnd](/docs/BACKEND.md)
- [Testing BackEnd](/docs/TESTING.md)
