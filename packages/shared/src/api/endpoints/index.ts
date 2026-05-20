import { apiClient } from '../client';
import { crearRespuestaMock } from '../mock';
import type { Local, Plato, Promocion, AuthResponse, Pedido, LoginRequest, RegisterRequest } from '../../types';

const useMock = import.meta.env.VITE_USE_MOCK === 'true';

const procesarRespuestaMock = async (response: any) => {
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 500 + 200));
  return response;
};

export const autenticacionEndpoints = {
  login: async (credenciales: LoginRequest): Promise<AuthResponse> => {
    if (useMock) {
      try {
        const respuesta = crearRespuestaMock('/auth/login', 'POST', credenciales);
        return procesarRespuestaMock(respuesta);
      } catch (error) {
        throw error;
      }
    }
    const { data } = await apiClient.post<AuthResponse>('/auth/login', credenciales);
    return data;
  },

  registro: async (datos: RegisterRequest): Promise<AuthResponse> => {
    if (useMock) {
      try {
        const respuesta = crearRespuestaMock('/auth/registro', 'POST', datos);
        return procesarRespuestaMock(respuesta);
      } catch (error) {
        throw error;
      }
    }
    const { data } = await apiClient.post<AuthResponse>('/auth/registro', datos);
    return data;
  }
};

export const localesEndpoints = {
  listar: async (opciones?: { categoria?: string; busqueda?: string }): Promise<Local[]> => {
    if (useMock) {
      const params = new URLSearchParams();
      if (opciones?.categoria) params.append('categoria', opciones.categoria);
      if (opciones?.busqueda) params.append('busqueda', opciones.busqueda);

      const url = params.toString() ? `/locales?${params.toString()}` : '/locales';
      const respuesta = crearRespuestaMock(url, 'GET');
      return procesarRespuestaMock(respuesta);
    }

    const { data } = await apiClient.get<Local[]>('/locales', { params: opciones });
    return data;
  },

  obtener: async (id: string): Promise<Local> => {
    if (useMock) {
      const respuesta = crearRespuestaMock(`/locales/${id}`, 'GET');
      return procesarRespuestaMock(respuesta);
    }
    const { data } = await apiClient.get<Local>(`/locales/${id}`);
    return data;
  },

  listarPlatosYPromociones: async (
    localId: string
  ): Promise<{ platos: Plato[]; promociones: Promocion[] }> => {
    if (useMock) {
      const respuesta = crearRespuestaMock(`/locales/${localId}/platos`, 'GET');
      return procesarRespuestaMock(respuesta);
    }
    const { data } = await apiClient.get(`/locales/${localId}/platos`);
    return data;
  }
};

export const platosEndpoints = {
  obtener: async (id: string): Promise<Plato> => {
    if (useMock) {
      const respuesta = crearRespuestaMock(`/platos/${id}`, 'GET');
      return procesarRespuestaMock(respuesta);
    }
    const { data } = await apiClient.get<Plato>(`/platos/${id}`);
    return data;
  }
};

export const pedidosEndpoints = {
  listar: async (): Promise<Pedido[]> => {
    if (useMock) {
      const respuesta = crearRespuestaMock('/pedidos', 'GET');
      return procesarRespuestaMock(respuesta);
    }
    const { data } = await apiClient.get<Pedido[]>('/pedidos');
    return data;
  },

  obtener: async (id: string): Promise<Pedido> => {
    if (useMock) {
      const respuesta = crearRespuestaMock(`/pedidos/${id}`, 'GET');
      return procesarRespuestaMock(respuesta);
    }
    const { data } = await apiClient.get<Pedido>(`/pedidos/${id}`);
    return data;
  },

  crear: async (datos: {
    localId: string;
    items: Array<{
      platoId: string;
      cantidad: number;
      precioUnitario: number;
      nombre: string;
    }>;
    total: number;
    direccion: string;
    metodoPago: 'efectivo' | 'tarjeta' | 'billetera';
  }): Promise<Pedido> => {
    if (useMock) {
      const respuesta = crearRespuestaMock('/pedidos', 'POST', {
        ...datos,
        usuarioId: 'mockuser_001'
      });
      return procesarRespuestaMock(respuesta);
    }
    const { data } = await apiClient.post<Pedido>('/pedidos', datos);
    return data;
  }
};
