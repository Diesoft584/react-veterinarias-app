import React from "react";
import { Drawer, Box, List, ListItemButton, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";

export const SIDEBAR_WIDTH = 220;

export default function AppSidebar({ open, onClose, menuButtonRef }) {
    const blurActive = () => {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    };

    const handleClose = () => {
        blurActive();
        onClose?.();

        menuButtonRef?.current?.focus();
    };

    const handleItemClick = () => {

        handleClose();

    };

    return (
        <Drawer
            variant="temporary"
            open={open}
            onClose={handleClose}

            ModalProps={{ keepMounted: false, disableRestoreFocus: true }}
            PaperProps={{ sx: { width: SIDEBAR_WIDTH } }}
        >
            <Box
                role="presentation"
                onKeyDown={(e) => e.key === "Escape" && handleClose()}
                sx={{ height: "100%", bgcolor: "background.default", p: 1.5 }}
            >
                <List component="nav">
                    <ListItemButton component={NavLink} to="/inicio" onClick={handleItemClick}>
                        <ListItemText primary="Inicio" />
                    </ListItemButton>
                    <ListItemButton component={NavLink} to="/clientes" onClick={handleItemClick}>
                        <ListItemText primary="Clientes" />
                    </ListItemButton>
                    <ListItemButton component={NavLink} to="/mascotas" onClick={handleItemClick}>
                        <ListItemText primary="Mascotas" />
                    </ListItemButton>
                </List>
            </Box>
        </Drawer>
    );
}
