import * as React from "react";
import {
    AppBar, Toolbar, Typography, Button, Stack, IconButton, Tooltip, useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { SIDEBAR_WIDTH } from "./AppSidebar.jsx";

export default function AppNavbar({ onToggleSidebar, sidebarOpen, menuButtonRef }) {
    const { pathname } = useLocation();
    const { logout } = useAuth();
    const upLg = useMediaQuery("(min-width:1200px)");

    const link = (to, label) => (
        <Button
            key={to}
            component={NavLink}
            to={to}
            color={pathname.startsWith(to) ? "primary" : "inherit"}
            sx={{ fontWeight: pathname.startsWith(to) ? 800 : 600 }}
        >
            {label}
        </Button>
    );

    return (
        <AppBar
            position="sticky"
            color="transparent"
            elevation={1}
            sx={{
                backdropFilter: "blur(6px)",
                ml: upLg && sidebarOpen ? `${SIDEBAR_WIDTH}px` : 0,
                width: upLg && sidebarOpen ? `calc(100% - ${SIDEBAR_WIDTH}px)` : "100%",
                transition: "margin-left .2s ease, width .2s ease",
            }}
        >
            <Toolbar sx={{ gap: 2 }}>
                <Tooltip title={sidebarOpen ? "Ocultar menú" : "Mostrar menú"}>
                    <IconButton
                        edge="start"
                        onClick={onToggleSidebar}
                        aria-label="menu"
                        ref={menuButtonRef}
                    >
                        <MenuIcon />
                    </IconButton>
                </Tooltip>

                <Typography variant="h6" sx={{ fontWeight: 800, flexGrow: 1 }}>
                    🐾 ANIMALIS
                </Typography>

                <Stack direction="row" spacing={1}>
                    {link("/inicio", "INICIO")}
                    {link("/clientes", "CLIENTES")}
                    {link("/mascotas", "MASCOTAS")}
                </Stack>

                <Button variant="text" onClick={logout}>CERRAR SESIÓN</Button>
            </Toolbar>
        </AppBar>
    );
}
