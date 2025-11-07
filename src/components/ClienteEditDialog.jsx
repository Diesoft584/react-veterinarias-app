import React from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Stack
} from "@mui/material";

export default function ClienteEditDialog({ open, onClose, cliente, onSave }) {
    const [form, setForm] = React.useState({ nombre: "", telefono: "", email: "" });

    React.useEffect(() => {
        if (cliente) {
            setForm({
                nombre: cliente.nombre || "",
                telefono: cliente.telefono || "",
                email: cliente.email || "",
            });
        }
    }, [cliente]);

    const handle = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const submit = (e) => {
        e.preventDefault();
        onSave?.(form);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth component="form" onSubmit={submit}>
            <DialogTitle>Editar cliente</DialogTitle>
            <DialogContent dividers>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField label="Nombre" name="nombre" value={form.nombre} onChange={handle} required />
                    <TextField label="Teléfono" name="telefono" value={form.telefono} onChange={handle} />
                    <TextField label="Email" name="email" type="email" value={form.email} onChange={handle} />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button type="submit" variant="contained">Guardar</Button>
            </DialogActions>
        </Dialog>
    );
}
