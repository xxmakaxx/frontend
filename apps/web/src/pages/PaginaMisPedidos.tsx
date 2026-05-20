import { useNavigate } from 'react-router-dom';
import { useMisPedidos, etiquetaEstado, varianteEstado, formatearFechaHora, formatearMoneda } from '@alamesa/shared';
import { EncabezadoCliente } from '../components/layout/EncabezadoCliente';
import { NavbarCliente } from '../components/layout/NavbarCliente';
import { Badge } from '../components/base/Badge';
import { Button } from '../components/base/Button';
import './PaginaMisPedidos.css';

export default function PaginaMisPedidos() {
  const { data: pedidos = [], isPending } = useMisPedidos();
  const navigate = useNavigate();

  const pedidosOrdenados = [...pedidos].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="mis-pedidos">
      <EncabezadoCliente onCartOpen={() => {}} />
      <NavbarCliente />

      <div className="mis-pedidos__container">
        <h1 className="mis-pedidos__titulo">Mis Pedidos</h1>

        {isPending ? (
          <div className="mis-pedidos__estado">Cargando pedidos...</div>
        ) : pedidosOrdenados.length === 0 ? (
          <div className="mis-pedidos__estado">
            <p>No tenes pedidos aun.</p>
            <Button variant="ghost" onClick={() => navigate('/')}>Explorar locales</Button>
          </div>
        ) : (
          <div className="pedidos-lista">
            {pedidosOrdenados.map((pedido) => (
              <div key={pedido.id} className="pedido-card">
                <div className="pedido-card__encabezado">
                  <div>
                    <h3 className="pedido-card__numero">Pedido #{pedido.numero}</h3>
                    <p className="pedido-card__local body-small">{pedido.localName}</p>
                  </div>
                  <Badge variant={varianteEstado(pedido.status)}>
                    {etiquetaEstado(pedido.status)}
                  </Badge>
                </div>

                <div className="pedido-card__cuerpo">
                  <p className="body-small">{formatearFechaHora(pedido.createdAt)}</p>
                  <p className="body-small">
                    {pedido.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                  </p>
                </div>

                <div className="pedido-card__pie">
                  <span className="pedido-card__total">{formatearMoneda(pedido.total)}</span>
                  {pedido.status === 'confirmed' && (
                    <span className="body-small pedido-card__tiempo">~{pedido.estimatedDeliveryTime} min</span>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate(`/local/${pedido.localId}`)}
                  >
                    Repetir pedido
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
