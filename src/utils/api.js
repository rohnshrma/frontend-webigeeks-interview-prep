const API_BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
    ...options,
  });

  const contentType = response.headers.get('content-type');
  const payload = contentType?.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    const err = new Error(payload?.message ?? 'Something went wrong.');
    err.pending = payload?.pending ?? false;
    throw err;
  }

  return payload;
}

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
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getProgress(token) {
  return request('/progress', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateProgress(token, progress) {
  return request('/progress', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(progress),
  });
}

// Admin API
export async function adminLogin(credentials) {
  return request('/admin/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export async function adminGetStudents(adminToken) {
  return request('/admin/students', {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
}

export async function adminApproveStudent(adminToken, studentId) {
  return request(`/admin/students/${studentId}/approve`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
}

export async function adminDeleteStudent(adminToken, studentId) {
  return request(`/admin/students/${studentId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
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
