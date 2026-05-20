import { useQuery } from '@tanstack/react-query';
import { listarLocales } from '../api/endpoints/locales';

export function useLocales() {
  return useQuery({
    queryKey: ['locales'],
    queryFn: listarLocales,
    staleTime: 5 * 60 * 1000,
  });
}
