# Roadmap - A la Mesa Frontend

## ✅ Completado en Primera Entrega

### Infraestructura
- [x] Monorepo con pnpm workspaces
- [x] Configuración TypeScript centralizada
- [x] Alias de paths (@/, @alamesa/shared)

### Shared Package
- [x] Tipos de dominio (Local, Plato, Pedido, etc.)
- [x] Formatters (moneda UY, fechas)
- [x] Schemas Zod para validaciones
- [x] API client Axios con interceptores
- [x] Mock backend con datos
- [x] Stores Zustand (auth + carrito)
- [x] Hooks de TanStack Query

### Componentes Base
- [x] Button
- [x] Input
- [x] Card

### Layout
- [x] ClienteHeader

### Páginas
- [x] Login
- [x] Registro
- [x] Home (listar locales)
- [x] Local Detail (platos + carrito)
- [x] Checkout
- [x] Mis Pedidos

## 📋 Próximas Fases

### Fase 2: Componentes y Mejoras UI
- [ ] Badge (para promociones)
- [ ] Avatar (para usuario)
- [ ] Divider
- [ ] Modal para detalles
- [ ] Toast/Snackbar para notificaciones
- [ ] Loading skeleton
- [ ] Empty state components

### Fase 3: Página de Detalle de Pedido
- [ ] PedidoDetailPagina
- [ ] Timeline de estado
- [ ] Información de entrega
- [ ] Tracking en tiempo real

### Fase 4: Admin (Locales)
- [ ] Admin Dashboard
- [ ] Gestión de locales
- [ ] Gestión de platos/promociones
- [ ] Historial de pedidos

### Fase 5: Funcionalidades Avanzadas
- [ ] Carrito persistente mejorado
- [ ] Favoritos
- [ ] Historial de búsqueda
- [ ] Recomendaciones
- [ ] Reseñas y ratings
- [ ] Filtros avanzados
- [ ] Geolocalización

### Fase 6: Mobile (React Native)
- [ ] Scaffold app Expo
- [ ] Componentes nativas
- [ ] Navegación nativa
- [ ] Mismo state management
- [ ] Push notifications

### Fase 7: Backend Real
- [ ] Reemplazar mock por API real
- [ ] Autenticación JWT
- [ ] Actualización de datos en tiempo real
- [ ] Pagos reales
- [ ] Email/SMS

### Fase 8: Deployment
- [ ] Build optimizado
- [ ] CDN/hosting web
- [ ] App stores (Android/iOS)
- [ ] CI/CD pipeline
- [ ] Monitoring

## 🐛 Mejoras Técnicas Pendientes
- [ ] Error boundaries
- [ ] Service workers (PWA)
- [ ] Tests unitarios
- [ ] Tests E2E
- [ ] Accessibility audits
- [ ] SEO optimization
- [ ] Performance optimization
- [ ] Documentación storybook

## 📝 Notas
- Mock backend funciona offline
- Datos se reinician al refrescar (no persisten en DB)
- Auth token persiste en localStorage (demo)
- Lista de locales es fija (no hay paginación real)
