export type EstadoPedido = 'pending' | 'confirmed' | 'delivered' | 'cancelled';
export type TipoDescuento = 'percentage' | 'fixed';
export type VarianteBadge = 'default' | 'primary' | 'success' | 'warning' | 'info' | 'danger';

export interface Usuario {
  id: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}

export interface DatosRegistro {
  nombre: string;
  apellido: string;
  email: string;
  clave: string;
  documento?: string;
  calle?: string;
  numero?: string;
  barrio?: string;
}

export interface RespuestaAuth {
  usuario: Usuario;
  token: string;
}

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

export interface ItemCarrito extends Plato {
  cantidad: number;
}

export interface ItemPedido {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface ClientePedido {
  id: string;
  name: string;
  phone: string;
}

export interface Pedido {
  id: string;
  numero: number;
  localId: string;
  localName: string;
  cliente: ClientePedido;
  direccion: string;
  items: ItemPedido[];
  subtotal: number;
  delivery: number;
  total: number;
  status: EstadoPedido;
  createdAt: string;
  estimatedDeliveryTime: number;
}

export interface Promocion {
  id: string;
  localId: string;
  name: string;
  description: string;
  discountType: TipoDescuento;
  discountValue: number;
  startDate: string;
  endDate: string;
  startTime: string | null;
  endTime: string | null;
  platoIds: string[];
  isActive: boolean;
  createdAt: string;
}

export interface DatosPedido {
  localId: string;
  items: Array<{ platoId: string; cantidad: number; precio: number; nombre: string }>;
  calle: string;
  numero: string;
  apto?: string;
  notas?: string;
}

export interface FiltrosLocales {
  categoria?: string | null;
  calificacionMin?: number;
  soloAbiertos?: boolean;
}

export interface RespuestaPlatosYPromociones {
  platos: Plato[];
  promociones: Promocion[];
}
