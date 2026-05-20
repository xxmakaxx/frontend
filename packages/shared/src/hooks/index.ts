import { useQuery, useMutation } from '@tanstack/react-query';
import {
  localesEndpoints,
  platosEndpoints,
  pedidosEndpoints,
  autenticacionEndpoints
} from '../api/endpoints';

export const useLocales = (opciones?: { categoria?: string; busqueda?: string }) => {
  return useQuery({
    queryKey: ['locales', opciones],
    queryFn: () => localesEndpoints.listar(opciones),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000
  });
};

export const useLocalDetalle = (localId: string) => {
  return useQuery({
    queryKey: ['local', localId],
    queryFn: () => localesEndpoints.obtener(localId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!localId
  });
};

export const usePlatosYPromociones = (localId: string) => {
  return useQuery({
    queryKey: ['platos-promociones', localId],
    queryFn: () => localesEndpoints.listarPlatosYPromociones(localId),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!localId
  });
};

export const usePedidos = () => {
  return useQuery({
    queryKey: ['pedidos'],
    queryFn: () => pedidosEndpoints.listar(),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000
  });
};

export const usePedidoDetalle = (pedidoId: string) => {
  return useQuery({
    queryKey: ['pedido', pedidoId],
    queryFn: () => pedidosEndpoints.obtener(pedidoId),
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    enabled: !!pedidoId
  });
};

export const useCrearPedido = () => {
  return useMutation({
    mutationFn: pedidosEndpoints.crear
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      autenticacionEndpoints.login({ email, password })
  });
};

export const useRegistro = () => {
  return useMutation({
    mutationFn: ({
      nombre,
      email,
      password,
      telefono
    }: {
      nombre: string;
      email: string;
      password: string;
      telefono?: string;
    }) => autenticacionEndpoints.registro({ name: nombre, email, password, phone: telefono })
  });
};
