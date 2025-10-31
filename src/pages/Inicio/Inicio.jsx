import React from "react";
import { Box, Button, Card, CardContent, Container, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const CardAcceso = ({ title, items, to, icon }) => (
    <Card sx={{ borderRadius: 3 }}>
        <CardContent>
            <Typography variant="h6" fontWeight={800} gutterBottom>
                {icon} {title}
            </Typography>
            {items.map((t, i) => (
                <Typography key={i} variant="body2" color="text.secondary">
                    • {t}
                </Typography>
            ))}
            <Box mt={2} textAlign="right">
                <Button component={NavLink} to={to} variant="contained">
                    IR
                </Button>
            </Box>
        </CardContent>
    </Card>
);

export default function Inicio() {
    return (
        <>
            {/* Header con imagen estable */}
            <Box
                sx={{
                    height: 140,
                    backgroundImage: `
            linear-gradient(0deg, rgba(0,0,0,0.25), rgba(0,0,0,0.25)),
            url('https://images.unsplash.com/photo-1525253013412-55c1a69a5738?auto=format&fit=crop&w=1600&q=80')
          `,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/*  CSS Grid en lugar de MUI Grid para evitar warnings */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        gap: 3,
                    }}
                >
                    <CardAcceso
                        title="Gestión de Clientes"
                        icon="👤"
                        to="/clientes"
                        items={[
                            "Listado general",
                            "Adopción",
                            "Detalles y modificación",
                            "Creación y eliminación",
                        ]}
                    />
                    <CardAcceso
                        title="Gestión de Mascotas"
                        icon="🐾"
                        to="/mascotas"
                        items={["Listado general", "Detalles", "Fotografías", "Creación y eliminación*"]}
                    />
                </Box>
            </Container>
        </>
    );
}
