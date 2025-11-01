import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { GetClienteById } from "../services/clientes/GetClienteById";
import { GetMascotas } from "../services/mascotas/GetMascotas";
import { CreateMascota } from "../services/mascotas/CreateMascota";

export function useClienteDetail(id) {
  const { enqueueSnackbar } = useSnackbar();
  const [cliente, setCliente] = useState(null);
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const c = await GetClienteById(id);
      setCliente(c);
      const m = await GetMascotas({ cliente_id: id });
      setMascotas(m || []);
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  }, [id, enqueueSnackbar]);

  const createMascota = useCallback(
    async (body) => {
      try {
        const created = await CreateMascota({ ...body, cliente_id: id });
        setMascotas((prev) => [...prev, created]);
        enqueueSnackbar("Mascota creada", { variant: "success" });
        return created;
      } catch (e) {
        enqueueSnackbar(e.message, { variant: "error" });
        throw e;
      }
    },
    [id, enqueueSnackbar]
  );

  useEffect(() => {
    load();
  }, [load]);

  return { cliente, mascotas, loading, load, createMascota };
}
