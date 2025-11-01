import { apiFetch } from "../api";

export async function GetMascotas(params = {}) {
  const q = new URLSearchParams(params).toString();
  const suffix = q ? `?${q}` : "";
  return apiFetch(`/mascotas${suffix}`); // GET
}
