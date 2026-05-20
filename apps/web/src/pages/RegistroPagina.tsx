import { useState } from 'react';
import { useNavigate } from 'react-router';
import { usAutenticacionStore, registroSchema, type RegistroInput } from '@alamesa/shared';
import { Button, Input, Card } from '@/components/base';
import './RegistroPagina.css';

export const RegistroPagina = () => {
  const navigate = useNavigate();
  const { registrarse, cargando, error } = usAutenticacionStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });
  const [errores, setErrores] = useState<Record<string, string>>({});

  const manejarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrores({});

    try {
      const datosValidados = registroSchema.parse({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || undefined
      });

      await registrarse(datosValidados.name, datosValidados.email, datosValidados.password, datosValidados.phone);
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
    <div className="registro-pagina">
      <div className="registro-pagina__contenedor">
        <Card className="registro-pagina__card">
          <h1 className="registro-pagina__titulo">Crear Cuenta</h1>

          {(error || errores.general) && (
            <div className="registro-pagina__error">{error || errores.general}</div>
          )}

          <form onSubmit={manejarSubmit} className="registro-pagina__formulario">
            <Input
              label="Nombre"
              type="text"
              name="name"
              placeholder="Tu nombre"
              value={formData.name}
              onChange={manejarCambio}
              error={errores.name}
              required
            />

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

            <Input
              label="Teléfono (opcional)"
              type="tel"
              name="phone"
              placeholder="+598 99 000000"
              value={formData.phone}
              onChange={manejarCambio}
              error={errores.phone}
            />

            <Button type="submit" variante="primary" tamanio="lg" cargando={cargando}>
              Registrarse
            </Button>
          </form>

          <div className="registro-pagina__pie">
            <p>¿Ya tienes cuenta? </p>
            <a href="/login">Inicia sesión aquí</a>
          </div>
        </Card>
      </div>
    </div>
  );
};
