import type { Local } from '@alamesa/shared';
import { Badge } from '../base/Badge';
import './LocalHero.css';

interface LocalHeroProps {
  local: Local;
}

export const LocalHero = ({ local }: LocalHeroProps) => (
  <div className="local-hero">
    <img src={local.coverImage} alt={local.name} className="local-hero__img" />
    <div className="local-hero__overlay">
      <div className="local-hero__content">
        <img src={local.logo} alt="logo" className="local-hero__logo" />
        <h1 className="local-hero__nombre">{local.name}</h1>
        <p className="local-hero__desc">{local.description}</p>
        <div className="local-hero__meta">
          <span>* {local.rating} ({local.reviews})</span>
          <span>{local.deliveryTime} min</span>
          <Badge variant={local.isOpen ? 'success' : 'default'}>
            {local.isOpen ? 'Abierto' : 'Cerrado'}
          </Badge>
        </div>
      </div>
    </div>
  </div>
);
