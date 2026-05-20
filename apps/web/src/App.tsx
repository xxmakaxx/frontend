import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import PaginaLogin from './pages/PaginaLogin';
import PaginaRegistro from './pages/PaginaRegistro';
import PaginaInicio from './pages/PaginaInicio';
import PaginaLocal from './pages/PaginaLocal';
import PaginaCheckout from './pages/PaginaCheckout';
import PaginaMisPedidos from './pages/PaginaMisPedidos';
import RutaProtegida from './components/layout/RutaProtegida';
import './styles/variables.css';
import './styles/base.css';

const enrutador = createBrowserRouter([
  { path: '/login', element: <PaginaLogin /> },
  { path: '/registro', element: <PaginaRegistro /> },
  { path: '/', element: <PaginaInicio /> },
  { path: '/local/:id', element: <PaginaLocal /> },
  {
    path: '/checkout',
    element: <RutaProtegida><PaginaCheckout /></RutaProtegida>,
  },
  {
    path: '/mis-pedidos',
    element: <RutaProtegida><PaginaMisPedidos /></RutaProtegida>,
  },
  { path: '*', element: <Navigate to="/" replace /> },
]);

export default function App() {
  return <RouterProvider router={enrutador} />;
}
