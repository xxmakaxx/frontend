import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  usCarritoStore,
  usAutenticacionStore,
  formatearMonedaUY,
  checkoutSchema,
  type CheckoutInput
} from '@alamesa/shared';
import { useCrearPedido } from '@alamesa/shared';
import { Button, Input, Card } from '@/components/base';
import './CheckoutPagina.css';

export const CheckoutPagina = () => {
  const navigate = useNavigate();
  const { items, obtenerTotal, localId, vaciar } = usCarritoStore();
  const { usuario } = usAutenticacionStore();
  const { mutate: crearPedido, isPending } = useCrearPedido();

  const [formData, setFormData] = useState({
    calle: '',
    numero: '',
    apartamento: '',
    localidad: '',
    referencia: '',
    metodoPago: 'tarjeta' as const
  });

  const [errores, setErrores] = useState<Record<string, string>>({});
  const [enviado, setEnviado] = useState(false);

  if (!usuario) {
    return (
      <div className="checkout-pagina">
        <div className="checkout-pagina__contenedor">
          <Card>
            <p>Debe iniciar sesión para realizar un pedido</p>
            <Button onClick={() => navigate('/login')} variante="primary">
              Ir a Login
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (items.length === 0 && !enviado) {
    return (
      <div className="checkout-pagina">
        <div className="checkout-pagina__contenedor">
          <Card>
            <p>El carrito está vacío</p>
            <Button onClick={() => navigate('/')} variante="primary">
              Volver al Inicio
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrores({});

    try {
      const datosValidados = checkoutSchema.parse(formData);

      crearPedido(
        {
          localId: localId!,
          items: items.map((i) => ({
            platoId: i.platoId,
            cantidad: i.cantidad,
            precioUnitario: i.precioUnitario,
            nombre: i.nombre
          })),
          total: obtenerTotal(),
          direccion: `${datosValidados.direccion.calle} ${datosValidados.direccion.numero}${datosValidados.direccion.apartamento ? `, ${datosValidados.direccion.apartamento}` : ''}, ${datosValidados.direccion.localidad}`,
          metodoPago: datosValidados.metodoPago
        },
        {
          onSuccess: () => {
            setEnviado(true);
            vaciar();
            setTimeout(() => {
              navigate('/mis-pedidos');
            }, 3000);
          },
          onError: (error) => {
            setErrores({ general: error instanceof Error ? error.message : 'Error al crear pedido' });
          }
        }
      );
    } catch (err) {
      if (err instanceof Error && 'errors' in err) {
        const zodErrores = err as any;
        const nuevosErrores: Record<string, string> = {};
        zodErrores.errors.forEach((e: any) => {
          const path = e.path.join('.');
          nuevosErrores[path] = e.message;
        });
        setErrores(nuevosErrores);
      }
    }
  };

  if (enviado) {
    return (
      <div className="checkout-pagina">
        <div className="checkout-pagina__contenedor">
          <Card className="checkout-pagina__exito">
            <h2>¡Pedido confirmado!</h2>
            <p>Tu pedido ha sido recibido. Redirigiendo a mis pedidos...</p>
          </Card>
        </div>
      </div>
    );
  }

  const total = obtenerTotal();

  return (
    <div className="checkout-pagina">
      <div className="checkout-pagina__contenedor">
        <div className="checkout-pagina__grid">
          <div className="checkout-pagina__formulario-contenedor">
            <Card>
              <h1 className="checkout-pagina__titulo">Dirección de Entrega</h1>

              {errores.general && (
                <div className="checkout-pagina__error">{errores.general}</div>
              )}

              <form onSubmit={manejarSubmit} className="checkout-pagina__formulario">
                <div className="checkout-pagina__fila">
                  <Input
                    label="Calle"
                    name="calle"
                    placeholder="Nombre de la calle"
                    value={formData.calle}
                    onChange={manejarCambio}
                    error={errores['direccion.calle']}
                    required
                  />
                  <Input
                    label="Número"
                    name="numero"
                    placeholder="1234"
                    value={formData.numero}
                    onChange={manejarCambio}
                    error={errores['direccion.numero']}
                    required
                  />
                </div>

                <Input
                  label="Apartamento / Puerta (opcional)"
                  name="apartamento"
                  placeholder="Ej: Apto 4B"
                  value={formData.apartamento}
                  onChange={manejarCambio}
                  error={errores['direccion.apartamento']}
                />

                <Input
                  label="Localidad"
                  name="localidad"
                  placeholder="Montevideo"
                  value={formData.localidad}
                  onChange={manejarCambio}
                  error={errores['direccion.localidad']}
                  required
                />

                <Input
                  label="Referencia (opcional)"
                  name="referencia"
                  placeholder="Ej: Cerca del parque"
                  value={formData.referencia}
                  onChange={manejarCambio}
                  error={errores['direccion.referencia']}
                />

                <div className="checkout-pagina__pago">
                  <label htmlFor="metodoPago" className="checkout-pagina__label">
                    Método de Pago
                  </label>
                  <select
                    id="metodoPago"
                    name="metodoPago"
                    value={formData.metodoPago}
                    onChange={manejarCambio}
                    className="checkout-pagina__select"
                  >
                    <option value="tarjeta">Tarjeta de Crédito</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="billetera">Billetera Digital</option>
                  </select>
                </div>

                <Button type="submit" variante="primary" tamanio="lg" cargando={isPending}>
                  Confirmar Pedido
                </Button>
              </form>
            </Card>
          </div>

          <aside className="checkout-pagina__resumen">
            <Card>
              <h2 className="checkout-pagina__resumen-titulo">Resumen del Pedido</h2>

              <div className="checkout-pagina__items">
                {items.map((item) => (
                  <div key={item.platoId} className="checkout-item">
                    <span className="checkout-item__nombre">{item.nombre}</span>
                    <span className="checkout-item__cantidad">x{item.cantidad}</span>
                    <span className="checkout-item__precio">
                      {formatearMonedaUY(item.precioUnitario * item.cantidad)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="checkout-pagina__totales">
                <div className="checkout-pagina__fila-total">
                  <span>Subtotal:</span>
                  <span>{formatearMonedaUY(total)}</span>
                </div>
                <div className="checkout-pagina__fila-total checkout-pagina__fila-total--final">
                  <strong>Total:</strong>
                  <strong>{formatearMonedaUY(total)}</strong>
                </div>
              </div>

              <Button onClick={() => navigate(-1)} variante="outline" tamanio="md">
                Volver al Carrito
              </Button>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};
