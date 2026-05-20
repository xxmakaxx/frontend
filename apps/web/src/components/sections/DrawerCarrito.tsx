import { useNavigate } from 'react-router-dom';
import {
  useCarritoStore,
  useCarritoSubtotal,
  useCarritoTotal,
  useAutenticacionStore,
  formatearMoneda,
} from '@alamesa/shared';
import { Button } from '../base/Button';
import { Divider } from '../base/Divider';
import './DrawerCarrito.css';

interface DrawerCarritoProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DrawerCarrito = ({ isOpen, onClose }: DrawerCarritoProps) => {
  const { items, costoEnvio, actualizarCantidad, quitarItem } = useCarritoStore();
  const subtotal = useCarritoSubtotal();
  const total = useCarritoTotal();
  const estaAutenticado = useAutenticacionStore(state => state.estaAutenticado);
  const navigate = useNavigate();

  const handleCheckout = () => {
    onClose();
    if (estaAutenticado) {
      navigate('/checkout');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      {isOpen && <div className="cart-overlay" onClick={onClose} />}
      <div className={`cart-drawer${isOpen ? ' cart-drawer--open' : ''}`}>
        <div className="cart-drawer__header">
          <h2>Tu Carrito</h2>
          <button className="cart-drawer__cerrar" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="cart-drawer__cuerpo">
          {items.length === 0 ? (
            <div className="cart-drawer__vacio">
              <svg className="cart-drawer__vacio-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <p>Tu carrito esta vacio</p>
              <p className="body-small">Agrega platos desde el menu del local</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item__img" />
                <div className="cart-item__info">
                  <p className="cart-item__nombre">{item.name}</p>
                  <p className="cart-item__precio">{formatearMoneda(item.price)}</p>
                </div>
                <div className="cart-item__controles">
                  <button className="cart-item__btn-cant" onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}>-</button>
                  <span className="cart-item__cant">{item.cantidad}</span>
                  <button className="cart-item__btn-cant" onClick={() => actualizarCantidad(item.id, item.cantidad + 1)}>+</button>
                  <button className="cart-item__quitar" onClick={() => quitarItem(item.id)}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer__pie">
            <div className="cart-resumen">
              <div className="cart-resumen__fila"><span>Subtotal</span><span>{formatearMoneda(subtotal)}</span></div>
              <div className="cart-resumen__fila"><span>Envio</span><span>{formatearMoneda(costoEnvio)}</span></div>
              <Divider />
              <div className="cart-resumen__fila cart-resumen__fila--total"><span>Total</span><span>{formatearMoneda(total)}</span></div>
            </div>
            <Button variant="primary" fullWidth onClick={handleCheckout}>
              {estaAutenticado ? 'Ir a Pagar' : 'Iniciar sesion para pagar'}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
