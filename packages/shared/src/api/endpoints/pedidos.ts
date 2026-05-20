import { clienteHttp } from '../cliente';
import { esMockActivo } from '../mock/estado';
import { LOCALES, PEDIDOS_MOCK, agregarPedidoCreado, obtenerPedidosCreados } from '../mock/datos';
import type { Pedido, DatosPedido } from '../../tipos';

function delay(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

export async function crearPedido(datos: DatosPedido): Promise<Pedido> {
  if (esMockActivo()) {
    await delay(800);
    const local = LOCALES.find(l => l.id === datos.localId);
    if (!local) throw new Error('Local no encontrado');
    const subtotal = datos.items.reduce((s, i) => s + i.precio * i.cantidad, 0);
    const numero = 1003 + obtenerPedidosCreados().length;
    const nuevoPedido: Pedido = {
      id: `pedido_${Date.now()}`,
      numero,
      localId: datos.localId,
      localName: local.name,
      cliente: { id: 'user_001', name: 'Mock User', phone: '+598 99 000001' },
      direccion: `${datos.calle} ${datos.numero}${datos.apto ? `, ${datos.apto}` : ''}`,
      items: datos.items.map(i => ({
        id: i.platoId,
        name: i.nombre,
        quantity: i.cantidad,
        price: i.precio,
      })),
      subtotal,
      delivery: local.deliveryCost,
      total: subtotal + local.deliveryCost,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedDeliveryTime: local.deliveryTime,
    };
    agregarPedidoCreado(nuevoPedido);
    return nuevoPedido;
  }
  const { data } = await clienteHttp.post<Pedido>('/pedidos', datos);
  return data;
}

export async function listarMisPedidos(): Promise<Pedido[]> {
  if (esMockActivo()) {
    await delay(300);
    return [...obtenerPedidosCreados(), ...PEDIDOS_MOCK];
  }
  const { data } = await clienteHttp.get<Pedido[]>('/pedidos/mis-pedidos');
  return data;
}
