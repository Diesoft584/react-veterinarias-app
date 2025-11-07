import React from 'react';
import {
    Box, Container, Typography, TextField, IconButton,
    Dialog, DialogTitle, DialogContent, DialogActions, Button
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { useClientes } from '../../hooks/useClientes';
import ClienteCard from '../../components/ClienteCard';
import ClienteForm from '../../components/ClienteForm';
import ClienteEditDialog from '../../components/ClienteEditDialog';

export default function ClientesList() {
    const { clientes, loading, load, create, update, remove } = useClientes();

    const [filter, setFilter] = React.useState('');
    const [editing, setEditing] = React.useState(null);
    const [toDelete, setToDelete] = React.useState(null);

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

    const handleSaveEdit = async (form) => {
        await update(editing._id, form);
        setEditing(null);
    };

    const confirmDelete = async () => {
        await remove(toDelete._id);
        setToDelete(null);
    };

    return (
        <>
            <Box
                sx={{
                    height: 200,
                    backgroundImage: `
            linear-gradient(0deg, rgba(0,0,0,0.25), rgba(0,0,0,0.25)),
            url('https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1600&q=80')
          `,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            <Container maxWidth="lg" sx={{ py: 3 }}>
                <Typography variant="h6" fontWeight={800} gutterBottom>
                    Gestión de Clientes
                </Typography>

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>

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
                                    <ClienteCard
                                        key={c._id}
                                        cliente={c}
                                        onEdit={setEditing}
                                        onDelete={setToDelete}
                                    />
                                ))}
                                {!filtered?.length && (
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                        No hay clientes para mostrar.
                                    </Typography>
                                )}
                            </Box>
                        )}
                    </Box>


                    <ClienteForm onCreate={create} />
                </Box>
            </Container>


            <ClienteEditDialog
                open={!!editing}
                onClose={() => setEditing(null)}
                cliente={editing}
                onSave={handleSaveEdit}
            />


            <Dialog open={!!toDelete} onClose={() => setToDelete(null)} maxWidth="xs" fullWidth>
                <DialogTitle>Eliminar cliente</DialogTitle>
                <DialogContent dividers>
                    <Typography>
                        ¿Seguro que querés eliminar <b>{toDelete?.nombre}</b> (ID: {toDelete?._id})?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setToDelete(null)}>Cancelar</Button>
                    <Button color="error" variant="contained" onClick={confirmDelete}>Eliminar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
