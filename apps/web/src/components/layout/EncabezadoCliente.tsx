import { Link, useNavigate } from 'react-router-dom';
import { useAutenticacionStore, useCarritoCantidad, iniciales } from '@alamesa/shared';
import { Avatar } from '../base/Avatar';
import { Badge } from '../base/Badge';
import logoTop from '../../assets/logo-top.png';
import './EncabezadoCliente.css';

interface EncabezadoClienteProps {
  onCartOpen?: () => void;
  searchValue?: string;
  onSearchChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const EncabezadoCliente = ({
  onCartOpen,
  searchValue = '',
  onSearchChange,
}: EncabezadoClienteProps) => {
  const usuario = useAutenticacionStore(state => state.usuario);
  const cerrarSesion = useAutenticacionStore(state => state.cerrarSesion);
  const cantidadItems = useCarritoCantidad();
  const navigate = useNavigate();

  const handleCerrarSesion = () => {
    cerrarSesion();
    navigate('/');
  };

  return (
    <header className="encabezado-cliente">
      <div className="encabezado-cliente__container">
        <Link to="/" className="encabezado-cliente__logo">
          <img src={logoTop} alt="A la mesa" className="encabezado-cliente__logo-img" />
          <span className="encabezado-cliente__logo-text">A la mesa</span>
        </Link>

        <div className="encabezado-cliente__centro">
          <div className="encabezado-cliente__search-wrap">
            <span className="encabezado-cliente__search-ico">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              className="encabezado-cliente__search"
              placeholder="Buscar locales o platos..."
              value={searchValue}
              onChange={onSearchChange}
            />
          </div>
        </div>

        <div className="encabezado-cliente__derecha">
          {onCartOpen && (
            <button className="encabezado-cliente__icon-btn encabezado-cliente__carrito" onClick={onCartOpen} title="Carrito">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {cantidadItems > 0 && <Badge variant="primary" className="encabezado-cliente__badge">{cantidadItems}</Badge>}
            </button>
          )}

          {usuario ? (
            <div className="encabezado-cliente__usuario">
              <Avatar initials={iniciales(usuario.nombre, usuario.apellido)} size="md" />
              <button className="encabezado-cliente__sesion-btn" onClick={handleCerrarSesion}>
                Salir
              </button>
            </div>
          ) : (
            <Link to="/login" className="encabezado-cliente__login-link">
              Iniciar sesion
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
