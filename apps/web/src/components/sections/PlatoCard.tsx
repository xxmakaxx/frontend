import type { Plato } from '@alamesa/shared';
import { formatearMoneda } from '@alamesa/shared';
import { Card } from '../base/Card';
import { Badge } from '../base/Badge';
import { Button } from '../base/Button';
import './PlatoCard.css';

interface PlatoCardProps {
  plato: Plato;
  onAgregar: (plato: Plato) => void;
}

export const PlatoCard = ({ plato, onAgregar }: PlatoCardProps) => (
  <Card className="plato-card">
    <div className="plato-card__img-wrap">
      <img src={plato.image} alt={plato.name} className="plato-card__img" loading="lazy" />
      {plato.discount && (
        <Badge variant="primary" className="plato-card__badge-descuento">-{plato.discount}%</Badge>
      )}
      {plato.stock < 3 && plato.stock > 0 && (
        <Badge variant="warning" className="plato-card__badge-stock">Stock bajo</Badge>
      )}
    </div>
    <div className="plato-card__body">
      <h4 className="plato-card__nombre">{plato.name}</h4>
      <p className="plato-card__desc body-small">{plato.description}</p>
      <div className="plato-card__footer">
        <div className="plato-card__precios">
          <span className="plato-card__precio">{formatearMoneda(plato.price)}</span>
          {plato.originalPrice && (
            <span className="plato-card__precio-original">{formatearMoneda(plato.originalPrice)}</span>
          )}
        </div>
        <Button size="sm" onClick={() => onAgregar(plato)}>+ Agregar</Button>
      </div>
    </div>
  </Card>
);
