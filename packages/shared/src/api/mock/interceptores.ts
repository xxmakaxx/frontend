import { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import {
  mockLocales,
  mockPlatos,
  mockPromociones,
  mockUsuarios,
  mockPedidosCliente
} from './datos';
import { Local, Plato, Promocion, AuthResponse, Usuario, Pedido } from '../../types';
import { calcularPrecioConDescuento } from '../../utils';

interface PlatoConPromocion extends Plato {
  precioFinal?: number;
}

const usuariosRegistrados: Map<string, { email: string; password: string; usuario: Usuario }> =
  new Map();

usuariosRegistrados.set('mockuser@alamesa.food', {
  email: 'mockuser@alamesa.food',
  password: 'mockpass123',
  usuario: {
    id: 'mockuser_001',
    name: 'Usuario Mock',
    email: 'mockuser@alamesa.food',
    phone: '+598 99 999999',
    role: 'client',
    createdAt: '2024-01-01'
  }
});

const listarPlatosYPromocionesDeLocal = (
  localId: string
): { platos: PlatoConPromocion[]; promociones: Promocion[] } => {
  const platos = mockPlatos.filter((p) => p.localId === localId && p.isVisible);
  const promociones = mockPromociones.filter((promo) => promo.localId === localId);

  const platosConPromocion = platos.map((plato) => {
    const promo = promociones.find((p) => p.platoIds.includes(plato.id));
    if (promo) {
      const precioFinal = calcularPrecioConDescuento(
        plato.price,
        promo.discountValue,
        promo.discountType === 'percentage'
      );
      return {
        ...plato,
        discount: promo.discountValue,
        precioFinal
      };
    }
    return plato;
  });

  return { platos: platosConPromocion, promociones };
};

export const configularInterceptoresMock = (apiClient: AxiosInstance) => {
  apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.metadata = { startTime: Date.now() };
    return config;
  });

  apiClient.interceptors.response.use(
    async (response: AxiosResponse) => {
      const { method, url } = response.config;
      const delay = Math.random() * 500 + 200;

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(response);
        }, delay);
      });
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const crearRespuestaMock = (urlPath: string, method: string, data?: any): any => {
  if (method === 'POST' && urlPath.includes('/auth/login')) {
    const { email, password } = data;

    if (email === 'mockuser@alamesa.food' && password === 'mockpass123') {
      const respuesta: AuthResponse = {
        token: 'mock_token_' + Date.now(),
        usuario: {
          id: 'mockuser_001',
          name: 'Usuario Mock',
          email: 'mockuser@alamesa.food',
          phone: '+598 99 999999',
          role: 'client',
          createdAt: '2024-01-01'
        }
      };
      return respuesta;
    }

    throw new Error('Email o contraseña incorrectos');
  }

  if (method === 'POST' && urlPath.includes('/auth/registro')) {
    const { email, password, name, phone } = data;

    if (usuariosRegistrados.has(email)) {
      throw new Error('El email ya está registrado');
    }

    const nuevoUsuario: Usuario = {
      id: 'user_' + Date.now(),
      name,
      email,
      phone: phone || '',
      role: 'client',
      createdAt: new Date().toISOString()
    };

    usuariosRegistrados.set(email, {
      email,
      password,
      usuario: nuevoUsuario
    });

    const respuesta: AuthResponse = {
      token: 'mock_token_' + Date.now(),
      usuario: nuevoUsuario
    };

    return respuesta;
  }

  if (method === 'GET' && urlPath.includes('/locales')) {
    const queryParams = new URLSearchParams(urlPath.split('?')[1]);
    const categoria = queryParams.get('categoria');
    const busqueda = queryParams.get('busqueda');

    let locales = [...mockLocales];

    if (categoria && categoria !== 'todos') {
      locales = locales.filter((l) => l.category === categoria);
    }

    if (busqueda) {
      const busquedaLower = busqueda.toLowerCase();
      locales = locales.filter(
        (l) =>
          l.name.toLowerCase().includes(busquedaLower) ||
          l.description.toLowerCase().includes(busquedaLower)
      );
    }

    return locales;
  }

  if (method === 'GET' && urlPath.includes('/locales/') && !urlPath.includes('/platos')) {
    const localId = urlPath.split('/locales/')[1];
    const local = mockLocales.find((l) => l.id === localId);
    if (!local) throw new Error('Local no encontrado');
    return local;
  }

  if (method === 'GET' && urlPath.includes('/locales/') && urlPath.includes('/platos')) {
    const localId = urlPath.split('/locales/')[1].split('/platos')[0];
    return listarPlatosYPromocionesDeLocal(localId);
  }

  if (method === 'GET' && urlPath.includes('/platos/') && !urlPath.includes('/locales')) {
    const platoId = urlPath.split('/platos/')[1];
    const plato = mockPlatos.find((p) => p.id === platoId);
    if (!plato) throw new Error('Plato no encontrado');
    return plato;
  }

  if (method === 'GET' && urlPath.includes('/pedidos')) {
    return mockPedidosCliente;
  }

  if (method === 'GET' && urlPath.includes('/pedidos/') && urlPath.length > 7) {
    const pedidoId = urlPath.split('/pedidos/')[1];
    const pedido = mockPedidosCliente.find((p) => p.id === pedidoId);
    if (!pedido) throw new Error('Pedido no encontrado');
    return pedido;
  }

  if (method === 'POST' && urlPath.includes('/pedidos')) {
    const nuevoPedido: Pedido = {
      id: 'pedido_' + Date.now(),
      usuarioId: data.usuarioId,
      localId: data.localId,
      items: data.items,
      total: data.total,
      direccion: data.direccion,
      estado: 'confirmado',
      fechaCreacion: new Date().toISOString(),
      fechaEstimadaEntrega: new Date(Date.now() + 30 * 60000).toISOString(),
      metodoPago: data.metodoPago
    };
    return nuevoPedido;
  }

  return null;
};
