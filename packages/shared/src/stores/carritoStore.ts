import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ItemCarrito } from '../types';

interface CarritoStore {
  items: ItemCarrito[];
  localId: string | null;
  agregarItem: (item: ItemCarrito) => void;
  eliminarItem: (platoId: string) => void;
  actualizarCantidad: (platoId: string, cantidad: number) => void;
  vaciar: () => void;
  obtenerTotal: () => number;
  cambiarLocal: (nuevoLocalId: string) => void;
  puedoAgregarDe: (localId: string) => boolean;
}

export const usCarritoStore = create<CarritoStore>()(
  persist(
    (set, get) => ({
      items: [],
      localId: null,

      agregarItem: (item: ItemCarrito) => {
        set((state) => {
          const itemExistente = state.items.find((i) => i.platoId === item.platoId);

          if (itemExistente) {
            return {
              items: state.items.map((i) =>
                i.platoId === item.platoId ? { ...i, cantidad: i.cantidad + item.cantidad } : i
              )
            };
          }

          return {
            items: [...state.items, item],
            localId: item.platoId ? state.localId : state.localId
          };
        });
      },

      eliminarItem: (platoId: string) => {
        set((state) => ({
          items: state.items.filter((i) => i.platoId !== platoId)
        }));
      },

      actualizarCantidad: (platoId: string, cantidad: number) => {
        if (cantidad <= 0) {
          get().eliminarItem(platoId);
          return;
        }

        set((state) => ({
          items: state.items.map((i) =>
            i.platoId === platoId ? { ...i, cantidad } : i
          )
        }));
      },

      vaciar: () => {
        set({ items: [], localId: null });
      },

      obtenerTotal: () => {
        return get().items.reduce((total, item) => total + item.precioUnitario * item.cantidad, 0);
      },

      cambiarLocal: (nuevoLocalId: string) => {
        set({ items: [], localId: nuevoLocalId });
      },

      puedoAgregarDe: (localId: string): boolean => {
        const state = get();
        return state.localId === null || state.localId === localId;
      }
    }),
    {
      name: 'carrito-storage',
      partialize: (state) => ({
        items: state.items,
        localId: state.localId
      })
    }
  )
);
