const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000') + '/api';

// ── Retry-aware fetch ──────────────────────────────────────────────────────
// Render free tier spins down after 15 min inactivity.
// "Failed to fetch" = server is cold-starting (takes ~50s).
// We retry up to 3 times with exponential back-off so the user isn't left
// staring at a broken error.

async function request(path, options = {}, retries = 3) {
  const url = `${API_BASE_URL}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers ?? {}),
  };

  try {
    const response = await fetch(url, { ...options, headers });

    const contentType = response.headers.get('content-type');
    const payload = contentType?.includes('application/json') ? await response.json() : null;

    if (!response.ok) {
      const err = new Error(payload?.message ?? 'Something went wrong.');
      err.status  = response.status;
      err.pending = payload?.pending ?? false;
      throw err;
    }

    return payload;
  } catch (err) {
    // "Failed to fetch" (TypeError) → server is sleeping on Render free tier.
    // Retry with back-off: 3s → 6s → 12s
    const isNetworkError = err instanceof TypeError && err.message.toLowerCase().includes('fetch');
    if (isNetworkError && retries > 0) {
      const delay = (4 - retries) * 3000; // 3s, 6s, 9s
      console.warn(`[API] Server may be waking up — retrying in ${delay / 1000}s… (${retries} left)`);
      await new Promise(res => setTimeout(res, delay));
      return request(path, options, retries - 1);
    }

    // Surface a friendlier message for network errors
    if (isNetworkError) {
      const friendlyErr = new Error('Cannot reach the server. It may be waking up — please try again in a moment.');
      friendlyErr.isNetworkError = true;
      throw friendlyErr;
    }

    throw err;
  }
}

// ── Auth ───────────────────────────────────────────────────────────────────
export async function registerUser(credentials) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function loginUser(credentials) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function getCurrentUser(token) {
  return request('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  });
}

// ── Progress ───────────────────────────────────────────────────────────────
export async function getProgress(token) {
  return request('/progress', {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function updateProgress(token, progress) {
  return request('/progress', {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(progress),
  });
}

export async function updateTopicAction(token, topicId, action) {
  return request(`/progress/topic-action/${topicId}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ action }),
  });
}

export async function updateQuestionAction(token, questionId, action) {
  return request(`/progress/question-action/${questionId}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ action }),
  });
}

// ── Admin ──────────────────────────────────────────────────────────────────
export async function adminLogin(credentials) {
  return request('/admin/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function adminGetStudents(adminToken) {
  return request('/admin/students', {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
}

export async function adminApproveStudent(adminToken, studentId) {
  return request(`/admin/students/${studentId}/approve`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${adminToken}` },
  });
}

export async function adminDeleteStudent(adminToken, studentId) {
  return request(`/admin/students/${studentId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${adminToken}` },
  });
}

// ── Server keepalive ping (call once on app load) ─────────────────────────
// Silently pings the health endpoint on app startup so Render wakes up
// before the user tries to log in.
export function pingServer() {
  const base = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';
  fetch(`${base}/api/health`).catch(() => {/* silently ignored */});
}
