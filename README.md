# A la Mesa - Frontend

Implementación del frontend web y mobile del marketplace de delivery de comida "A la Mesa".

## Estructura

```
frontend/
├── apps/
│   ├── web/          Vite + React 19 + React Router v7
│   └── mobile/       Expo (scaffold)
├── packages/
│   └── shared/       Código compartido entre web y mobile
├── pnpm-workspace.yaml
└── package.json
```

## Stack

- **Web**: React 19 RC, Vite, React Router v7, TypeScript
- **State Management**: Zustand (con persistencia localStorage)
- **Queries**: TanStack Query
- **Forms/Validation**: Zod
- **HTTP Client**: Axios
- **Styling**: CSS Vanilla + CSS Variables

## Instalación

Requiere [pnpm](https://pnpm.io/):

```bash
# Instalar dependencias
pnpm install

# Instalar dependencias de un workspace específico
pnpm -F @alamesa/web install
```

## Desarrollo

```bash
# Dev server web (localhost:5173)
pnpm web:dev

# Build web
pnpm web:build

# Preview build
pnpm web:preview

# Build shared package
pnpm shared:build
```

## Mock Backend

Por defecto, el desarrollo usa un mock del backend:

- **Variable**: `VITE_USE_MOCK=true` en `.env.development`
- **Datos Mock**: 7 locales, 7 platos, 2 promociones
- **Usuario Mock**: `mockuser@alamesa.food` / `mockpass123`
- **Delay**: Los requests tienen delay simulado (200-700ms)

Cuando el backend real esté disponible, cambiar `VITE_USE_MOCK=false` y ajustar `VITE_API_URL`.

## Funcionalidades Implementadas (Primera Entrega)

### Autenticación
- [x] Login con email/password (mock)
- [x] Registro de usuario (mock)
- [x] Token persistente en localStorage
- [x] Redirect automático a login si token expira

### Home
- [x] Listar locales
- [x] Búsqueda por nombre
- [x] Filtro por categoría
- [x] Mínimo (permite acceso a LocalDetail)

### Detalle del Local
- [x] Listar platos por categoría
- [x] Mostrar promociones aplicadas
- [x] Agregar items al carrito
- [x] Carrito flotante con total

### Checkout
- [x] Formulario dirección con validación Zod
- [x] Selección método de pago
- [x] Resumen de pedido
- [x] Confirmación y creación de pedido

### Mis Pedidos
- [x] Listar pedidos del usuario
- [x] Estado del pedido con colores
- [x] Resumen de items
- [x] Total por pedido

## Convenciones

- **Nombres**: Spanish ASCII (excepto términos técnicos: token, store, hook, etc.)
- **Componentes**: PascalCase (`Button`, `LocalCard`)
- **Métodos**: camelCase español (`agregarItem`, `listarLocales`)
- **Estilos**: CSS Vanilla + variables CSS
- **Comentarios**: Mínimos, solo cuando el "por qué" no es obvio

## URLs del App

- `/` - Home (listar locales)
- `/login` - Iniciar sesión
- `/registro` - Crear cuenta
- `/local/:id` - Detalle del local y carrito
- `/checkout` - Confirmar pedido (requiere login)
- `/mis-pedidos` - Historial de pedidos (requiere login)

## Variables de Entorno (.env.development)

```
VITE_API_URL=http://localhost:8080/api
VITE_USE_MOCK=true
```

## Scripts npm Útiles

```bash
# Dentro de apps/web
pnpm dev      # Dev server
pnpm build    # Build producción
pnpm preview  # Vista previa del build
```
