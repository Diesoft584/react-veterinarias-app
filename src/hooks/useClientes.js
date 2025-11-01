import { useCallback } from "react";
import { useSnackbar } from "notistack";
import { useClientesContext } from "../context/ClientesContext.jsx";
import { GetClientes } from "../services/clientes/GetClientes";
import { CreateCliente } from "../services/clientes/CreateCliente";
import { UpdateCliente } from "../services/clientes/UpdateCliente";
import { DeleteCliente } from "../services/clientes/DeleteCliente";

export function useClientes() {
  const { enqueueSnackbar } = useSnackbar();
  const { clientes, loading, error, _dispatch, TYPES } = useClientesContext();

  const load = useCallback(async () => {
    try {
      _dispatch({ type: TYPES.LOADING });
      const data = await GetClientes();
      _dispatch({ type: TYPES.SET, payload: data });
    } catch (e) {
      _dispatch({ type: TYPES.ERROR, payload: e.message });
      enqueueSnackbar(e.message, { variant: "error" });
    }
  }, [_dispatch, TYPES, enqueueSnackbar]);

  const create = useCallback(
    async (body) => {
      try {
        _dispatch({ type: TYPES.LOADING });
        const created = await CreateCliente(body);
        _dispatch({ type: TYPES.ADD, payload: created });
        enqueueSnackbar("Cliente creado", { variant: "success" });
        return created;
      } catch (e) {
        _dispatch({ type: TYPES.ERROR, payload: e.message });
        enqueueSnackbar(e.message, { variant: "error" });
        throw e;
      }
    },
    [_dispatch, TYPES, enqueueSnackbar]
  );

  const update = useCallback(
    async (id, body) => {
      try {
        _dispatch({ type: TYPES.LOADING });
        const updated = await UpdateCliente(id, body);
        _dispatch({ type: TYPES.UPDATE, payload: updated });
        enqueueSnackbar("Cliente actualizado", { variant: "success" });
        return updated;
      } catch (e) {
        _dispatch({ type: TYPES.ERROR, payload: e.message });
        enqueueSnackbar(e.message, { variant: "error" });
        throw e;
      }
    },
    [_dispatch, TYPES, enqueueSnackbar]
  );

  const remove = useCallback(
    async (id) => {
      try {
        _dispatch({ type: TYPES.LOADING });
        await DeleteCliente(id);
        _dispatch({ type: TYPES.REMOVE, payload: id });
        enqueueSnackbar("Cliente eliminado", { variant: "success" });
      } catch (e) {
        _dispatch({ type: TYPES.ERROR, payload: e.message });
        enqueueSnackbar(e.message, { variant: "error" });
        throw e;
      }
    },
    [_dispatch, TYPES, enqueueSnackbar]
  );

  return { clientes, loading, error, load, create, update, remove };
}
