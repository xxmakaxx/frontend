import { Navigate } from 'react-router-dom';
import { useAutenticacionStore } from '@alamesa/shared';

interface RutaProtegidaProps {
  children: React.ReactNode;
}

export default function RutaProtegida({ children }: RutaProtegidaProps) {
  const estaAutenticado = useAutenticacionStore(state => state.estaAutenticado);

  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
