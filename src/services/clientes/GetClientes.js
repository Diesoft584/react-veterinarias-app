import { apiFetch } from "../api";

export async function GetClientes() {
  return apiFetch("/clientes");
}
