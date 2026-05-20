import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Usuario, AuthResponse } from '../types';
import { autenticacionEndpoints } from '../api/endpoints';

interface AutenticacionStore {
  token: string | null;
  usuario: Usuario | null;
  cargando: boolean;
  error: string | null;
  iniciarSesion: (email: string, password: string) => Promise<void>;
  registrarse: (nombre: string, email: string, password: string, telefono?: string) => Promise<void>;
  cerrarSesion: () => void;
  establecerToken: (token: string) => void;
  establecerUsuario: (usuario: Usuario | null) => void;
}

export const usAutenticacionStore = create<AutenticacionStore>()(
  persist(
    (set) => ({
      token: null,
      usuario: null,
      cargando: false,
      error: null,

      iniciarSesion: async (email: string, password: string) => {
        set({ cargando: true, error: null });
        try {
          const respuesta = await autenticacionEndpoints.login({ email, password });
          set({
            token: respuesta.token,
            usuario: respuesta.usuario,
            cargando: false
          });
          localStorage.setItem('authToken', respuesta.token);
        } catch (error) {
          const mensaje = error instanceof Error ? error.message : 'Error desconocido';
          set({
            error: mensaje,
            cargando: false
          });
          throw error;
        }
      },

      registrarse: async (nombre: string, email: string, password: string, telefono?: string) => {
        set({ cargando: true, error: null });
        try {
          const respuesta = await autenticacionEndpoints.registro({
            name: nombre,
            email,
            password,
            phone: telefono
          });
          set({
            token: respuesta.token,
            usuario: respuesta.usuario,
            cargando: false
          });
          localStorage.setItem('authToken', respuesta.token);
        } catch (error) {
          const mensaje = error instanceof Error ? error.message : 'Error desconocido';
          set({
            error: mensaje,
            cargando: false
          });
          throw error;
        }
      },

      cerrarSesion: () => {
        set({ token: null, usuario: null, error: null });
        localStorage.removeItem('authToken');
      },

      establecerToken: (token: string) => {
        set({ token });
        localStorage.setItem('authToken', token);
      },

      establecerUsuario: (usuario: Usuario | null) => {
        set({ usuario });
      }
    }),
    {
      name: 'autenticacion-storage',
      partialize: (state) => ({
        token: state.token,
        usuario: state.usuario
      })
    }
  )
);
