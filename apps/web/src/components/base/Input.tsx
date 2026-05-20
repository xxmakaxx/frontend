import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | null;
  error?: string | null;
  icon?: React.ReactNode;
}

export const Input = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  disabled = false,
  icon = null,
  error = null,
  label = null,
  required = false,
  className = '',
  ...props
}: InputProps) => (
  <div className={`input-wrapper${className ? ' ' + className : ''}`}>
    {label && (
      <label className="input__label">
        {label}
        {required && <span className="input__req"> *</span>}
      </label>
    )}
    <div className="input__container">
      {icon && <span className="input__icon">{icon}</span>}
      <input
        type={type}
        className={`input${icon ? ' input--with-icon' : ''}${error ? ' input--error' : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
    </div>
    {error && <span className="input__error">{error}</span>}
  </div>
);

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string | null;
  error?: string | null;
}

export const Textarea = ({
  label = null,
  error = null,
  required = false,
  className = '',
  rows = 3,
  ...props
}: TextareaProps) => (
  <div className={`input-wrapper${className ? ' ' + className : ''}`}>
    {label && (
      <label className="input__label">
        {label}
        {required && <span className="input__req"> *</span>}
      </label>
    )}
    <div className="input__container">
      <textarea
        className={`input input--textarea${error ? ' input--error' : ''}`}
        rows={rows}
        {...props}
      />
    </div>
    {error && <span className="input__error">{error}</span>}
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string | null;
  children: React.ReactNode;
}

export const Select = ({ label, required, error, className = '', children, ...props }: SelectProps) => (
  <div className={`input-wrapper${className ? ' ' + className : ''}`}>
    {label && (
      <label className="input__label">
        {label}
        {required && <span className="input__req"> *</span>}
      </label>
    )}
    <div className="input__container">
      <select className={`input input--select${error ? ' input--error' : ''}`} {...props}>
        {children}
      </select>
    </div>
    {error && <span className="input__error">{error}</span>}
  </div>
);
