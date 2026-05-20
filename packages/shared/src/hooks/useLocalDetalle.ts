import { useQuery } from '@tanstack/react-query';
import { obtenerLocal } from '../api/endpoints/locales';
import { listarPlatosYPromociones } from '../api/endpoints/platos';

export function useLocalDetalle(localId: string | undefined) {
  return useQuery({
    queryKey: ['local', localId],
    queryFn: async () => {
      const [local, { platos, promociones }] = await Promise.all([
        obtenerLocal(localId!),
        listarPlatosYPromociones(localId!),
      ]);
      return { local, platos, promociones };
    },
    enabled: !!localId,
    staleTime: 5 * 60 * 1000,
  });
}
