import { clienteHttp } from '../cliente';
import { esMockActivo } from '../mock/estado';
import { PLATOS, PROMOCIONES } from '../mock/datos';
import type { RespuestaPlatosYPromociones } from '../../tipos';

function delay(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

export async function listarPlatosYPromociones(localId: string): Promise<RespuestaPlatosYPromociones> {
  if (esMockActivo()) {
    await delay(300);
    const platos = PLATOS.filter(p => p.localId === localId && p.isVisible);
    const hoy = new Date().toISOString().slice(0, 10);
    const promociones = PROMOCIONES.filter(
      p => p.localId === localId && p.isActive && p.startDate <= hoy && p.endDate >= hoy
    );
    return { platos, promociones };
  }
  const { data } = await clienteHttp.get<RespuestaPlatosYPromociones>(`/locales/${localId}/menu`);
  return data;
}
