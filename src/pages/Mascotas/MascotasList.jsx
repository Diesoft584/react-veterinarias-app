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



function ownerInfo(owner) {

    if (!owner) {
        return {
            name: "Adopción disponible",
            email: "veterinariaanimalis@gmail.com",
        };
    }

    if (typeof owner === "string") {
        return { name: owner, email: "veterinariaanimalis@gmail.com" };
    }

    return {
        name: owner.nombre || owner._id || "Adopción disponible",
        email: owner.email || "veterinariaanimalis@gmail.com",
    };
}

export default function MascotasList() {
    const { mascotas, loading, load } = useMascotas();
    const [selected, setSelected] = React.useState(null);

    React.useEffect(() => {
        load();
    }, [load]);

    return (
        <>
            <Box
                sx={{
                    height: 200,
                    backgroundImage: `
            linear-gradient(0deg, rgba(0,0,0,0.25), rgba(0,0,0,0.25)),
            url('/src/assets/banner-mascotas.jpg')`,
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

            <Dialog open={!!selected} onClose={() => setSelected(null)} maxWidth="sm" fullWidth>
                <DialogTitle>Detalles de la Mascota</DialogTitle>
                <DialogContent dividers>
                    {selected && (() => {
                        const owner = ownerInfo(selected.cliente_id);
                        return (
                            <Box sx={{ display: "grid", gap: 1 }}>
                                <Typography><b>Nombre:</b> {selected.nombre}</Typography>
                                <Typography><b>Especie:</b> {selected.especie}</Typography>
                                <Typography><b>Raza:</b> {selected.raza || "-"}</Typography>
                                <Typography><b>Edad:</b> {selected.edad ?? "-"}</Typography>
                                <Typography><b>Dueño:</b> {owner.name}</Typography>
                                <Typography><b>Email:</b> {owner.email}</Typography>
                            </Box>
                        );
                    })()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSelected(null)}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
