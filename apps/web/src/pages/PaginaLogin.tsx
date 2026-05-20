import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAutenticacionStore } from '@alamesa/shared';
import logoImg from '../assets/logo.png';
import './PaginaLogin.css';

export default function PaginaLogin() {
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);
  const iniciarSesion = useAutenticacionStore(state => state.iniciarSesion);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setError(null);
    try {
      await iniciarSesion(email, clave);
      navigate('/');
    } catch {
      setError('Email o contrasena incorrectos');
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <aside className="login-brand">
          <div className="login-brand__content">
            <div className="login-logo-row">
              <img src={logoImg} className="login-logo-ico" alt="A la mesa" />
              <div>
                <h1 className="login-logo-texto">A la mesa</h1>
                <p className="login-brand-sub">Delivery simple y cercano</p>
              </div>
            </div>
            <div className="login-brand-texto">
              <h2>Tu comida favorita, directo a tu mesa.</h2>
              <p>Inicia sesion para ver tus pedidos, descubrir locales y seguir el estado de tus entregas.</p>
            </div>
          </div>
        </aside>

        <section className="login-form-section">
          <div className="login-mobile-brand">
            <img src={logoImg} className="login-logo-ico" alt="A la mesa" />
            <div>
              <h1 className="login-logo-texto" style={{ color: 'var(--color-primary)' }}>A la mesa</h1>
              <p className="login-brand-sub" style={{ color: 'var(--color-text-secondary)' }}>Delivery simple y cercano</p>
            </div>
          </div>

          <div className="login-heading">
            <p>Bienvenido de nuevo</p>
            <h2>Iniciar sesion</h2>
            <span>Accede a tu cuenta para continuar con tus pedidos.</span>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="email">Email</label>
              <div className="login-input-wrap">
                <span className="login-input-ico">@</span>
                <input
                  id="email"
                  type="email"
                  placeholder="tuemail@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="login-field">
              <label htmlFor="password">Contrasena</label>
              <div className="login-input-wrap">
                <span className="login-input-ico">*</span>
                <input
                  id="password"
                  type="password"
                  placeholder="Ingresa tu contrasena"
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && <p className="login-error">{error}</p>}

            <button type="submit" className="login-submit" disabled={cargando}>
              {cargando ? 'Ingresando...' : 'Iniciar sesion'}
            </button>
          </form>

          <p className="login-hint">
            Usuario de prueba: <strong>mockuser@alamesa.food</strong> / <strong>mockpass123</strong>
          </p>

          <p className="login-registro">
            No tenes cuenta? <Link to="/registro">Registrate</Link>
          </p>
        </section>
      </section>
    </main>
  );
}
