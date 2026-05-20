import { ButtonHTMLAttributes } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: 'primary' | 'secondary' | 'outline';
  tamanio?: 'sm' | 'md' | 'lg';
  cargando?: boolean;
  children: React.ReactNode;
}

export const Button = ({
  variante = 'primary',
  tamanio = 'md',
  cargando = false,
  disabled,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`button button--${variante} button--${tamanio}`}
      disabled={cargando || disabled}
      {...props}
    >
      {cargando ? 'Cargando...' : children}
    </button>
  );
};
