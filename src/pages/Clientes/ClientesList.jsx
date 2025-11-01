import React from 'react';
import { Box, Container, Typography, TextField, IconButton } from '@mui/material';
import { useClientes } from '../../hooks/useClientes';
import ClienteCard from '../../components/ClienteCard';
import ClienteForm from '../../components/ClienteForm';
import ClearIcon from '@mui/icons-material/Clear';

export default function ClientesList() {
    const { clientes, loading, load, create, remove } = useClientes();
    const [filter, setFilter] = React.useState('');

    React.useEffect(() => { load(); }, [load]);

    const filtered = React.useMemo(() => {
        if (!filter.trim()) return clientes;
        const q = filter.toLowerCase();
        return (clientes || []).filter((c) =>
            String(c.nombre || '').toLowerCase().includes(q) ||
            String(c.telefono || '').toLowerCase().includes(q) ||
            String(c.email || '').toLowerCase().includes(q) ||
            String(c._id || '').toLowerCase().includes(q)
        );
    }, [clientes, filter]);

    return (
        <>
            <Box
                sx={{
                    height: 120,
                    backgroundImage: `
            linear-gradient(0deg, rgba(0,0,0,0.25), rgba(0,0,0,0.25)),
            url('https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=80'),
            url('https://picsum.photos/1600/900')
          `,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Container maxWidth="lg" sx={{ py: 3 }}>
                <Typography variant="h6" fontWeight={800} gutterBottom>
                    Gestión de Clientes
                </Typography>

                {/* layout 2 columnas (lista / formulario) */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
                        gap: 3,
                    }}
                >
                    {/* Columna izquierda: buscador + grilla de clientes */}
                    <Box>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 2 }}>
                            <TextField
                                size="small"
                                fullWidth
                                placeholder="Buscar por nombre, teléfono, email o ID..."
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                            />
                            {filter && (
                                <IconButton onClick={() => setFilter('')}>
                                    <ClearIcon />
                                </IconButton>
                            )}
                        </Box>

                        {loading ? (
                            <div style={{ padding: 16 }}>Cargando...</div>
                        ) : (
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr', xl: '1fr 1fr 1fr' },
                                    gap: 2,
                                }}
                            >
                                {filtered?.map((c) => (
                                    <ClienteCard key={c._id} cliente={c} onDelete={(cli) => remove(cli._id)} />
                                ))}
                                {!filtered?.length && (
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                        No hay clientes para mostrar.
                                    </Typography>
                                )}
                            </Box>
                        )}
                    </Box>

                    {/* Columna derecha: formulario de alta */}
                    <ClienteForm onCreate={create} />
                </Box>
            </Container>
        </>
    );
}
