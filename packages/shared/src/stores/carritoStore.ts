import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Plato, ItemCarrito } from '../tipos';

interface EstadoCarrito {
  items: ItemCarrito[];
  localId: string | null;
  costoEnvio: number;
  agregarItem: (plato: Plato, localId: string, costoEnvio: number) => void;
  quitarItem: (platoId: string) => void;
  actualizarCantidad: (platoId: string, cantidad: number) => void;
  vaciar: () => void;
}

export const useCarritoStore = create<EstadoCarrito>()(
  persist(
    (set, get) => ({
      items: [],
      localId: null,
      costoEnvio: 0,

      agregarItem: (plato, localId, costoEnvio) => {
        const estado = get();
        if (estado.localId && estado.localId !== localId) {
          set({
            items: [{ ...plato, cantidad: 1 }],
            localId,
            costoEnvio,
          });
          return;
        }
        const existente = estado.items.find(i => i.id === plato.id);
        if (existente) {
          set({
            items: estado.items.map(i =>
              i.id === plato.id ? { ...i, cantidad: i.cantidad + 1 } : i
            ),
            localId,
            costoEnvio,
          });
        } else {
          set({
            items: [...estado.items, { ...plato, cantidad: 1 }],
            localId,
            costoEnvio,
          });
        }
      },

      quitarItem: (platoId) => {
        const items = get().items.filter(i => i.id !== platoId);
        set({ items, localId: items.length === 0 ? null : get().localId });
      },

      actualizarCantidad: (platoId, cantidad) => {
        if (cantidad <= 0) {
          get().quitarItem(platoId);
          return;
        }
        set({
          items: get().items.map(i => i.id === platoId ? { ...i, cantidad } : i),
        });
      },

      vaciar: () => set({ items: [], localId: null, costoEnvio: 0 }),
    }),
    { name: 'alamesa-carrito' }
  )
);

export const useCarritoSubtotal = () =>
  useCarritoStore(state => state.items.reduce((s, i) => s + i.price * i.cantidad, 0));

export const useCarritoCantidad = () =>
  useCarritoStore(state => state.items.reduce((s, i) => s + i.cantidad, 0));

export const useCarritoTotal = () => {
  const subtotal = useCarritoSubtotal();
  //  Pedimos las propiedades por separado para no generar objetos nuevos en el render
  const costoEnvio = useCarritoStore(state => state.costoEnvio);
  const tieneItems = useCarritoStore(state => state.items.length > 0);

  return subtotal + (tieneItems ? costoEnvio : 0);
};
