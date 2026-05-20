import { Link } from 'react-router';
import { usAutenticacionStore } from '@alamesa/shared';
import './ClienteHeader.css';

export const ClienteHeader = () => {
  const { usuario, cerrarSesion } = usAutenticacionStore();

  const manejarCerrarSesion = () => {
    cerrarSesion();
    window.location.href = '/';
  };

  return (
    <header className="cliente-header">
      <div className="cliente-header__contenido">
        <Link to="/" className="cliente-header__logo">
          A la Mesa
        </Link>

        <nav className="cliente-header__nav">
          {usuario ? (
            <div className="cliente-header__usuario">
              <span className="cliente-header__nombre">{usuario.name}</span>
              <Link to="/mis-pedidos" className="cliente-header__link">
                Mis Pedidos
              </Link>
              <button className="cliente-header__cerrar" onClick={manejarCerrarSesion}>
                Salir
              </button>
            </div>
          ) : (
            <div className="cliente-header__auth">
              <Link to="/login" className="cliente-header__link">
                Iniciar Sesión
              </Link>
              <Link to="/registro" className="cliente-header__link cliente-header__link--registro">
                Registrarse
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
