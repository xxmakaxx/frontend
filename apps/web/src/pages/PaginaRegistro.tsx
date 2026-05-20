import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAutenticacionStore, esquemaRegistro } from '@alamesa/shared';
import { Input, Select, Textarea } from '../components/base/Input';
import { Button } from '../components/base/Button';
import logoImg from '../assets/logo.png';
import './PaginaRegistro.css';

type Errores = Partial<Record<string, string>>;

const BARRIOS = ['Centro', 'Cordon', 'Pocitos', 'Malvin', 'Buceo', 'Punta Carretas', 'Otro'];

export default function PaginaRegistro() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    clave: '',
    confirmarClave: '',
    documento: '',
    calle: '',
    numero: '',
    barrio: '',
  });
  const [errores, setErrores] = useState<Errores>({});
  const [cargando, setCargando] = useState(false);
  const registrar = useAutenticacionStore(state => state.registrar);
  const navigate = useNavigate();

  const handleChange = (campo: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [campo]: e.target.value }));
    if (errores[campo]) setErrores(prev => ({ ...prev, [campo]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const resultado = esquemaRegistro.safeParse(form);
    if (!resultado.success) {
      const mapa: Errores = {};
      resultado.error.errors.forEach(err => {
        if (err.path[0]) mapa[String(err.path[0])] = err.message;
      });
      setErrores(mapa);
      return;
    }
    setCargando(true);
    try {
      await registrar({
        nombre: form.nombre,
        apellido: form.apellido,
        email: form.email,
        clave: form.clave,
        documento: form.documento,
        calle: form.calle,
        numero: form.numero,
        barrio: form.barrio,
      });
      navigate('/');
    } catch (err) {
      setErrores({ email: 'No se pudo crear la cuenta. Intenta de nuevo.' });
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="registro-page">
      <section className="registro-card">
        <aside className="registro-brand">
          <div className="registro-brand__content">
            <img src={logoImg} alt="A la mesa" className="registro-logo-ico" />
            <div className="registro-brand-texto">
              <span className="registro-badge">Crea tu cuenta</span>
              <h2>Tu comida favorita, directo a tu mesa.</h2>
            </div>
          </div>
        </aside>

        <section className="registro-form-section">
          <div className="registro-mobile-brand">
            <img src={logoImg} alt="A la mesa" className="registro-logo-ico registro-logo-ico--small" />
          </div>

          <div className="registro-heading">
            <p>Nuevo usuario</p>
            <h1>Crear cuenta</h1>
            <span>Completa tus datos para registrarte en la plataforma.</span>
          </div>

          <form className="registro-form" onSubmit={handleSubmit}>
            <div className="registro-grid">
              <Input
                label="Nombre"
                required
                value={form.nombre}
                onChange={handleChange('nombre')}
                error={errores.nombre}
                placeholder="Tu nombre"
              />
              <Input
                label="Apellido"
                required
                value={form.apellido}
                onChange={handleChange('apellido')}
                error={errores.apellido}
                placeholder="Tu apellido"
              />
              <Input
                label="Documento de identidad"
                value={form.documento}
                onChange={handleChange('documento')}
                placeholder="Ej: 12345678"
              />
              <Select
                label="Barrio"
                value={form.barrio}
                onChange={handleChange('barrio') as React.ChangeEventHandler<HTMLSelectElement>}
              >
                <option value="">Selecciona tu barrio</option>
                {BARRIOS.map(b => <option key={b} value={b}>{b}</option>)}
              </Select>
              <Input
                label="Calle"
                value={form.calle}
                onChange={handleChange('calle')}
                placeholder="Av. 18 de Julio"
                className="registro-campo-full"
              />
              <Input
                label="Numero"
                value={form.numero}
                onChange={handleChange('numero')}
                placeholder="1234"
              />
              <Input
                label="Email"
                type="email"
                required
                value={form.email}
                onChange={handleChange('email')}
                error={errores.email}
                placeholder="tuemail@ejemplo.com"
                className="registro-campo-full"
              />
              <Input
                label="Contrasena"
                type="password"
                required
                value={form.clave}
                onChange={handleChange('clave')}
                error={errores.clave}
                placeholder="Minimo 6 caracteres"
              />
              <Input
                label="Confirmar contrasena"
                type="password"
                required
                value={form.confirmarClave}
                onChange={handleChange('confirmarClave')}
                error={errores.confirmarClave}
                placeholder="Repite tu contrasena"
              />
            </div>

            <Button type="submit" fullWidth size="lg" disabled={cargando}>
              {cargando ? 'Creando cuenta...' : 'Registrarse'}
            </Button>
          </form>

          <p className="registro-login-link">
            Ya tenes cuenta? <Link to="/login">Inicia sesion</Link>
          </p>
        </section>
      </section>
    </main>
  );
}
