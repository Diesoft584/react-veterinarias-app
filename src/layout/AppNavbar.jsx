import React from 'react';
import { AppBar, Toolbar, Typography, Button, Stack } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function AppNavbar() {
    const { pathname } = useLocation();
    const { logout } = useAuth();

    const link = (to, label) => (
        <Button
            component={NavLink}
            to={to}
            color={pathname.startsWith(to) ? 'primary' : 'inherit'}
            sx={{ fontWeight: pathname.startsWith(to) ? 800 : 600 }}
        >
            {label}
        </Button>
    );

    return (
        <AppBar position="sticky" color="transparent" elevation={1} sx={{ backdropFilter: 'blur(6px)' }}>
            <Toolbar sx={{ gap: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, flexGrow: 1 }}>🐾 ANIMALIS</Typography>
                <Stack direction="row" spacing={1}>
                    {link('/inicio', 'INICIO')}
                    {link('/clientes', 'CLIENTES')}
                    {link('/mascotas', 'MASCOTAS')}
                </Stack>
                <Button variant="text" onClick={logout}>CERRAR SESIÓN</Button>
            </Toolbar>
        </AppBar>
    );
}
