import { InputHTMLAttributes } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  ayuda?: string;
}

export const Input = ({ label, error, ayuda, ...props }: InputProps) => {
  return (
    <div className="input-container">
      {label && <label className="input-label">{label}</label>}
      <input className={`input ${error ? 'input--error' : ''}`} {...props} />
      {error && <span className="input-error">{error}</span>}
      {ayuda && !error && <span className="input-ayuda">{ayuda}</span>}
    </div>
  );
};
