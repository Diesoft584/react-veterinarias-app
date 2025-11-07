import { apiFetch } from "../api";

export async function GetClienteById(id) {
  return apiFetch(`/clientes/${id}`);
}
