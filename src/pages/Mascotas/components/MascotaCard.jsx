import React from "react";
import { Card, CardContent, CardMedia, Typography, Stack } from "@mui/material";
import PetCardImg from "../../../assets/pet-card.jpg";

function imageFor({ especie = "" }) {
    const e = (especie || "").toLowerCase();

    if (e.includes("gato") || e.includes("perro")) {
        return PetCardImg;
    }


    return PetCardImg;
}
function ownerLabel(owner) {
    if (!owner) return "-";
    if (typeof owner === "string") return owner;
    if (typeof owner === "object") return owner.nombre || owner.email || owner._id || "-";
    return "-";
}

export default function MascotaCard({ mascota, onClick }) {
    return (
        <Card onClick={() => onClick?.(mascota)} sx={{ cursor: "pointer", borderRadius: 2 }}>
            <CardMedia
                component="img"
                height="160"
                image={imageFor(mascota)}
                alt={mascota?.nombre || "mascota"}
            />
            <CardContent>
                <Typography variant="subtitle1" fontWeight={800} gutterBottom>
                    {mascota?.nombre}
                </Typography>
                <Stack spacing={0.5}>
                    <Typography variant="body2" color="text.secondary">
                        Especie: {mascota?.especie || "-"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Raza: {mascota?.raza || "-"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Edad: {mascota?.edad ?? "-"}
                    </Typography>
                    {mascota?.cliente_id && (
                        <Typography variant="caption" color="text.disabled">
                            Cliente: {ownerLabel(mascota.cliente_id)}
                        </Typography>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
}
