import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { iniciarSesion as apiIniciarSesion, registrarUsuario as apiRegistrar } from '../api/endpoints/autenticacion';
import type { Usuario, DatosRegistro } from '../tipos';

interface EstadoAutenticacion {
  usuario: Usuario | null;
  token: string | null;
  estaAutenticado: boolean;
  iniciarSesion: (email: string, clave: string) => Promise<void>;
  registrar: (datos: DatosRegistro) => Promise<void>;
  cerrarSesion: () => void;
}

export const useAutenticacionStore = create<EstadoAutenticacion>()(
  persist(
    (set) => ({
      usuario: null,
      token: null,
      estaAutenticado: false,

      iniciarSesion: async (email, clave) => {
        const { usuario, token } = await apiIniciarSesion(email, clave);
        set({ usuario, token, estaAutenticado: true });
      },

      registrar: async (datos) => {
        const { usuario, token } = await apiRegistrar(datos);
        set({ usuario, token, estaAutenticado: true });
      },

      cerrarSesion: () => set({ usuario: null, token: null, estaAutenticado: false }),
    }),
    { name: 'alamesa-autenticacion' }
  )
);
