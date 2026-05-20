import type { FiltrosLocales } from '@alamesa/shared';
import { Button } from '../base/Button';
import './PanelFiltros.css';

interface PanelFiltrosProps {
  categorias: string[];
  filtros: FiltrosLocales;
  onFiltroChange: (filtros: FiltrosLocales) => void;
}

export const PanelFiltros = ({ categorias, filtros, onFiltroChange }: PanelFiltrosProps) => {
  const handleCategoria = (cat: string) => {
    const siguiente = filtros.categoria === cat ? null : cat;
    onFiltroChange({ ...filtros, categoria: siguiente });
  };

  return (
    <aside className="panel-filtros">
      <h3 className="panel-filtros__titulo">Filtros</h3>

      <div className="filtro-grupo">
        <p className="filtro-etiqueta">Categoria</p>
        {categorias.map((cat) => (
          <label key={cat} className="filtro-checkbox">
            <input
              type="checkbox"
              checked={filtros.categoria === cat}
              onChange={() => handleCategoria(cat)}
            />
            <span>{cat}</span>
          </label>
        ))}
      </div>

      <div className="filtro-grupo">
        <p className="filtro-etiqueta">Estado</p>
        <label className="filtro-checkbox">
          <input
            type="checkbox"
            checked={!!filtros.soloAbiertos}
            onChange={(e) => onFiltroChange({ ...filtros, soloAbiertos: e.target.checked })}
          />
          <span>Solo abiertos</span>
        </label>
      </div>

      <div className="filtro-grupo">
        <p className="filtro-etiqueta">Calificacion minima</p>
        {[4.5, 4.0, 3.5].map((r) => (
          <label key={r} className="filtro-checkbox">
            <input
              type="radio"
              name="calificacion"
              checked={filtros.calificacionMin === r}
              onChange={() => onFiltroChange({ ...filtros, calificacionMin: r })}
            />
            <span>* {r}+</span>
          </label>
        ))}
      </div>

      <Button variant="ghost" fullWidth onClick={() => onFiltroChange({})}>
        Limpiar Filtros
      </Button>
    </aside>
  );
};
