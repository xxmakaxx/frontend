import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocales, type FiltrosLocales } from '@alamesa/shared';
import { EncabezadoCliente } from '../components/layout/EncabezadoCliente';
import { NavbarCliente } from '../components/layout/NavbarCliente';
import { PanelFiltros } from '../components/sections/PanelFiltros';
import { LocalCard } from '../components/sections/LocalCard';
import { DrawerCarrito } from '../components/sections/DrawerCarrito';
import './PaginaInicio.css';

export default function PaginaInicio() {
  const { data: locales = [], isPending } = useLocales();
  const [filtros, setFiltros] = useState<FiltrosLocales>({});
  const [busqueda, setBusqueda] = useState('');
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const navigate = useNavigate();

  const categorias = [...new Set(locales.map(l => l.category))].sort();

  const localesFiltrados = locales.filter((l) => {
    if (busqueda && !l.name.toLowerCase().includes(busqueda.toLowerCase()) && !l.category.toLowerCase().includes(busqueda.toLowerCase())) return false;
    if (filtros.categoria && l.category !== filtros.categoria) return false;
    if (filtros.soloAbiertos && !l.isOpen) return false;
    if (filtros.calificacionMin && l.rating < filtros.calificacionMin) return false;
    return true;
  });

  return (
    <div className="pagina-inicio">
      <EncabezadoCliente
        onCartOpen={() => setCarritoAbierto(true)}
        searchValue={busqueda}
        onSearchChange={(e) => setBusqueda(e.target.value)}
      />
      <NavbarCliente />

      <div className="pagina-inicio__cuerpo">
        <PanelFiltros
          categorias={categorias}
          filtros={filtros}
          onFiltroChange={setFiltros}
        />

        <main className="pagina-inicio__main">
          <div className="pagina-inicio__top">
            <h2 className="pagina-inicio__titulo">Locales Cercanos</h2>
            <span className="pagina-inicio__contador body-small">
              {localesFiltrados.length} resultado{localesFiltrados.length !== 1 ? 's' : ''}
            </span>
          </div>

          {isPending ? (
            <div className="pagina-inicio__estado">Cargando locales...</div>
          ) : localesFiltrados.length === 0 ? (
            <div className="pagina-inicio__estado">
              <p>No encontramos locales con esos filtros.</p>
            </div>
          ) : (
            <div className="locales-grid">
              {localesFiltrados.map((local) => (
                <LocalCard
                  key={local.id}
                  local={local}
                  onClick={() => navigate(`/local/${local.id}`)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      <DrawerCarrito isOpen={carritoAbierto} onClose={() => setCarritoAbierto(false)} />
    </div>
  );
}
