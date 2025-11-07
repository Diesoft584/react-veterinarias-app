import { apiFetch } from "../api";

export async function CreateMascota(body) {
  return apiFetch("/mascotas", { method: "POST", body });
}
