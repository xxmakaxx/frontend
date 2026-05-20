export const formatearMonedaUY = (valor: number): string => {
  return new Intl.NumberFormat('es-UY', {
    style: 'currency',
    currency: 'UYU'
  }).format(valor);
};

export const formatearFecha = (fecha: string | Date): string => {
  const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
  return new Intl.DateTimeFormat('es-UY', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const formatearFechaCorta = (fecha: string | Date): string => {
  const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
  return new Intl.DateTimeFormat('es-UY', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date);
};

export const formatearHora = (fecha: string | Date): string => {
  const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
  return new Intl.DateTimeFormat('es-UY', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

export const calcularPrecioConDescuento = (
  precioOriginal: number,
  descuento: number,
  esPocentaje: boolean
): number => {
  if (esPocentaje) {
    return precioOriginal - (precioOriginal * descuento) / 100;
  }
  return precioOriginal - descuento;
};

export const calcularDescuentoMonto = (
  precioOriginal: number,
  precioFinal: number
): number => {
  return precioOriginal - precioFinal;
};

export const extraerPorcentajeDescuento = (
  precioOriginal: number,
  precioFinal: number
): number => {
  if (precioOriginal === 0) return 0;
  return ((precioOriginal - precioFinal) / precioOriginal) * 100;
};
