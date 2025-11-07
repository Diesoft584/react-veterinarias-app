import { apiFetch } from "../api";

export async function CreateCliente(body) {
  return apiFetch("/clientes", { method: "POST", body });
}
