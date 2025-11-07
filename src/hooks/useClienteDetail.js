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
      const payload = {
        nombre: (body?.nombre || "").trim(),
        especie: (body?.especie || "").trim(),
        cliente_id: String(id),
      };
      const raza = (body?.raza || "").trim();
      if (raza) payload.raza = raza;

      if (
        body?.edad !== "" &&
        body?.edad !== null &&
        body?.edad !== undefined
      ) {
        const n = Number(body.edad);
        if (!Number.isNaN(n)) payload.edad = n;
      }

      if (!payload.nombre || !payload.especie || !payload.cliente_id) {
        throw new Error(
          "Faltan campos obligatorios (nombre, especie, cliente_id)."
        );
      }

      try {
        const created = await CreateMascota(payload);
        setMascotas((prev) => [created, ...(prev || [])]);
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
