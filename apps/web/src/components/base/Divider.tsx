interface DividerProps {
  className?: string;
}

export const Divider = ({ className = '' }: DividerProps) => (
  <hr className={`divider${className ? ' ' + className : ''}`} style={{
    height: '1px',
    border: 'none',
    background: 'var(--color-divider)',
    margin: 'var(--space-4) 0',
  }} />
);
