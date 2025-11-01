import { apiFetch } from "../api";

export async function CreateMascota(body) {
  // { nombre, especie, raza, edad, cliente_id }
  return apiFetch("/mascotas", { method: "POST", body });
}
