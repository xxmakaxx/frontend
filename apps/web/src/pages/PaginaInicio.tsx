import { useState } from 'react';
import { useLocales } from '@alamesa/shared';
import { Card, Input } from '@/components/base';
import './PaginaInicio.css';
import { Link } from 'react-router';

export const PaginaInicio = () => {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('todos');
  const { data: locales = [], isLoading, error } = useLocales({
    busqueda: busqueda || undefined,
    categoria: categoria !== 'todos' ? categoria : undefined
  });

  const categorias = ['todos', 'Pizzería', 'Sushi', 'Hamburguesas', 'Cevichería', 'Pastas'];

  return (
    <div className="inicio-pagina">
      <div className="inicio-pagina__contenedor">
        <div className="inicio-pagina__busqueda">
          <Input
            type="text"
            placeholder="Buscar locales..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="inicio-pagina__filtros">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={`filtro-boton ${categoria === cat ? 'filtro-boton--activo' : ''}`}
              onClick={() => setCategoria(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading && <div className="inicio-pagina__cargando">Cargando locales...</div>}
        {error && <div className="inicio-pagina__error">Error al cargar los locales</div>}

        <div className="inicio-pagina__locales">
          {locales.map((local) => (
            <Link key={local.id} to={`/local/${local.id}`} className="local-tarjeta-link">
              <Card className="local-tarjeta">
                <div className="local-tarjeta__imagen">
                  <img src={local.image} alt={local.name} />
                  {!local.isOpen && <div className="local-tarjeta__cerrado">Cerrado</div>}
                </div>
                <div className="local-tarjeta__contenido">
                  <h3 className="local-tarjeta__nombre">{local.name}</h3>
                  <p className="local-tarjeta__categoria">{local.category}</p>
                  <p className="local-tarjeta__descripcion">{local.description}</p>

                  <div className="local-tarjeta__meta">
                    <div className="local-tarjeta__rating">
                      ⭐ {local.rating} ({local.reviews})
                    </div>
                    <div className="local-tarjeta__tiempo">
                      ⏱ {local.deliveryTime}min
                    </div>
                    <div className="local-tarjeta__distancia">
                      📍 {local.distance}km
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {locales.length === 0 && !isLoading && (
          <div className="inicio-pagina__vacio">
            <p>No se encontraron locales</p>
          </div>
        )}
      </div>
    </div>
  );
};
