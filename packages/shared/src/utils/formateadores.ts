import type { EstadoPedido, VarianteBadge } from '../tipos';

export const formatearMoneda = (monto: number): string =>
  `$${Number(monto).toLocaleString('es-UY')}`;

export const formatearFecha = (isoString: string): string => {
  const d = new Date(isoString);
  return d.toLocaleDateString('es-UY', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

export const formatearFechaHora = (isoString: string): string => {
  const d = new Date(isoString);
  return `${d.toLocaleDateString('es-UY', { day: '2-digit', month: '2-digit', year: 'numeric' })} - ${d.toLocaleTimeString('es-UY', { hour: '2-digit', minute: '2-digit' })}`;
};

export const etiquetaEstado = (estado: EstadoPedido): string =>
  ({
    pending: 'Pendiente',
    confirmed: 'Confirmado',
    delivered: 'Entregado',
    cancelled: 'Cancelado',
  }[estado] ?? estado);

export const varianteEstado = (estado: EstadoPedido): VarianteBadge =>
  ({
    pending: 'warning' as VarianteBadge,
    confirmed: 'info' as VarianteBadge,
    delivered: 'success' as VarianteBadge,
    cancelled: 'danger' as VarianteBadge,
  }[estado] ?? 'default');

export const iniciales = (nombre: string, apellido: string): string =>
  `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
