import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import AppNavbar from './layout/AppNavbar.jsx';

import Login from './pages/Login/Login.jsx';
import Inicio from './pages/Inicio/Inicio.jsx';
import ClientesList from './pages/Clientes/ClientesList.jsx';
import ClienteDetail from './pages/Clientes/ClienteDetail.jsx';
import MascotasList from './pages/Mascotas/MascotasList.jsx';

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
