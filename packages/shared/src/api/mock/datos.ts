import type { Local, Plato, Promocion, Pedido } from '../../tipos';

export const LOCALES: Local[] = [
  {
    id: 'local_001', name: 'Pizzeria Don Carlos', category: 'Pizzeria',
    description: 'Pizzas artesanales con masa madre desde 1985. Tradicion familiar en cada mordida.',
    image: 'https://images.unsplash.com/photo-1572635148997-b388f80f6a39',
    logo: 'https://picsum.photos/seed/logopizza/80/80',
    coverImage: 'https://images.unsplash.com/photo-1572635148997-b388f80f6a39',
    rating: 4.8, reviews: 145, distance: 0.8, deliveryTime: 25, isOpen: true,
    address: 'Calle Principal 123, Montevideo', phone: '+598 2 1234567',
    menuCategories: ['Pizzas', 'Pastas', 'Bebidas', 'Postres'], deliveryCost: 100, minOrder: 300,
  },
  {
    id: 'local_002', name: 'Sushi House', category: 'Sushi',
    description: 'Sushi fresco preparado diariamente con ingredientes importados de Japon.',
    image: 'https://images.unsplash.com/photo-1600913827808-30a3d9bcaf34',
    logo: 'https://picsum.photos/seed/logosushi/80/80',
    coverImage: 'https://images.unsplash.com/photo-1600913827808-30a3d9bcaf34',
    rating: 4.6, reviews: 89, distance: 1.2, deliveryTime: 35, isOpen: true,
    address: 'Av. Japon 456, Pocitos', phone: '+598 2 2345678',
    menuCategories: ['Sushi', 'Ramen', 'Gyozas', 'Bebidas'], deliveryCost: 120, minOrder: 400,
  },
  {
    id: 'local_003', name: 'Burger Bros', category: 'Hamburguesas',
    description: 'Hamburguesas artesanales con carne de res 100% nacional. Sin conservantes.',
    image: 'https://images.unsplash.com/photo-1677561713604-989d6a76424a',
    logo: 'https://picsum.photos/seed/logoburger/80/80',
    coverImage: 'https://images.unsplash.com/photo-1677561713604-989d6a76424a',
    rating: 4.5, reviews: 210, distance: 0.5, deliveryTime: 20, isOpen: true,
    address: 'Rambla 789, Parque Rodo', phone: '+598 2 3456789',
    menuCategories: ['Hamburguesas', 'Papas', 'Bebidas'], deliveryCost: 80, minOrder: 250,
  },
  {
    id: 'local_004', name: 'Dragon Palace', category: 'Comida China',
    description: 'Autentica cocina china con recetas familiares traidas directamente de Shanghai.',
    image: 'https://images.unsplash.com/photo-1470114755716-3e1124c6c3bd',
    logo: 'https://picsum.photos/seed/logodragon/80/80',
    coverImage: 'https://images.unsplash.com/photo-1470114755716-3e1124c6c3bd',
    rating: 4.3, reviews: 67, distance: 2.1, deliveryTime: 40, isOpen: false,
    address: 'Calle Baron Tecnologo 12, Centro', phone: '+598 2 4567890',
    menuCategories: ['Arroces', 'Fideos', 'Dim Sum', 'Bebidas'], deliveryCost: 90, minOrder: 300,
  },
  {
    id: 'local_005', name: 'El Cevichero', category: 'Cevicheria',
    description: 'Los mejores ceviches y tiraditos de la ciudad. Pescado fresco del dia.',
    image: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3',
    logo: 'https://picsum.photos/seed/logoceviche/80/80',
    coverImage: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3',
    rating: 4.9, reviews: 178, distance: 1.5, deliveryTime: 30, isOpen: true,
    address: 'Puerto Viejo 234, Ciudad Vieja', phone: '+598 2 5678901',
    menuCategories: ['Ceviches', 'Tiraditos', 'Anticuchos', 'Bebidas'], deliveryCost: 110, minOrder: 350,
  },
  {
    id: 'local_006', name: 'La Trattoria', category: 'Pastas',
    description: 'Pastas frescas hechas a mano cada dia. Recetas del norte de Italia.',
    image: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b',
    logo: 'https://picsum.photos/seed/logotrattoria/80/80',
    coverImage: 'https://images.unsplash.com/photo-1579027989536-b7b1f875659b',
    rating: 4.7, reviews: 134, distance: 0.9, deliveryTime: 28, isOpen: true,
    address: 'Villa Italiana 567, Punta Carretas', phone: '+598 2 6789012',
    menuCategories: ['Pastas', 'Risottos', 'Ensaladas', 'Bebidas'], deliveryCost: 95, minOrder: 280,
  },
  {
    id: 'local_007', name: 'La Boulangerie', category: 'Panaderia',
    description: 'Pan artesanal frances y pasteles elaborados con tecnicas tradicionales.',
    image: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877',
    logo: 'https://picsum.photos/seed/logobakery/80/80',
    coverImage: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877',
    rating: 4.4, reviews: 92, distance: 0.3, deliveryTime: 15, isOpen: true,
    address: 'Bulevar Artigas 890, Prado', phone: '+598 2 7890123',
    menuCategories: ['Panes', 'Medialunas', 'Tortas', 'Cafe'], deliveryCost: 60, minOrder: 150,
  },
  {
    id: 'local_008', name: 'Tokyo Ramen', category: 'Sushi',
    description: 'Ramen autentico y gyozas crujientes. El sabor de Tokio en tu mesa.',
    image: 'https://picsum.photos/seed/ramen/400/250',
    logo: 'https://picsum.photos/seed/logoramen/80/80',
    coverImage: 'https://picsum.photos/seed/coverramen/1200/400',
    rating: 4.5, reviews: 56, distance: 1.8, deliveryTime: 45, isOpen: false,
    address: 'Sakura 321, Malvin', phone: '+598 2 8901234',
    menuCategories: ['Ramen', 'Gyozas', 'Onigiri', 'Bebidas'], deliveryCost: 130, minOrder: 500,
  },
  {
    id: 'local_009', name: 'TexMex House', category: 'Hamburguesas',
    description: 'Burritos, tacos y nachos autenticos. Sabor tejano en cada bocado.',
    image: 'https://picsum.photos/seed/texmex/400/250',
    logo: 'https://picsum.photos/seed/logotexmex/80/80',
    coverImage: 'https://picsum.photos/seed/covertexmex/1200/400',
    rating: 4.2, reviews: 43, distance: 2.5, deliveryTime: 38, isOpen: true,
    address: 'Texas Ave 432, Sayago', phone: '+598 2 9012345',
    menuCategories: ['Tacos', 'Burritos', 'Nachos', 'Bebidas'], deliveryCost: 100, minOrder: 300,
  },
  {
    id: 'local_010', name: 'Veggie Garden', category: 'Pastas',
    description: 'Cocina vegetariana y vegana creativa. Saludable y deliciosa.',
    image: 'https://picsum.photos/seed/veggie/400/250',
    logo: 'https://picsum.photos/seed/logoveggie/80/80',
    coverImage: 'https://picsum.photos/seed/coverveggie/1200/400',
    rating: 4.6, reviews: 88, distance: 1.1, deliveryTime: 22, isOpen: true,
    address: 'Naturaleza 765, Buceo', phone: '+598 2 0123456',
    menuCategories: ['Bowls', 'Wraps', 'Ensaladas', 'Smoothies'], deliveryCost: 85, minOrder: 200,
  },
];

