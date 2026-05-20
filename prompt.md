en ./mockups-vibe, diseñamos en React (./mockups-vibe/alamesa-mockups) y en React Native (./mockups-vibe/mobile-mockups) los mockups de las interfaces frontend web y frontend mobile respectivamente, de nuestro proyecto de marketplace de delivery de comida llamado "A la mesa". en ./mockups-vibe/docs está la documentación
el backend no está publicado todavía pero será en Spring Boot

pero ahora vamos a comenzar la implementación real de los dos frontend. queremos:

* aprovechar el código en común que podemos tener entre React y React Native (hooks, API calls, estado, validaciones, formateadores)

* trabajar todo con TypeScript
* trabajar lo más posible con componentes reutilizables
* las pantallas tienen que parecerse visualmente idénticas al diseño que está en los mockups (tanto en mobile como web)
* Axios para API calls, Zustand para estado, Zod para validaciones
* los primeros casos de uso que vamos a pasar van a ser en el frontend web: Iniciar sesión, Buscar y listar platos y promociones de un local, Realizar pedido
* como el backend aún no está disponible, quiero que haya un mock de lo que devuelve el backend (login sin chequeo, registro de usuario mockuser/mockpass, un local por defecto con datos que en los mockups están guardados en JSON, y el buscar y listar platos y promociones de un local también con datos de los JSON)
* no vamos a implementar obviamente esa IndexPage que listaba cada pantalla para verla, eso era porque era la lista de los mockups. acá el flujo es la HomePage es listar y buscar locales, posible login o registro, vuelve a la homepage, desde ahí se puede ver un local, carrito, pedidos (si está logueado). lo lógico...
* la implementación de la homepage debe ser mínima, para mostrar un local del mock y poder luego ir a testear la página de listar y buscar platos y promociones de un local

estudiá todo lo que necesites, haceme las preguntas que falten, sugerí alguna cosa más que se me pueda estar pasando, antes de empezar a implementar


ahí, me preguntaste:
¿Cómo organizamos el monorepo para compartir código entre Web y Mobile?
apps/web + apps/mobile + packages/shared (Recomendado)

¿Qué capa usamos para el mock del backend?
Axios interceptors con flag env

¿Qué usamos para estilos en el web?
Vanilla CSS + CSS variables (como los mockups) (Recomendado)

¿Agregamos TanStack Query para manejo de server state?
Sí, Axios + TanStack Query (Recomendado)

¿Cómo se comporta el login mock?
Solo acepta mockuser@alamesa.food / mockpass123

¿Qué rutas usamos en el web app real?
Rutas limpias de producción (Recomendado)

¿El estado de autenticación persiste al refrescar la página?
Sí, persistir en localStorage (Recomendado)

¿El carrito también persiste en localStorage?
Sí, persistir en localStorage


Luego me diste un plan de implementación:

Estructura del monorepo
frontend/
├── apps/
│   ├── web/          Vite + React 19 + React Router v7
│   └── mobile/       Expo (solo scaffold por ahora)
├── packages/
│   └── shared/       @alamesa/shared
├── npm-workspace.yaml
└── package.json


packages/shared — todo lo que comparten web y mobile:
Carpeta	Contenido
src/types/	Interfaces de dominio (Local, Plato, Pedido, etc.) + DTOs
src/utils/	formatters.ts (moneda es-UY, fechas) + schemas.ts (Zod)
src/api/client.ts	Instancia Axios con interceptor mock
src/api/mock/	Datos mock (8 locales, 15 platos, 2 promos, 1 usuario) + interceptores
src/api/endpoints/	auth, locales, platos, pedidos
src/stores/authStore.ts	Zustand + persist (localStorage)
src/stores/cartStore.ts	Zustand (carrito)
src/hooks/	TanStack Query hooks (useLocales, usePlatos, usePedidos)



apps/web — scope de la primera entrega:
Componentes (portados de los mockups):

Base: Button, Input/Textarea, Card, Badge, Avatar, Divider
Layout: ClientHeader, ClientNavbar
Sections: LocalCard, PlatoCard, LocalHero, CartDrawer, FiltersSidebar
Páginas:

/login → Login (solo acepta mockuser@alamesa.food / mockpass123)
/registro → Register (mock: guarda en memoria/localStorage)
/ → HomePage (mínima: lista locales, buscador, filtro categoría)
/local/:id → LocalDetail (platos + promos + categoría + carrito)
/checkout → Checkout (requiere login, formulario dirección + confirm)
/mis-pedidos → MyOrders (requiere login, lista mock de pedidos)
Mock:

VITE_USE_MOCK=true en .env.development
Interceptor Axios activo en dev, desactivado cuando llega el backend real
listarPlatosYPromocionesDeLocal aplica descuentos de promos en el mock igual que haría el backend


en los componentes y nombres de métodos, usar español en lo posible (solo caracteres ASCII), comentarios al mínimo y nunca emojis y palabras típicas de IA
Nombres de métodos y componentes en español ASCII: listarLocales, agregarItem, PlatoCard, LocalDetalle, carritoStore, autenticacionStore, etc.
Términos técnicos que no tienen equivalente natural en español se dejan en inglés: token, store, hook, login, checkout, drawer
Comentarios solo cuando el por qué no es obvio en el código
Sin emojis en ningún archivo


Ahora con todo esto, comenzar