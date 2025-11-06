import * as React from "react";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";

import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import AppNavbar from "./layout/AppNavbar.jsx";
import AppSidebar, { SIDEBAR_WIDTH } from "./layout/AppSidebar.jsx";

import Login from "./pages/Login/Login.jsx";
import Inicio from "./pages/Inicio/Inicio.jsx";
import ClientesList from "./pages/Clientes/ClientesList.jsx";
import ClienteDetail from "./pages/Clientes/ClienteDetail.jsx";
import MascotasList from "./pages/Mascotas/MascotasList.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<WithLayout />}>
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

function WithLayout() {
  const upLg = useMediaQuery("(min-width:1200px)");
  const [open, setOpen] = React.useState(upLg);
  const location = useLocation();


  const menuButtonRef = React.useRef(null);

  const blurActive = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };


  const prevUpLg = React.useRef(upLg);
  React.useEffect(() => {
    if (prevUpLg.current !== upLg) setOpen(upLg);
    prevUpLg.current = upLg;
  }, [upLg]);


  React.useEffect(() => {
    if (!upLg) {
      blurActive();
      setOpen(false);
      menuButtonRef.current?.focus();
    }
  }, [location.pathname, upLg]);


  React.useEffect(() => {
    if (!open) {
      menuButtonRef.current?.focus();
    }
  }, [open]);

  const toggleSidebar = () => {
    if (!open) blurActive();
    setOpen((v) => !v);
  };

  const closeSidebar = () => {
    blurActive();
    setOpen(false);
  };

  return (
    <>
      <AppNavbar
        onToggleSidebar={toggleSidebar}
        sidebarOpen={open}
        menuButtonRef={menuButtonRef}
      />
      <AppSidebar
        open={open}
        onClose={closeSidebar}
        menuButtonRef={menuButtonRef}
      />

      <Box
        component="main"
        sx={{
          ml: upLg && open ? `${SIDEBAR_WIDTH}px` : 0,
          transition: "margin-left .2s ease",
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}

