const BASE = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

export async function apiFetch(path, { method = "GET", body } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { "content-type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  let data = null;
  try {
    data = await res.json();
  } catch {}
  if (!res.ok) throw new Error(data?.message || `Error ${res.status}`);
  return data;
}
