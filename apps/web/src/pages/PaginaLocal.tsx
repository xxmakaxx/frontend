import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocalDetalle, useCarritoStore, formatearMoneda, type Plato } from '@alamesa/shared';
import { EncabezadoCliente } from '../components/layout/EncabezadoCliente';
import { LocalHero } from '../components/sections/LocalHero';
import { PlatoCard } from '../components/sections/PlatoCard';
import { DrawerCarrito } from '../components/sections/DrawerCarrito';
import './PaginaLocal.css';

export default function PaginaLocal() {
  const { id } = useParams<{ id: string }>();
  const { data, isPending, error } = useLocalDetalle(id);
  const agregarItem = useCarritoStore(state => state.agregarItem);
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState<string | null>(null);

  const handleAgregarItem = (plato: Plato) => {
    if (!data) return;
    agregarItem(plato, data.local.id, data.local.deliveryCost);
    setCarritoAbierto(true);
  };

  if (isPending) {
    return (
      <div className="pagina-local">
        <EncabezadoCliente onCartOpen={() => setCarritoAbierto(true)} />
        <div className="pagina-local__cargando">Cargando menu...</div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="pagina-local">
        <EncabezadoCliente onCartOpen={() => setCarritoAbierto(true)} />
        <div className="pagina-local__cargando">Local no encontrado.</div>
      </div>
    );
  }

  const { local, platos, promociones } = data;
  const categorias = [...new Set(platos.map(p => p.category))];
  const platosVisibles = categoriaActiva ? platos.filter(p => p.category === categoriaActiva) : platos;

  return (
    <div className="pagina-local">
      <EncabezadoCliente onCartOpen={() => setCarritoAbierto(true)} />

      <LocalHero local={local} />

      <div className="pagina-local__cuerpo">

        {promociones.length > 0 && (
          <section className="promos-section">
            <h3 className="promos-section__titulo">Promociones activas</h3>
            <div className="promos-lista">
              {promociones.map(promo => (
                <div key={promo.id} className="promo-card">
                  <div className="promo-card__descuento">
                    {promo.discountType === 'percentage'
                      ? `-${promo.discountValue}%`
                      : `-${formatearMoneda(promo.discountValue)}`}
                  </div>
                  <div className="promo-card__info">
                    <h4 className="promo-card__nombre">{promo.name}</h4>
                    <p className="promo-card__desc body-small">{promo.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {categorias.length > 1 && (
          <div className="categoria-tabs">
            <button
              className={`categoria-tab${!categoriaActiva ? ' categoria-tab--activo' : ''}`}
              onClick={() => setCategoriaActiva(null)}
            >
              Todos
            </button>
            {categorias.map((cat) => (
              <button
                key={cat}
                className={`categoria-tab${categoriaActiva === cat ? ' categoria-tab--activo' : ''}`}
                onClick={() => setCategoriaActiva(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="pagina-local__info-bar">
          <span className="body-small">Envio: {formatearMoneda(local.deliveryCost)}</span>
          <span className="body-small">Pedido minimo: {formatearMoneda(local.minOrder)}</span>
          <span className="body-small">{local.address}</span>
        </div>

        <div className="platos-grid">
          {platosVisibles.map((plato) => (
            <PlatoCard key={plato.id} plato={plato} onAgregar={handleAgregarItem} />
          ))}
        </div>
      </div>

      <DrawerCarrito isOpen={carritoAbierto} onClose={() => setCarritoAbierto(false)} />
    </div>
  );
}
