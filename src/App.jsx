import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

import ProtectedRoute from './auth/ProtectedRoute.jsx';
import AppNavbar from './layout/AppNavbar.jsx';

import Login from './pages/Login/Login.jsx';
import Inicio from './pages/Inicio/Inicio.jsx';

//  Nuevas Paginas:
import ClientesList from './pages/Clientes/ClientesList.jsx';
import ClienteDetail from './pages/Clientes/ClienteDetail.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<WithNavbar />}>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/clientes" element={<ClientesList />} />
          <Route path="/clientes/:id" element={<ClienteDetail />} />


          {/* Mascotas: por ahora placeholder simple hasta crear la página */}

          <Route path="/mascotas" element={<div style={{ padding: 16 }}>Mascotas (pronto)</div>} />
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
