import { apiFetch } from "../api";

export async function DeleteCliente(id) {
  return apiFetch(`/clientes/${id}`, { method: "DELETE" });
}
