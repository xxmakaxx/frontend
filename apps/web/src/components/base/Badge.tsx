import type { VarianteBadge } from '@alamesa/shared';
import './Badge.css';

interface BadgeProps {
  variant?: VarianteBadge;
  children: React.ReactNode;
  className?: string;
}

export const Badge = ({ variant = 'default', children, className = '' }: BadgeProps) => (
  <span className={`badge badge--${variant}${className ? ' ' + className : ''}`}>{children}</span>
);
