import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  disabled = false,
  fullWidth = false,
  icon = null,
  onClick,
  className = '',
  type = 'button',
  ...props
}: ButtonProps) => (
  <button
    className={`btn btn--${variant} btn--${size}${fullWidth ? ' btn--full' : ''}${className ? ' ' + className : ''}`}
    disabled={disabled}
    onClick={onClick}
    type={type}
    {...props}
  >
    {icon && <span className="btn__icon">{icon}</span>}
    <span>{children}</span>
  </button>
);
