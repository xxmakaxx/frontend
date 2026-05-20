import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { usAutenticacionStore } from '@alamesa/shared';
import { ClienteHeader } from '@/components/layout';
import { LoginPagina } from '@/pages/LoginPagina';
import { RegistroPagina } from '@/pages/RegistroPagina';
import { PaginaInicio } from '@/pages/PaginaInicio';
import { LocalDetailPagina } from '@/pages/LocalDetailPagina';
import { CheckoutPagina } from '@/pages/CheckoutPagina';
import { MisPedidosPagina } from '@/pages/MisPedidosPagina';
import './App.css';

function App() {
  const { token } = usAutenticacionStore();

  return (
    <Router>
      <div className="app">
        <ClienteHeader />
        <main className="app__main">
          <Routes>
            <Route path="/" element={<PaginaInicio />} />
            <Route path="/local/:id" element={<LocalDetailPagina />} />
            <Route path="/login" element={token ? <Navigate to="/" /> : <LoginPagina />} />
            <Route path="/registro" element={token ? <Navigate to="/" /> : <RegistroPagina />} />
            <Route path="/checkout" element={token ? <CheckoutPagina /> : <Navigate to="/login" />} />
            <Route path="/mis-pedidos" element={token ? <MisPedidosPagina /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
