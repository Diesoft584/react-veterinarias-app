import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function ClienteCard({ cliente, onEdit, onDelete }) {
    const nav = useNavigate();

    return (
        <Card sx={{ borderRadius: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight={800} gutterBottom>
                    {cliente?.nombre}
                </Typography>
                <Stack spacing={0.5}>
                    <Typography variant="body2" color="text.secondary">
                        Tel: {cliente?.telefono || '-'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Email: {cliente?.email || '-'}
                    </Typography>
                    <Typography variant="caption" color="text.disabled">
                        ID: {cliente?._id}
                    </Typography>
                </Stack>
            </CardContent>

            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button size="small" onClick={() => nav(`/clientes/${cliente._id}`)}>Ver</Button>
                <Button size="small" onClick={() => onEdit?.(cliente)}>Editar</Button>
                <Button size="small" color="error" onClick={() => onDelete?.(cliente)}>Borrar</Button>
            </CardActions>
        </Card>
    );
}
