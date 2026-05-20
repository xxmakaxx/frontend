import { clienteHttp } from '../cliente';
import { esMockActivo } from '../mock/estado';
import type { RespuestaAuth, DatosRegistro, Usuario } from '../../tipos';

const MOCK_EMAIL = 'mockuser@alamesa.food';
const MOCK_CLAVE = 'mockpass123';

const MOCK_USUARIO: Usuario = {
  id: 'user_001',
  nombre: 'Mock',
  apellido: 'User',
  email: MOCK_EMAIL,
  telefono: '+598 99 000001',
};

const usuariosRegistrados: Usuario[] = [MOCK_USUARIO];

function delay(ms: number) {
  return new Promise<void>(resolve => setTimeout(resolve, ms));
}

export async function iniciarSesion(email: string, clave: string): Promise<RespuestaAuth> {
  if (esMockActivo()) {
    await delay(500);
    if (email === MOCK_EMAIL && clave === MOCK_CLAVE) {
      return { usuario: MOCK_USUARIO, token: 'mock-token-xyz' };
    }
    const registrado = usuariosRegistrados.find(u => u.email === email);
    if (registrado && clave.length >= 6) {
      return { usuario: registrado, token: `mock-token-${registrado.id}` };
    }
    throw new Error('Credenciales invalidas');
  }
  const { data } = await clienteHttp.post<RespuestaAuth>('/auth/login', { email, clave });
  return data;
}

export async function registrarUsuario(datos: DatosRegistro): Promise<RespuestaAuth> {
  if (esMockActivo()) {
    await delay(700);
    const nuevoUsuario: Usuario = {
      id: `user_${Date.now()}`,
      nombre: datos.nombre,
      apellido: datos.apellido,
      email: datos.email,
      telefono: '',
    };
    usuariosRegistrados.push(nuevoUsuario);
    return { usuario: nuevoUsuario, token: `mock-token-${nuevoUsuario.id}` };
  }
  const { data } = await clienteHttp.post<RespuestaAuth>('/auth/registro', datos);
  return data;
}
