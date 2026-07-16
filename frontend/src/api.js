const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (res.status === 204) return null;

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `Request failed: ${res.status}`);
  }

  return data;
}

export const api = {
  getTasks: ({ search = '', status = 'all' } = {}) => {
    const params = new URLSearchParams({ search, status });
    return request(`/tasks?${params}`);
  },

  createTask: ({ title, description }) =>
    request('/tasks', {
      method: 'POST',
      body: JSON.stringify({ title, description }),
    }),

  updateTask: (id, fields) =>
    request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(fields),
    }),

  toggleTask: (id) =>
    request(`/tasks/${id}/toggle`, { method: 'PATCH' }),

  deleteTask: (id) =>
    request(`/tasks/${id}`, { method: 'DELETE' }),
};
