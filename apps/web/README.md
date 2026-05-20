# A la Mesa Web

Aplicación web del marketplace de delivery construida con React 19 + Vite + TypeScript.

## Instalación

```bash
# Desde la raíz del proyecto
pnpm install

# O específicamente para web
pnpm -F @alamesa/web install
```

## Desarrollo

```bash
pnpm web:dev
```

Abre http://localhost:5173

## Build

```bash
pnpm web:build
```

El output está en `dist/`

## Preview del Build

```bash
pnpm web:preview
```

## Estructura de Carpetas

```
src/
├── components/
│   ├── base/              Button, Input, Card, Badge
│   └── layout/            ClienteHeader, etc
├── pages/
│   ├── PaginaInicio.tsx
│   ├── LoginPagina.tsx
│   ├── RegistroPagina.tsx
│   ├── LocalDetailPagina.tsx
│   ├── CheckoutPagina.tsx
│   └── MisPedidosPagina.tsx
├── routes/                Configuración de rutas
├── App.tsx
├── main.tsx
└── index.css
```

## Variables de Entorno

`.env.development`:
```
VITE_API_URL=http://localhost:8080/api
VITE_USE_MOCK=true
```

## Tecnologías

- **React 19 RC** - UI
- **Vite** - Build tool
- **React Router v7** - Routing
- **TanStack Query** - Server state management
- **Zustand** - Client state (auth, carrito)
- **Axios** - HTTP client
- **Zod** - Validaciones
- **CSS Vanilla** - Estilos

## Alias de Importación

- `@/*` - src/
- `@alamesa/shared` - packages/shared/src
