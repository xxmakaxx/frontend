import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { usePlatosYPromociones, usCarritoStore, formatearMonedaUY } from '@alamesa/shared';
import { Card, Button, Input } from '@/components/base';
import './LocalDetailPagina.css';

export const LocalDetailPagina = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string | null>(null);

  const { data, isLoading, error } = usePlatosYPromociones(id!);
  const { agregarItem, items, obtenerTotal } = usCarritoStore();

  if (!id) return <div>Local no válido</div>;
  if (isLoading) return <div className="local-detail__cargando">Cargando...</div>;
  if (error) return <div className="local-detail__error">Error al cargar los platos</div>;

  const { platos = [], promociones = [] } = data || {};
  const categorias = Array.from(new Set(platos.map((p) => p.category)));
  const categoriaActual = categoriaSeleccionada || categorias[0];
  const platosFiltrados = platos.filter((p) => p.category === categoriaActual);

  const manejarAgregarAlCarrito = (plato: typeof platos[0]) => {
    agregarItem({
      platoId: plato.id,
      cantidad: 1,
      precioUnitario: plato.price,
      nombre: plato.name,
      imagen: plato.image
    });
  };

  const irAlCheckout = () => {
    if (items.length === 0) {
      alert('El carrito está vacío');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="local-detail">
      <div className="local-detail__contenedor">
        <div className="local-detail__cabecera">
          <button className="local-detail__volver" onClick={() => navigate('/')}>
            ← Volver
          </button>
        </div>

        <div className="local-detail__grid">
          <div className="local-detail__platos">
            <div className="local-detail__categorias">
              {categorias.map((cat) => (
                <button
                  key={cat}
                  className={`categoria-btn ${categoriaActual === cat ? 'categoria-btn--activa' : ''}`}
                  onClick={() => setCategoriaSeleccionada(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="local-detail__lista-platos">
              {platosFiltrados.map((plato) => (
                <Card key={plato.id} className="plato-item">
                  <div className="plato-item__imagen">
                    <img src={plato.image} alt={plato.name} />
                  </div>
                  <div className="plato-item__contenido">
                    <h3 className="plato-item__nombre">{plato.name}</h3>
                    <p className="plato-item__descripcion">{plato.description}</p>

                    <div className="plato-item__meta">
                      {plato.rating && (
                        <span className="plato-item__rating">⭐ {plato.rating}</span>
                      )}
                      <span className="plato-item__stock">
                        Stock: {plato.stock}
                      </span>
                    </div>

                    <div className="plato-item__precios">
                      {plato.discount ? (
                        <>
                          <span className="plato-item__original">
                            {formatearMonedaUY(plato.originalPrice || plato.price)}
                          </span>
                          <span className="plato-item__descuento">-{plato.discount}%</span>
                        </>
                      ) : null}
                      <span className="plato-item__precio">
                        {formatearMonedaUY(plato.price)}
                      </span>
                    </div>

                    <Button
                      onClick={() => manejarAgregarAlCarrito(plato)}
                      variante="primary"
                      tamanio="sm"
                    >
                      Agregar al carrito
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <aside className="local-detail__carrito">
            <Card>
              <h2 className="local-detail__carrito-titulo">Carrito</h2>

              {items.length === 0 ? (
                <p className="local-detail__carrito-vacio">El carrito está vacío</p>
              ) : (
                <>
                  <div className="local-detail__carrito-items">
                    {items.map((item) => (
                      <div key={item.platoId} className="carrito-item">
                        <span className="carrito-item__nombre">{item.nombre}</span>
                        <span className="carrito-item__cantidad">x{item.cantidad}</span>
                        <span className="carrito-item__precio">
                          {formatearMonedaUY(item.precioUnitario * item.cantidad)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="local-detail__carrito-total">
                    <strong>Total: {formatearMonedaUY(obtenerTotal())}</strong>
                  </div>

                  <Button onClick={irAlCheckout} variante="primary" tamanio="lg">
                    Ir a Checkout
                  </Button>
                </>
              )}
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};
