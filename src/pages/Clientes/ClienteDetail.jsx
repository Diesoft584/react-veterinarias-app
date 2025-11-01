import React, { useState } from 'react';
import { Box, Container, Paper, Typography, TextField, Button, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useClienteDetail } from '../../hooks/useClienteDetail';

export default function ClienteDetail() {
    const { id } = useParams();
    const { cliente, mascotas, loading, createMascota } = useClienteDetail(id);
    const [form, setForm] = useState({ nombre: '', especie: '', raza: '', edad: '' });
    const [saving, setSaving] = useState(false);

    const handle = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!form.nombre.trim() || !form.especie.trim()) return;
        setSaving(true);
        try {
            await createMascota({
                nombre: form.nombre.trim(),
                especie: form.especie.trim(),
                raza: form.raza.trim(),
                edad: Number(form.edad || 0),
            });
            setForm({ nombre: '', especie: '', raza: '', edad: '' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div style={{ padding: 16 }}>Cargando...</div>;

    return (
        <>
            <Box
                sx={{
                    height: 120,
                    backgroundImage: `
            linear-gradient(0deg, rgba(0,0,0,0.25), rgba(0,0,0,0.25)),
            url('https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1600&q=80')
          `,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Container maxWidth="lg" sx={{ py: 3 }}>
                <Typography variant="h6" fontWeight={800} gutterBottom>
                    Detalle de Cliente
                </Typography>

                <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' } }}>
                    {/* Datos del cliente + lista de mascotas */}
                    <Paper sx={{ p: 2, borderRadius: 2 }}>
                        <Typography variant="subtitle1" fontWeight={800} gutterBottom>
                            {cliente?.nombre}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Tel: {cliente?.telefono || '-'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Email: {cliente?.email || '-'}
                        </Typography>
                        <Typography variant="caption" color="text.disabled">
                            ID: {cliente?._id}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="subtitle2" fontWeight={800} gutterBottom>
                            Mascotas asociadas
                        </Typography>

                        {!mascotas?.length && (
                            <Typography variant="body2" color="text.secondary">
                                Aún no hay mascotas asociadas a este cliente.
                            </Typography>
                        )}

                        <Box sx={{ display: 'grid', gap: 1 }}>
                            {mascotas?.map((m) => (
                                <Paper key={m._id} sx={{ p: 1.5, borderRadius: 2 }}>
                                    <Typography variant="body2" fontWeight={700}>
                                        {m.nombre} ({m.especie})
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Raza: {m.raza || '-'} — Edad: {m.edad ?? '-'}
                                    </Typography>
                                </Paper>
                            ))}
                        </Box>
                    </Paper>

                    {/* Formulario: agregar mascota */}
                    <Paper component="form" onSubmit={submit} sx={{ p: 2, borderRadius: 2 }}>
                        <Typography variant="subtitle1" fontWeight={800} gutterBottom>
                            Asociar nueva mascota
                        </Typography>
                        <Box sx={{ display: 'grid', gap: 2 }}>
                            <TextField label="Nombre" name="nombre" value={form.nombre} onChange={handle} required />
                            <TextField label="Especie" name="especie" value={form.especie} onChange={handle} required />
                            <TextField label="Raza" name="raza" value={form.raza} onChange={handle} />
                            <TextField label="Edad" name="edad" value={form.edad} onChange={handle} type="number" />
                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                                <Button variant="outlined" onClick={() => setForm({ nombre: '', especie: '', raza: '', edad: '' })}>
                                    Limpiar
                                </Button>
                                <Button type="submit" variant="contained" disabled={saving}>
                                    {saving ? 'Guardando...' : 'Guardar'}
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Box>
            </Container>
        </>
    );
}
