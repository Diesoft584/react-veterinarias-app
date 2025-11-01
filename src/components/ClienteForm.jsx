import React, { useState } from 'react';
import { Paper, Box, TextField, Button, Typography } from '@mui/material';

export default function ClienteForm({ onCreate }) {
    const [form, setForm] = useState({ nombre: '', telefono: '', email: '' });
    const [loading, setLoading] = useState(false);

    const handle = (e) => {
        const { name, value } = e.target;
        setForm((p) => ({ ...p, [name]: value }));
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!form.nombre.trim()) return;
        setLoading(true);
        try {
            await onCreate?.({
                nombre: form.nombre.trim(),
                telefono: form.telefono.trim(),
                email: form.email.trim(),
            });
            setForm({ nombre: '', telefono: '', email: '' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper component="form" onSubmit={submit} sx={{ p: 2, borderRadius: 2 }}>
            <Typography variant="subtitle1" fontWeight={800} gutterBottom>
                Crear nuevo cliente
            </Typography>

            <Box sx={{ display: 'grid', gap: 2 }}>
                <TextField label="Nombre" name="nombre" value={form.nombre} onChange={handle} required />
                <TextField label="Teléfono" name="telefono" value={form.telefono} onChange={handle} />
                <TextField label="Email" name="email" value={form.email} onChange={handle} type="email" />

                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                    <Button variant="outlined" onClick={() => setForm({ nombre: '', telefono: '', email: '' })}>
                        Limpiar
                    </Button>
                    <Button type="submit" variant="contained" disabled={loading}>
                        {loading ? 'Guardando...' : 'Crear'}
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
}
