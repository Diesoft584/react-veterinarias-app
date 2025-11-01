import { apiFetch } from "../api";

export async function UpdateCliente(id, body) {
  return apiFetch(`/clientes/${id}`, { method: "PUT", body });
}
