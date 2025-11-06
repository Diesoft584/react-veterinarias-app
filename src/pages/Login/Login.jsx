import React, { useState } from "react";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export default function Login() {
    const { login } = useAuth();
    const nav = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [form, setForm] = useState({ username: "", password: "" });

    const submit = async (e) => {
        e.preventDefault();
        const { ok, message } = await login(form);
        if (!ok) return enqueueSnackbar(message || "Error de acceso", { variant: "error" });
        nav("/inicio");
    };

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            {/* Reemplazo de Grid por CSS Grid para evitar warnings */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "7fr 5fr" },
                    gap: 3,
                    alignItems: "stretch",
                }}
            >
                {/* Columna izquierda: imagen */}
                <Paper
                    sx={{
                        height: 420,
                        borderRadius: 3,
                        backgroundImage: `
              linear-gradient(0deg, rgba(0,0,0,0.15), rgba(0,0,0,0.15)),
              url('https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=1200&q=80') `,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />

                {/* Columna derecha: formulario */}
                <Paper component="form" onSubmit={submit} sx={{ p: 4, borderRadius: 3 }}>
                    <Typography variant="h6" align="center" fontWeight={800} gutterBottom>
                        INICIO DE SESIÓN
                    </Typography>

                    <TextField
                        label="Usuario"
                        fullWidth
                        margin="normal"
                        value={form.username}
                        onChange={(e) => setForm((p) => ({ ...p, username: e.target.value }))}
                    />
                    <TextField
                        label="Contraseña"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={form.password}
                        onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                    />

                    <Box mt={2}>
                        <Button type="submit" variant="contained" size="large" fullWidth>
                            INGRESAR
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
}
