import { apiFetch } from "../api";

export async function CreateCliente(body) {
  // { nombre, telefono, email }
  return apiFetch("/clientes", { method: "POST", body });
}
