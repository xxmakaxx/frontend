import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useCarritoStore,
  useCarritoSubtotal,
  useCarritoTotal,
  crearPedido,
  esquemaCheckout,
  formatearMoneda,
} from '@alamesa/shared';
import { EncabezadoCliente } from '../components/layout/EncabezadoCliente';
import { Input, Textarea } from '../components/base/Input';
import { Button } from '../components/base/Button';
import { Divider } from '../components/base/Divider';
import './PaginaCheckout.css';

type Errores = Partial<Record<string, string>>;

export default function PaginaCheckout() {
  const { items, localId, costoEnvio, vaciar } = useCarritoStore();
  const subtotal = useCarritoSubtotal();
  const total = useCarritoTotal();
  const navigate = useNavigate();

  const [form, setForm] = useState({ calle: '', numero: '', apto: '', notas: '' });
  const [errores, setErrores] = useState<Errores>({});
  const [enviando, setEnviando] = useState(false);
  const [confirmado, setConfirmado] = useState(false);

  const handleChange = (campo: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [campo]: e.target.value }));
    if (errores[campo]) setErrores(prev => ({ ...prev, [campo]: undefined }));
  };

  const handleConfirmar = async () => {
    const resultado = esquemaCheckout.safeParse(form);
    if (!resultado.success) {
      const mapa: Errores = {};
      resultado.error.errors.forEach(err => {
        if (err.path[0]) mapa[String(err.path[0])] = err.message;
      });
      setErrores(mapa);
      return;
    }
    if (!localId || items.length === 0) return;
    setEnviando(true);
    try {
      await crearPedido({
        localId,
        items: items.map(i => ({ platoId: i.id, cantidad: i.cantidad, precio: i.price, nombre: i.name })),
        calle: form.calle,
        numero: form.numero,
        apto: form.apto || undefined,
        notas: form.notas || undefined,
      });
      setConfirmado(true);
      vaciar();
      setTimeout(() => navigate('/mis-pedidos'), 2000);
    } catch {
      setErrores({ notas: 'Hubo un error al procesar el pedido. Intenta de nuevo.' });
    } finally {
      setEnviando(false);
    }
  };

  if (items.length === 0 && !confirmado) {
    return (
      <div className="pagina-checkout">
        <EncabezadoCliente />
        <div className="checkout-vacio">
          <p>No tenes items en el carrito.</p>
          <Button variant="ghost" onClick={() => navigate('/')}>Volver al inicio</Button>
        </div>
      </div>
    );
  }

  if (confirmado) {
    return (
      <div className="pagina-checkout">
        <EncabezadoCliente />
        <div className="checkout-exito">
          <div className="checkout-exito__ico">OK</div>
          <h2>Pedido confirmado!</h2>
          <p>Tu pedido fue enviado al local. Redirigiendo a tus pedidos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pagina-checkout">
      <EncabezadoCliente />
      <div className="checkout-container">
        <h1 className="checkout-titulo">Confirmar Pedido</h1>

        <div className="checkout-grid">
          <div className="checkout-main">
            <section className="checkout-seccion">
              <h2 className="checkout-seccion__titulo">Tu Carrito</h2>
              {items.map((item) => (
                <div key={item.id} className="checkout-item">
                  <span>{item.cantidad}x {item.name}</span>
                  <span>{formatearMoneda(item.price * item.cantidad)}</span>
                </div>
              ))}
              <Divider />
              <div className="checkout-item"><span>Subtotal</span><span>{formatearMoneda(subtotal)}</span></div>
              <div className="checkout-item"><span>Envio</span><span>{formatearMoneda(costoEnvio)}</span></div>
              <Divider />
              <div className="checkout-item checkout-item--total"><span>Total</span><span>{formatearMoneda(total)}</span></div>
            </section>

            <section className="checkout-seccion">
              <h2 className="checkout-seccion__titulo">Direccion de Entrega</h2>
              <div className="checkout-form-grid">
                <Input
                  label="Calle"
                  required
                  value={form.calle}
                  onChange={handleChange('calle')}
                  error={errores.calle}
                  placeholder="Av. 18 de Julio"
                  className="checkout-campo-full"
                />
                <Input
                  label="Numero"
                  required
                  value={form.numero}
                  onChange={handleChange('numero')}
                  error={errores.numero}
                  placeholder="1234"
                />
                <Input
                  label="Apto / Piso"
                  value={form.apto}
                  onChange={handleChange('apto')}
                  placeholder="3B"
                />
              </div>
              <Textarea
                label="Notas para el repartidor"
                placeholder="Ej: Tocar timbre 2 veces, dejar en puerta..."
                value={form.notas}
                onChange={handleChange('notas')}
                rows={3}
              />
              {errores.notas && <p style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)', marginTop: 'var(--space-2)' }}>{errores.notas}</p>}
            </section>
          </div>

          <aside className="checkout-aside">
            <div className="checkout-resumen-card">
              <h3>Resumen</h3>
              <div className="checkout-resumen-fila"><span>Subtotal</span><span>{formatearMoneda(subtotal)}</span></div>
              <div className="checkout-resumen-fila"><span>Envio</span><span>{formatearMoneda(costoEnvio)}</span></div>
              <Divider />
              <div className="checkout-resumen-fila checkout-resumen-fila--total"><span>Total</span><span>{formatearMoneda(total)}</span></div>
              <Button variant="primary" fullWidth size="lg" onClick={handleConfirmar} disabled={enviando} style={{ marginTop: 'var(--space-4)' }}>
                {enviando ? 'Procesando...' : 'Confirmar Pedido'}
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}