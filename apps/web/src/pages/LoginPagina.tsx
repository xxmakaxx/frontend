import { useState } from 'react';
import { useNavigate } from 'react-router';
import { usAutenticacionStore, loginSchema, type LoginInput } from '@alamesa/shared';
import { Button, Input, Card } from '@/components/base';
import './LoginPagina.css';

export const LoginPagina = () => {
  const navigate = useNavigate();
  const { iniciarSesion, cargando, error } = usAutenticacionStore();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errores, setErrores] = useState<Record<string, string>>({});

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrores({});

    try {
      const datosValidados = loginSchema.parse(formData);
      await iniciarSesion(datosValidados.email, datosValidados.password);
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        if ('errors' in err) {
          const zodErrores = err as any;
          const nuevosErrores: Record<string, string> = {};
          zodErrores.errors.forEach((e: any) => {
            nuevosErrores[e.path[0]] = e.message;
          });
          setErrores(nuevosErrores);
        } else {
          setErrores({ general: err.message });
        }
      }
    }
  };

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="login-pagina">
      <div className="login-pagina__contenedor">
        <Card className="login-pagina__card">
          <h1 className="login-pagina__titulo">Iniciar Sesión</h1>

          {(error || errores.general) && (
            <div className="login-pagina__error">{error || errores.general}</div>
          )}

          <form onSubmit={manejarSubmit} className="login-pagina__formulario">
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={manejarCambio}
              error={errores.email}
              required
            />

            <Input
              label="Contraseña"
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={manejarCambio}
              error={errores.password}
              required
            />

            <Button type="submit" variante="primary" tamanio="lg" cargando={cargando}>
              Iniciar Sesión
            </Button>
          </form>

          <div className="login-pagina__pie">
            <p>¿No tienes cuenta? </p>
            <a href="/registro">Regístrate aquí</a>
          </div>

          <div className="login-pagina__demo">
            <p className="login-pagina__demo-texto">Demo: mockuser@alamesa.food / mockpass123</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
