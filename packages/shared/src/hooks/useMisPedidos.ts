import { useQuery } from '@tanstack/react-query';
import { listarMisPedidos } from '../api/endpoints/pedidos';

export function useMisPedidos() {
  return useQuery({
    queryKey: ['mis-pedidos'],
    queryFn: listarMisPedidos,
    staleTime: 60 * 1000,
  });
}
