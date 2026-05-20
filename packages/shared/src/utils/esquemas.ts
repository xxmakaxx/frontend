import { z } from 'zod';

export const esquemaLogin = z.object({
  email: z.string().email('Email invalido'),
  clave: z.string().min(6, 'La contrasena debe tener al menos 6 caracteres'),
});

export const esquemaRegistro = z.object({
  nombre: z.string().min(1, 'El nombre es requerido'),
  apellido: z.string().min(1, 'El apellido es requerido'),
  email: z.string().email('Email invalido'),
  clave: z.string().min(6, 'La contrasena debe tener al menos 6 caracteres'),
  confirmarClave: z.string(),
  documento: z.string().optional(),
  calle: z.string().optional(),
  numero: z.string().optional(),
  barrio: z.string().optional(),
}).refine(data => data.clave === data.confirmarClave, {
  message: 'Las contrasenas no coinciden',
  path: ['confirmarClave'],
});

export const esquemaCheckout = z.object({
  calle: z.string().min(1, 'La calle es requerida'),
  numero: z.string().min(1, 'El numero es requerido'),
  apto: z.string().optional(),
  notas: z.string().optional(),
});

export type DatosLogin = z.infer<typeof esquemaLogin>;
export type DatosRegistroForm = z.infer<typeof esquemaRegistro>;
export type DatosCheckout = z.infer<typeof esquemaCheckout>;
