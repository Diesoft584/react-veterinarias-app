import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { GetMascotas } from "../services/mascotas/GetMascotas";
import { CreateMascota } from "../services/mascotas/CreateMascota";

export function useMascotas() {
  const { enqueueSnackbar } = useSnackbar();
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(
    async (opts = {}) => {
      try {
        setLoading(true);
        const params = opts.clienteId ? { cliente_id: opts.clienteId } : {};
        const data = await GetMascotas(params);
        setMascotas(data || []);
      } catch (e) {
        enqueueSnackbar(e.message || "Error cargando mascotas", {
          variant: "error",
        });
      } finally {
        setLoading(false);
      }
    },
    [enqueueSnackbar]
  );

  const add = useCallback(
    async (body) => {
      try {
        const created = await CreateMascota(body);
        if (created && created._id) {
          setMascotas((prev) => [created, ...prev]);
          enqueueSnackbar("Mascota creada", { variant: "success" });
        }
        return created;
      } catch (e) {
        enqueueSnackbar(e.message || "Error creando mascota", {
          variant: "error",
        });
        throw e;
      }
    },
    [enqueueSnackbar]
  );

  useEffect(() => {
    load();
  }, [load]);

  return { mascotas, loading, load, add, reload: load };
}
