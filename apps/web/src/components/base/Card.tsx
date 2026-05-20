import './Card.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

interface CardSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '', onClick, ...props }: CardProps) => (
  <div
    className={`card${className ? ' ' + className : ''}${onClick ? ' card--clickable' : ''}`}
    onClick={onClick}
    {...props}
  >
    {children}
  </div>
);

Card.Header = ({ children, className = '' }: CardSectionProps) => (
  <div className={`card__header${className ? ' ' + className : ''}`}>{children}</div>
);

Card.Body = ({ children, className = '' }: CardSectionProps) => (
  <div className={`card__body${className ? ' ' + className : ''}`}>{children}</div>
);

Card.Footer = ({ children, className = '' }: CardSectionProps) => (
  <div className={`card__footer${className ? ' ' + className : ''}`}>{children}</div>
);
