import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres')
});

export const registroSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  phone: z.string().optional()
});

export const direccionSchema = z.object({
  calle: z.string().min(3, 'Dirección inválida'),
  numero: z.string().min(1, 'Número requerido'),
  apartamento: z.string().optional(),
  localidad: z.string().min(2, 'Localidad requerida'),
  referencia: z.string().optional()
});

export const checkoutSchema = z.object({
  direccion: direccionSchema,
  metodoPago: z.enum(['efectivo', 'tarjeta', 'billetera']),
  notas: z.string().optional()
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegistroInput = z.infer<typeof registroSchema>;
export type DireccionInput = z.infer<typeof direccionSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
