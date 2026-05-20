import type { Local } from '@alamesa/shared';
import { Card } from '../base/Card';
import { Badge } from '../base/Badge';
import './LocalCard.css';

interface LocalCardProps {
  local: Local;
  onClick?: () => void;
}

export const LocalCard = ({ local, onClick }: LocalCardProps) => (
  <Card className="local-card" onClick={onClick}>
    <div className="local-card__img-wrap">
      <img src={local.image} alt={local.name} className="local-card__img" loading="lazy" />
      <div className="local-card__badge">
        <Badge variant={local.isOpen ? 'success' : 'default'}>
          {local.isOpen ? 'Abierto' : 'Cerrado'}
        </Badge>
      </div>
    </div>
    <div className="local-card__body">
      <h3 className="local-card__name">{local.name}</h3>
      <p className="local-card__cat body-small">{local.category}</p>
      <p className="local-card__meta body-small">{local.distance} km &nbsp;·&nbsp; {local.deliveryTime} min</p>
      <div className="local-card__footer">
        <span className="body-small">* {local.rating}</span>
        <span className="body-small">({local.reviews} opiniones)</span>
      </div>
    </div>
  </Card>
);
