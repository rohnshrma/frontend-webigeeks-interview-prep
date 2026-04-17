/**
 * WebiGeeks — central API client
 * All fetch calls go through here so the base URL
 * is controlled by a single environment variable.
 *
 * Dev  → .env.local  → VITE_API_BASE_URL=http://localhost:4000
 * Prod → Netlify env → VITE_API_BASE_URL=https://your-service.onrender.com
 */
export const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';

/**
 * Thin wrapper around fetch that:
 * - Prepends the API base URL
 * - Attaches the JWT token from localStorage if present
 * - Parses the JSON response
 * - Throws on non-2xx responses with the server message
 */
export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('webigeeks-token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers ?? {}),
  };

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err  = new Error(body.message ?? `Request failed: ${res.status}`);
    err.status = res.status;
    throw err;
  }

  // 204 No Content — return null
  if (res.status === 204) return null;
  return res.json();
}

// ── Convenience helpers ────────────────────────────────────────────────────
export const api = {
  get:    (path)         => apiRequest(path, { method: 'GET' }),
  post:   (path, body)   => apiRequest(path, { method: 'POST',  body: JSON.stringify(body) }),
  put:    (path, body)   => apiRequest(path, { method: 'PUT',   body: JSON.stringify(body) }),
  patch:  (path, body)   => apiRequest(path, { method: 'PATCH', body: JSON.stringify(body) }),
  delete: (path)         => apiRequest(path, { method: 'DELETE' }),
};
