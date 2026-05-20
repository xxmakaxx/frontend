import { useNavigate } from 'react-router';
import { usePedidos, usAutenticacionStore, formatearMonedaUY, formatearFecha } from '@alamesa/shared';
import { Card, Button } from '@/components/base';
import './MisPedidosPagina.css';

export const MisPedidosPagina = () => {
  const navigate = useNavigate();
  const { usuario } = usAutenticacionStore();
  const { data: pedidos = [], isLoading, error } = usePedidos();

  if (!usuario) {
    return (
      <div className="pedidos-pagina">
        <div className="pedidos-pagina__contenedor">
          <Card>
            <p>Debe iniciar sesión para ver sus pedidos</p>
            <Button onClick={() => navigate('/login')} variante="primary">
              Ir a Login
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return <div className="pedidos-pagina__cargando">Cargando pedidos...</div>;
  }

  if (error) {
    return <div className="pedidos-pagina__error">Error al cargar los pedidos</div>;
  }

  const estadoColor = (estado: string) => {
    switch (estado) {
      case 'entregado':
        return 'var(--color-success)';
      case 'cancelado':
        return 'var(--color-error)';
      case 'enviando':
        return 'var(--color-info)';
      default:
        return 'var(--color-warning)';
    }
  };

  const estadoTexto = (estado: string) => {
    const map: Record<string, string> = {
      pendiente: 'Pendiente',
      confirmado: 'Confirmado',
      preparando: 'Preparando',
      enviando: 'Enviando',
      entregado: 'Entregado',
      cancelado: 'Cancelado'
    };
    return map[estado] || estado;
  };

  return (
    <div className="pedidos-pagina">
      <div className="pedidos-pagina__contenedor">
        <div className="pedidos-pagina__cabecera">
          <h1 className="pedidos-pagina__titulo">Mis Pedidos</h1>
          <Button onClick={() => navigate('/')} variante="outline">
            Hacer otro pedido
          </Button>
        </div>

        {pedidos.length === 0 ? (
          <Card className="pedidos-pagina__vacio">
            <p>No tienes pedidos aún</p>
            <Button onClick={() => navigate('/')} variante="primary">
              Ir al Inicio
            </Button>
          </Card>
        ) : (
          <div className="pedidos-pagina__lista">
            {pedidos.map((pedido) => (
              <Card key={pedido.id} className="pedido-card">
                <div className="pedido-card__encabezado">
                  <div>
                    <h3 className="pedido-card__id">Pedido #{pedido.id.substring(0, 8)}</h3>
                    <p className="pedido-card__fecha">{formatearFecha(pedido.fechaCreacion)}</p>
                  </div>
                  <div
                    className="pedido-card__estado"
                    style={{ borderColor: estadoColor(pedido.estado) }}
                  >
                    <span style={{ color: estadoColor(pedido.estado) }}>
                      {estadoTexto(pedido.estado)}
                    </span>
                  </div>
                </div>

                <div className="pedido-card__items">
                  <p className="pedido-card__items-titulo">Artículos:</p>
                  {pedido.items.map((item, idx) => (
                    <div key={idx} className="pedido-item">
                      <span>{item.nombre}</span>
                      <span>x{item.cantidad}</span>
                      <span>{formatearMonedaUY(item.precioUnitario * item.cantidad)}</span>
                    </div>
                  ))}
                </div>

                <div className="pedido-card__pie">
                  <div>
                    <p className="pedido-card__direccion">Entregado en: {pedido.direccion}</p>
                    <p className="pedido-card__total">
                      Total: <strong>{formatearMonedaUY(pedido.total)}</strong>
                    </p>
                  </div>
                  <Button onClick={() => navigate(`/pedido/${pedido.id}`)} variante="outline">
                    Ver Detalle
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
