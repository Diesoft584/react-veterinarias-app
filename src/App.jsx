import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import AppNavbar from './layout/AppNavbar.jsx';
import Login from './pages/Login/Login.jsx';
import Inicio from './pages/Inicio/Inicio.jsx';
import { useClientes } from './hooks/useClientes';

// placeholders por ahora:
function ClientesList() {
  const { clientes, loading, load } = useClientes();
  React.useEffect(() => { load(); }, [load]);

  if (loading) return <div style={{ padding: 16 }}>Cargando...</div>;
  return (
    <div style={{ padding: 16 }}>
      <h2>Clientes ({clientes.length})</h2>
      <ul>
        {clientes.map(c => (
          <li key={c._id}>{c.nombre} — {c.telefono} — {c.email}</li>
        ))}
      </ul>
    </div>
  );
}

function MascotasList() { return <div style={{ padding: 16 }}>MascotasList (luego lo reemplazamos)</div> }
function ClienteDetail() { return <div style={{ padding: 16 }}>ClienteDetail (luego lo reemplazamos)</div> }

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<WithNavbar />}>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/clientes" element={<ClientesList />} />
          <Route path="/clientes/:id" element={<ClienteDetail />} />
          <Route path="/mascotas" element={<MascotasList />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function WithNavbar() {
  return (
    <>
      <AppNavbar />
      <Outlet />
    </>
  );
}
