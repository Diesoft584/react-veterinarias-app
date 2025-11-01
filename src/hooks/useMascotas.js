import { useCallback, useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { GetMascotas } from "../services/mascotas/GetMascotas";

export function useMascotas() {
  const { enqueueSnackbar } = useSnackbar();
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await GetMascotas();
      setMascotas(data || []);
    } catch (e) {
      enqueueSnackbar(e.message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    load();
  }, [load]);

  return { mascotas, loading, reload: load };
}