export const PLATOS: Plato[] = [
  { id: 'plato_001', localId: 'local_001', name: 'Pizza Margarita', description: 'Tomate San Marzano, mozzarella fior di latte, albahaca fresca y aceite de oliva.', image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002', price: 450, originalPrice: 500, discount: 10, rating: 4.9, stock: 15, category: 'Pizzas', isVisible: true },
  { id: 'plato_002', localId: 'local_001', name: 'Pizza Pepperoni', description: 'Pepperoni importado, queso mozzarella extra y oregano fresco.', image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee', price: 480, originalPrice: null, discount: null, rating: 4.7, stock: 8, category: 'Pizzas', isVisible: true },
  { id: 'plato_003', localId: 'local_001', name: 'Pizza 4 Quesos', description: 'Mozzarella, provolone, gorgonzola y parmesano gratinados.', image: 'https://images.unsplash.com/photo-1732223229355-95a1433404bf', price: 520, originalPrice: null, discount: null, rating: 4.8, stock: 10, category: 'Pizzas', isVisible: true },
  { id: 'plato_004', localId: 'local_001', name: 'Pasta Carbonara', description: 'Spaghetti con panceta, yema de huevo, pecorino romano y pimienta negra.', image: 'https://images.unsplash.com/photo-1608756687911-aa1599ab3bd9', price: 390, originalPrice: null, discount: null, rating: 4.6, stock: 12, category: 'Pastas', isVisible: true },
  { id: 'plato_005', localId: 'local_001', name: 'Pasta Bolognesa', description: 'Tagliatelle con ragu de carne lentamente cocinado durante 4 horas.', image: 'https://images.unsplash.com/photo-1611270629569-8b357cb88da9', price: 420, originalPrice: 450, discount: 7, rating: 4.5, stock: 2, category: 'Pastas', isVisible: true },
  { id: 'plato_006', localId: 'local_001', name: 'Coca-Cola 500ml', description: 'Bebida fria', image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7', price: 120, originalPrice: null, discount: null, rating: null, stock: 50, category: 'Bebidas', isVisible: true },
  { id: 'plato_007', localId: 'local_001', name: 'Agua Mineral 500ml', description: 'Con o sin gas', image: 'https://images.unsplash.com/photo-1550505095-81378a674395', price: 80, originalPrice: null, discount: null, rating: null, stock: 50, category: 'Bebidas', isVisible: true },
  { id: 'plato_008', localId: 'local_001', name: 'Tiramisu', description: 'Postre italiano clasico con mascarpone, cafe expresso y cacao.', image: 'https://images.unsplash.com/photo-1639744211487-b27e3551b07c', price: 220, originalPrice: null, discount: null, rating: 4.9, stock: 6, category: 'Postres', isVisible: true },
  { id: 'plato_009', localId: 'local_002', name: 'Sushi Mix 20 pcs', description: 'Variado de sushi con atun, salmon, langostino y vegetales. Incluye soja y wasabi.', image: 'https://picsum.photos/seed/sushimix/300/200', price: 680, originalPrice: null, discount: null, rating: 4.8, stock: 5, category: 'Sushi', isVisible: true },
  { id: 'plato_010', localId: 'local_002', name: 'Salmon Roll 8 pcs', description: 'Salmon fresco, queso crema, pepino y cebolla de verdeo.', image: 'https://picsum.photos/seed/salmonroll/300/200', price: 420, originalPrice: 480, discount: 13, rating: 4.9, stock: 8, category: 'Sushi', isVisible: true },
  { id: 'plato_011', localId: 'local_002', name: 'Ramen Tonkotsu', description: 'Caldo de cerdo concentrado, chashu, huevo marinado, nori y brotes.', image: 'https://picsum.photos/seed/tonkotsu/300/200', price: 550, originalPrice: null, discount: null, rating: 4.7, stock: 7, category: 'Ramen', isVisible: true },
  { id: 'plato_012', localId: 'local_002', name: 'Gyozas x6', description: 'Empanaditas japonesas rellenas de cerdo y verduras, a la plancha.', image: 'https://picsum.photos/seed/gyoza/300/200', price: 320, originalPrice: null, discount: null, rating: 4.6, stock: 15, category: 'Gyozas', isVisible: true },
  { id: 'plato_013', localId: 'local_003', name: 'Clasica Doble', description: 'Doble medallon de carne, queso cheddar, lechuga, tomate y salsa especial.', image: 'https://picsum.photos/seed/burgdouble/300/200', price: 490, originalPrice: null, discount: null, rating: 4.7, stock: 20, category: 'Hamburguesas', isVisible: true },
  { id: 'plato_014', localId: 'local_003', name: 'BBQ Bacon', description: 'Carne, bacon crocante, cebolla caramelizada, queso suizo y salsa BBQ.', image: 'https://picsum.photos/seed/bbqbacon/300/200', price: 540, originalPrice: 590, discount: 8, rating: 4.8, stock: 12, category: 'Hamburguesas', isVisible: true },
  { id: 'plato_015', localId: 'local_003', name: 'Papas Fritas Grandes', description: 'Papas crocantes con sal marina y dip de queso.', image: 'https://picsum.photos/seed/fries/300/200', price: 180, originalPrice: null, discount: null, rating: 4.5, stock: 30, category: 'Papas', isVisible: false },
];

export const PROMOCIONES: Promocion[] = [
  {
    id: 'promo_001', localId: 'local_001',
    name: '10% en Pizzas Clasicas',
    description: 'Descuento en todas las pizzas de la seccion clasicas',
    discountType: 'percentage', discountValue: 10,
    startDate: '2026-05-01', endDate: '2026-12-31',
    startTime: '12:00', endTime: '23:00',
    platoIds: ['plato_001', 'plato_002', 'plato_003'],
    isActive: true, createdAt: '2026-04-28',
  },
  {
    id: 'promo_002', localId: 'local_001',
    name: 'Pasta + Bebida $50 off',
    description: 'Pedi cualquier pasta y llevate una bebida con $50 de descuento',
    discountType: 'fixed', discountValue: 50,
    startDate: '2026-05-08', endDate: '2026-12-31',
    startTime: null, endTime: null,
    platoIds: ['plato_004', 'plato_005'],
    isActive: true, createdAt: '2026-05-06',
  },
  {
    id: 'promo_003', localId: 'local_001',
    name: 'Happy Hour Bebidas',
    description: '20% de descuento en bebidas de 17 a 20 hs',
    discountType: 'percentage', discountValue: 20,
    startDate: '2026-05-01', endDate: '2026-06-30',
    startTime: '17:00', endTime: '20:00',
    platoIds: ['plato_006', 'plato_007'],
    isActive: false, createdAt: '2026-04-25',
  },
];

export const PEDIDOS_MOCK: Pedido[] = [
  {
    id: 'pedido_001', numero: 1001,
    localId: 'local_001', localName: 'Pizzeria Don Carlos',
    cliente: { id: 'user_001', name: 'Mock User', phone: '+598 99 000001' },
    direccion: 'Calle 18 de Julio 1234, Apto 3B',
    items: [
      { id: 'plato_001', name: 'Pizza Margarita', quantity: 2, price: 450 },
      { id: 'plato_002', name: 'Pizza Pepperoni', quantity: 1, price: 480 },
    ],
    subtotal: 1380, delivery: 100, total: 1480,
    status: 'delivered', createdAt: '2026-05-10T14:30:00',
    estimatedDeliveryTime: 25,
  },
  {
    id: 'pedido_002', numero: 1002,
    localId: 'local_002', localName: 'Sushi House',
    cliente: { id: 'user_001', name: 'Mock User', phone: '+598 99 000001' },
    direccion: 'Calle 18 de Julio 1234, Apto 3B',
    items: [
      { id: 'plato_009', name: 'Sushi Mix 20 pcs', quantity: 1, price: 680 },
    ],
    subtotal: 680, delivery: 120, total: 800,
    status: 'confirmed', createdAt: '2026-05-18T19:45:00',
    estimatedDeliveryTime: 35,
  },
];

const pedidosCreados: Pedido[] = [];

export function obtenerPedidosCreados(): Pedido[] {
  return pedidosCreados;
}

export function agregarPedidoCreado(pedido: Pedido): void {
  pedidosCreados.unshift(pedido);
}
