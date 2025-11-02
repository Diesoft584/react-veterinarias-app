// src/pages/Mascotas/MascotasList.jsx
import React from "react";
import {
    Box,
    Container,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import { useMascotas } from "../../hooks/useMascotas";
import MascotaCard from "./components/MascotaCard.jsx";

function ownerLabel(owner) {
    if (!owner) return "-";
    if (typeof owner === "string") return owner;
    if (typeof owner === "object") return owner.nombre || owner.email || owner._id || "-";
    return "-";
}

export default function MascotasList() {
    const { mascotas, loading, load } = useMascotas();
    const [selected, setSelected] = React.useState(null);

    React.useEffect(() => { load(); }, [load]);

    return (
        <>
            <Box
                sx={{
                    height: 120,
                    backgroundImage: `
            linear-gradient(0deg, rgba(0,0,0,0.25), rgba(0,0,0,0.25)),
            url('https://images.unsplash.com/photo-1525253013412-55c1a69a5738?q=80&w=1600&auto=format&fit=crop'),
            url('https://fastly.picsum.photos/id/137/1600/900.jpg?hmac=gTmmJwvLZBR919npzJ_vjLLCisGyR5A0jkCtAb37bQ4')
          `,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            <Container maxWidth="lg" sx={{ py: 3 }}>
                <Typography variant="h6" fontWeight={800} gutterBottom>
                    Mascotas
                </Typography>

                {loading ? (
                    <div style={{ padding: 16 }}>Cargando...</div>
                ) : (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" },
                            gap: 2,
                        }}
                    >
                        {mascotas?.map((m) => (
                            <MascotaCard key={m._id} mascota={m} onClick={setSelected} />
                        ))}
                        {!mascotas?.length && (
                            <Typography variant="body2" color="text.secondary">
                                No hay mascotas para mostrar.
                            </Typography>
                        )}
                    </Box>
                )}
            </Container>

            {/* Detalle simple */}
            <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="sm" fullWidth>
                <DialogTitle>Detalles de la Mascota</DialogTitle>
                <DialogContent dividers>
                    {selected && (
                        <Box sx={{ display: "grid", gap: 1 }}>
                            <Typography><b>Nombre:</b> {selected.nombre}</Typography>
                            <Typography><b>Especie:</b> {selected.especie}</Typography>
                            <Typography><b>Raza:</b> {selected.raza || "-"}</Typography>
                            <Typography><b>Edad:</b> {selected.edad ?? "-"}</Typography>
                            <Typography><b>Dueño (cliente_id):</b> {ownerLabel(selected?.cliente_id)}</Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelected(null)}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
