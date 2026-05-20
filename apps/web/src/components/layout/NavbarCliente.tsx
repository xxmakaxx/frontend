import { Link, useLocation } from 'react-router-dom';
import './NavbarCliente.css';

const TABS = [
  { label: 'Inicio', path: '/' },
  { label: 'Mis Pedidos', path: '/mis-pedidos' },
];

export const NavbarCliente = () => {
  const location = useLocation();

  return (
    <nav className="navbar-cliente">
      <div className="navbar-cliente__container">
        {TABS.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`navbar-cliente__tab${location.pathname === tab.path ? ' navbar-cliente__tab--activo' : ''}`}
          >
            {tab.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};
