import { clienteHttp } from '../cliente';
import { esMockActivo } from '../mock/estado';
import { LOCALES } from '../mock/datos';
import type { Local } from '../../tipos';

function delay(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

export async function listarLocales(): Promise<Local[]> {
  if (esMockActivo()) {
    await delay(300);
    return LOCALES;
  }
  const { data } = await clienteHttp.get<Local[]>('/locales');
  return data;
}

export async function obtenerLocal(id: string): Promise<Local> {
  if (esMockActivo()) {
    await delay(200);
    const local = LOCALES.find(l => l.id === id);
    if (!local) throw new Error(`Local ${id} no encontrado`);
    return local;
  }
  const { data } = await clienteHttp.get<Local>(`/locales/${id}`);
  return data;
}
