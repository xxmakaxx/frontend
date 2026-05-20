export interface Local {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  logo: string;
  coverImage: string;
  rating: number;
  reviews: number;
  distance: number;
  deliveryTime: number;
  isOpen: boolean;
  address: string;
  phone: string;
  menuCategories: string[];
  deliveryCost: number;
  minOrder: number;
}

export interface Plato {
  id: string;
  localId: string;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice: number | null;
  discount: number | null;
  rating: number | null;
  stock: number;
  category: string;
  isVisible: boolean;
}

export interface Promocion {
  id: string;
  localId: string;
  name: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  startDate: string;
  endDate: string;
  startTime: string | null;
  endTime: string | null;
  platoIds: string[];
  isActive: boolean;
  createdAt: string;
}

export interface Usuario {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'client' | 'admin' | 'local_admin';
  createdAt: string;
  localId?: string;
}

export interface ItemCarrito {
  platoId: string;
  cantidad: number;
  precioUnitario: number;
  nombre: string;
  imagen?: string;
}

export interface Carrito {
  items: ItemCarrito[];
  total: number;
  localId?: string;
}

export interface Pedido {
  id: string;
  usuarioId: string;
  localId: string;
  items: ItemCarrito[];
  total: number;
  direccion: string;
  estado: 'pendiente' | 'confirmado' | 'preparando' | 'enviando' | 'entregado' | 'cancelado';
  fechaCreacion: string;
  fechaEstimadaEntrega: string;
  metodoPago: 'efectivo' | 'tarjeta' | 'billetera';
}

export interface AuthResponse {
  token: string;
  usuario: Usuario;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  phone?: string;
}
